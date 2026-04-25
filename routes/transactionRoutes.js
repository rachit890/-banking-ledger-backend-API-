const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getTransactions, getTransactionById } = require("../controllers/transactionController");

// 🔹 routes
router.get("/", protect, getTransactions);
router.get("/:id", protect, getTransactionById);

module.exports = router;