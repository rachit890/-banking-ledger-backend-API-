const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getMyAccount,transferMoney, getBalance } = require("../controllers/accountController");

router.get("/me",protect,getMyAccount);
router.post("/transfer", protect, transferMoney);
router.get("/balance", protect, getBalance);
module.exports = router;

