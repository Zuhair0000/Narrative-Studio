const db = require("../db");

exports.getAllStories = async (req, res) => {
  try {
    const [stories] = await db.query(`
      SELECT stories.*, users.name AS author
      JOIN users ON stories.author = users.id
      ORDER BY stories.created_at DESC
      `);

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

exports.getStoryById = async (req, res) => {
  const storyId = req.params.id;

  try {
    const [story] = await db.query("SELECT * FROM stories WHERE id = ?", [
      storyId,
    ]);
    if (story.length === 0)
      return res.status(404).json({ message: "Story not found" });

    res.json(story);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch story" });
  }
};
