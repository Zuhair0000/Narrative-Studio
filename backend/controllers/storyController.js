// const OpenAI = require("openai");
const Groq = require("groq-sdk");
const pool = require("../db");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateStories = async (req, res) => {
  const { companyName, companyPitch, targetAudience, storyTone, coreValues } =
    req.body;
  const userId = req.user.id;

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
  You are a creative brand storyteller.
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
    const draft_id = Date.now();

    const userResult = await pool.query(
      "SELECT credits FROM users WHERE id = $1",
      [userId]
    );

    const user = userResult.rows[0];
    if (!user || user.credits <= 0) {
      return res
        .status(403)
        .json({ message: "No credits left.Please purchase more" });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;

    const rowStories = result
      .split(/(?:^|\n)\d+\.\s+/)
      .filter((s) => s.trim() !== "")
      .map((s) => s.trim());

    const stories = rowStories.map((s, index) => {
      const toneMatch = s.match(/\*\*(.*?)\*\*/);
      let title = toneMatch ? toneMatch[1].trim() : null;

      let cleanContent = s
        .replace(/\*\*(.*?)\*\*/g, "")
        .replace(/\*/g, "")
        .trim();

      if (!title) {
        const firstSentence = cleanContent.split(/[.!?]/)[0].trim();
        title =
          firstSentence.length > 50
            ? firstSentence.split(" ").slice(0, 5).join(" ") + "..."
            : firstSentence;
      }

      return {
        title: title || `Story ${index + 1}`,
        content: cleanContent,
        story_date: new Date(),
        draft_id: draft_id || null,
      };
    });

    await pool.query("UPDATE users SET credits = credits - 1 WHERE id = $1", [
      userId,
    ]);
    for (const story of stories) {
      await pool.query(
        "INSERT INTO stories (title, content, story_date, draft_id, user_id) VALUES ($1, $2, $3, $4, $5)",
        [story.title, story.content, story.story_date, story.draft_id, userId]
      );
    }

    res.json({ draft_id, stories });
  } catch (err) {
    console.error("Error generating stories:", err);
    res
      .status(500)
      .json({ message: "Failed to generate stories", error: err.message });
  }
};

exports.getAllDrafts = async (req, res) => {
  const userId = req.user.id;

  try {
    // const result = await pool.query(
    //   `
    //   SELECT
    //     draft_id,
    //     MIN(story_date) AS date,
    //     LEFT(GROUP_CONCAT(content SEPARATOR ' '), 150) AS preview
    //   FROM stories
    //   WHERE user_id = $1
    //   GROUP BY draft_id
    //   ORDER BY date DESC
    // `,
    //   [userId]
    // );

    const result = await pool.query(
      `
  SELECT 
    draft_id,
    MIN(story_date) AS date,
    LEFT(STRING_AGG(content, ' '), 150) AS preview
  FROM stories
  WHERE user_id = $1
  GROUP BY draft_id
  ORDER BY date DESC
  `,
      [userId]
    );

    const drafts = result.rows.map((row, i) => ({
      id: row.draft_id,
      title: `Draft #${i + 1}`,
      date: new Date(row.date).toLocaleDateString(),
      category: "AI Generated",
      preview: row.preview + "...",
    }));

    res.json(drafts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch drafts" });
  }
};

exports.getStoryByDraftId = async (req, res) => {
  const { draftId } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT id, title, content, story_date FROM stories WHERE draft_id = $1 AND user_id = $2 ORDER BY id ASC",
      [draftId, userId]
    );

    // rows will be an array of story objects
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stories" });
  }
};

exports.getUserCredits = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query("SELECT credits FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ credits: 0 });
    }

    res.json({ credits: result.rows[0].credits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch credits" });
  }
};
