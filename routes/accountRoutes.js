const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getMyAccount,transferMoney, getBalance } = require("../controllers/accountController");

/**
 * @swagger
 * /api/account/me:
 *   get:
 *     summary: Get logged-in user's account details
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Account details fetched successfully
 */
router.get("/me",protect,getMyAccount);

/**
* @swagger
* /api/account/transfer:
*   post:
*     summary: Transfer money to another user
*     tags: [Account]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - to
*               - amount
*               - idempotencyKey
*             properties:
*               to:
*                 type: string
*                 description: Receiver user ID
*                 example: 64f1c2a9b1234567890abcd
*               amount:
*                 type: number
*                 description: Amount to transfer
*                 example: 500
*               idempotencyKey:
*                 type: string
*                 description: Unique key to prevent duplicate transactions
*                 example: txn_12345
*     responses:
*       200:
*         description: Transfer successful
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Transfer successful
*/
router.post("/transfer", protect, transferMoney);

/**
 * @swagger
 * /api/account/balance:
 *   get:
 *     summary: Get account balance
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 1500
 */
router.get("/balance", protect, getBalance);
module.exports = router;

