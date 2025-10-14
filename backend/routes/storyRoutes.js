const express = require("express");
const {
  generateStories,
  getStoryByDraftId,
  getAllDrafts,
} = require("../controllers/storyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", authMiddleware.verifyToken, generateStories);
router.get("/drafts", authMiddleware.verifyToken, getAllDrafts);
router.get("/story/:draftId", authMiddleware.verifyToken, getStoryByDraftId);

module.exports = router;
