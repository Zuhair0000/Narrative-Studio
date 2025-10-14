const OpenAI = require("openai");
const db = require("../db");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateStories = async (req, res) => {
  const { companyName, companyPitch, targetAudience, storyTone, coreValues } =
    req.body;

  if (
    !companyName ||
    !companyPitch ||
    !targetAudience ||
    !storyTone ||
    !coreValues
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const prompt = `
  Ypu are a creative brand storyteller.
  Generate 3 short, unique brand stories for the following company details:
  - Company Name: ${companyName}
  - Company Pitch: ${companyPitch}
  - Target Audience: ${targetAudience}
  - Story Tone: ${storyTone}
  - Core Values: ${coreValues}

  Each story should: 
  - Be under 200 word.
  - Be emotionally engaging and human-like.
  - Have a different storytelling style (e.g. inspirational, emotional, funny, poetic, etc.)

  Return the stories as a numbered list (1., 2., 3.) with no extra commentary.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;

    const rowStories = result
      .split(/\d.\s+/)
      .filter((s) => s.trim() !== "")
      .map((s) => s.trim());

    const stories = rowStories.map((s, index) => {
      const titleMatch = s.match(/Story Title:\s*(.*)/i);
      const contentMatch = s.match(/Story Content:\s*([\s\S]*)/i);

      return {
        title: titleMatch ? titleMatch[1].trim() : `Story ${index}`,
        content: contentMatch
          ? contentMatch[1].trim()
          : s.replace(/Story Title:.*/i, "").trim(),
        story_date: new Date(),
        draft_id: draft_id || null,
      };
    });

    for (const story of stories) {
      await db.query(
        "INSERT INTO stories (title, content, story_date, draft_id) VALUES (?, ?, ?, ?)",
        [story.title, story.content, story.story_date, story.draft_id]
      );
    }

    res.json({ stories });
  } catch (err) {
    console.error("Error generating stories:", err);
    res
      .status(500)
      .json({ message: "Failed to generate stories", error: err.message });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const [stories] = await db.query(`
      SELECT id, title, content, story_date 
      FROM stories
      ORDER BY story_date DESC
    `);

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

exports.getStoriesByDraft = async (req, res) => {
  const { draftId } = req.params;

  try {
    const [stories] = await db.execute(
      "SELECT * FROM stories WHERE draft_id = ? ORDER BY story_date DESC",
      [draftId]
    );

    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch draft stories" });
  }
};

// exports.getStoryById = async (req, res) => {
//   const { id } = req.params.id;

//   try {
//     const [story] = await db.query("SELECT * FROM stories WHERE id = ?", [id]);
//     if (story.length === 0)
//       return res.status(404).json({ message: "Story not found" });

//     res.json(story);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch story" });
//   }
// };

exports.getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT id, title, content, story_date FROM stories WHERE draft_id = ? ORDER BY id ASC",
      [id]
    );

    // rows will be an array of story objects
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stories" });
  }
};
