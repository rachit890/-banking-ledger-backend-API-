const Transaction = require("../models/Transaction");
const Account = require("../models/Account");


// 🔹 GET all transactions for logged-in user
exports.getTransactions = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const account = await Account.findOne({ user: userId });
  
      if (!account) {
        return res.status(404).json({
          message: "Account not found. Please create account first",
        });
      }

      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.max(1, Number(req.query.limit) || 10);
      const skip = (page - 1) * limit;
  

  
      const transactions = await Transaction.find({
        $or: [
          { fromAccount: account._id },
          { toAccount: account._id },
        ],
      })
      .populate({
        path: "fromAccount",
        select: "user",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .populate({
        path: "toAccount",
        select: "user",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

      const total = await Transaction.countDocuments({
        $or: [
          { fromAccount: account._id },
          { toAccount: account._id },
        ],
      });
      // Add type field
      const formatted = transactions.map(txn => {
        const isSender =
          txn.fromAccount._id.toString() === account._id.toString();
  
        return {
          _id: txn._id,
          amount: txn.amount,
          status: txn.status,
          createdAt: txn.createdAt,
          type: isSender ? "sent" : "received",
          
          from: txn.fromAccount.user.name,
          to: txn.toAccount.user.name,
        };
      });
  
      res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        transactions: formatted,
      });
  
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };


// 🔹 GET single transaction
exports.getTransactionById = async (req, res) => {
    try {
      const userId = req.user._id;
      const { id } = req.params;
  
      // 🔹 find user's account
      const account = await Account.findOne({ user: userId });
  
      if (!account) {
        return res.status(404).json({
          message: "Account not found. Please create account first",
        });
      }
  
      // 🔥 find transaction AND verify ownership
      const transaction = await Transaction.findOne({
        _id: id,
        $or: [
          { fromAccount: account._id },
          { toAccount: account._id },
        ],
      })
      .populate({
        path: "fromAccount",
        select: "user",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .populate({
        path: "toAccount",
        select: "user",
        populate: {
          path: "user",
          select: "name email"
        }
      });
  
      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found or not authorized",
        });
      }
  
      res.json({
        transaction,
      });
  
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
};

