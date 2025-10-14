const express = require("express");
const {
  generateStories,
  getAllStories,
  getStoryById,
  getStoriesByDraft,
  getAllDrafts,
} = require("../controllers/storyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", authMiddleware.verifyToken, generateStories);
router.get("/", authMiddleware.verifyToken, getAllStories);
router.get("/drafts", authMiddleware.verifyToken, getAllDrafts);
router.get("/story/:id", authMiddleware.verifyToken, getStoryById);
router.get("/:draftId", authMiddleware.verifyToken, getStoriesByDraft);

module.exports = router;
