const express = require("express");
const {
  paypalPayment,
  captureOrder,
} = require("../controllers/paymentController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-order", verifyToken, paypalPayment);
router.post("/capture-order", verifyToken, captureOrder);

module.exports = router;
