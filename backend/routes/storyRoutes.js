const express = require("express");
const {
  generateStories,
  getAllStories,
  getStoryById,
  getStoriesByDraft,
} = require("../controllers/storyController");
const router = express.Router();

router.post("/generate", generateStories);
router.get("/", getAllStories);
router.get("/story/:id", getStoryById);
router.get("/:draftId", getStoriesByDraft);

module.exports = router;
