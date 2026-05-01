const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getStatement } = require("../controllers/ledgerController");


/**
 * @swagger
 * /api/ledger:
 *   get:
 *     summary: Get account statement (ledger entries)
 *     tags: [Ledger]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ledger fetched successfully
 *       404:
 *         description: Account not found
 */
router.get("/", protect, getStatement);

module.exports = router;