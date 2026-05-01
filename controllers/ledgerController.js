const Ledger = require("../models/Ledger");
const Account = require("../models/Account");

exports.getStatement = async (req, res) => {
  try {
    const userId = req.user._id;

    // 🔹 find account
    const account = await Account.findOne({ user: userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found. Please create account first", // ✅ updated
      });
    }

    // fetch ledger entries
    const entries = await Ledger.find({ account: account._id })
      .sort({ createdAt: -1 });

    res.json({
      statement: entries,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};