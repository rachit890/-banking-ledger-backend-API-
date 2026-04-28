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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: userId_here
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Transfer successful
 */
router.post("/transfer", protect, transferMoney);

/**
 * @swagger
 * /api/account/balance:
 *   get:
 *     summary: Get account balance
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Balance fetched successfully
 */
router.get("/balance", protect, getBalance);
module.exports = router;

