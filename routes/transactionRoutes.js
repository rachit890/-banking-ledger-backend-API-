const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getTransactions, getTransactionById } = require("../controllers/transactionController");

// routes

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions of logged-in user
 *     tags: [Transaction]
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 */
router.get("/", protect, getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a specific transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction fetched successfully
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", protect, getTransactionById);

module.exports = router;