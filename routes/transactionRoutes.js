const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getTransactions, getTransactionById } = require("../controllers/transactionController");

// routes

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get paginated transactions of logged-in user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of transactions per page
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64f1c2a9b1234567890abcd
 *                       amount:
 *                         type: number
 *                         example: 500
 *                       status:
 *                         type: string
 *                         example: COMPLETED
 *                       createdAt:
 *                         type: string
 *                         example: 2024-01-01T10:00:00Z
 *                       type:
 *                         type: string
 *                         example: sent
 *                       from:
 *                         type: string
 *                         example: Rachit
 *                       to:
 *                         type: string
 *                         example: Aman
 */
router.get("/", protect, getTransactions);

/**
* @swagger
* /api/transactions/{id}:
*   get:
*     summary: Get transaction by ID
*     tags: [Transaction]
*     security:
*       - bearerAuth: []
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
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 transaction:
*                   type: object
*                   properties:
*                     _id:
*                       type: string
*                     fromAccount:
*                       type: string
*                     toAccount:
*                       type: string
*                     amount:
*                       type: number
*                     status:
*                       type: string
*                     createdAt:
*                       type: string
*       404:
*         description: Transaction not found
*/
router.get("/:id", protect, getTransactionById);

module.exports = router;