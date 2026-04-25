const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getStatement } = require("../controllers/ledgerController");

router.get("/", protect, getStatement);

module.exports = router;