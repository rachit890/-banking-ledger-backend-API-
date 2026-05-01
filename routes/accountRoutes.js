const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getMyAccount,transferMoney, getBalance,createAccount, updateAccountStatus} = require("../controllers/accountController");

/**
 * @swagger
 * /api/account/create:
 *   post:
 *     summary: Create account for logged-in user
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account created successfully
 *                 account:
 *                   type: object
 *       400:
 *         description: Account already exists
 */
router.post("/create", protect, createAccount);

/**
 * @swagger
 * /api/account/me:
 *   get:
 *     summary: Get logged-in user's account details
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64f1c2a9b1234567890abcd
 *                 balance:
 *                   type: number
 *                   example: 1500
 *                 status:
 *                   type: string
 *                   example: ACTIVE
 *       404:
 *         description: Account not found
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
 *       400:
 *         description: Invalid input or insufficient balance
 *       403:
 *         description: Account is frozen or suspicious activity detected
 *       404:
 *         description: Sender or receiver account not found
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
 *                 status:
 *                   type: string
 *                   example: ACTIVE
 *       404:
 *         description: Account not found
 */
router.get("/balance", protect, getBalance);

/**
 * @swagger
 * /api/account/status:
 *   patch:
 *     summary: Update account status (ACTIVE / FROZEN)
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: FROZEN
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Account not found
 */
router.patch("/status", protect, updateAccountStatus);
module.exports = router;

