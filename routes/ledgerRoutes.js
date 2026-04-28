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
 *     responses:
 *       200:
 *         description: Ledger fetched successfully
 */
router.get("/", protect, getStatement);

module.exports = router;