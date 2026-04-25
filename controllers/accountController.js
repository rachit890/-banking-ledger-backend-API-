const Account = require("../models/Account");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const Ledger = require("../models/Ledger");

exports.getMyAccount = async (req,res) => {

    try{
        const userId = req.user_id;
        const mongoose = require("mongoose");

        const account = await Account.findOne({ user: req.user._id });
    
        if(!account){
            return res.status(404).json({
                message : "Account Not Found!",
            });
        }
    
        res.json({
            message : "Account Fetched Successfully",
            account,
        });

    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

exports.transferMoney = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderId = req.user._id;
    const { to: receiverId, amount, idempotencyKey } = req.body;

    const amt = Number(amount);

    //  Basic validation
    if (!receiverId || !amt || amt <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    if (!idempotencyKey) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Idempotency key required",
      });
    }

    //  Idempotency check
    const existingTxn = await Transaction.findOne({ idempotencyKey }).session(session);

    if (existingTxn) {
      await session.abortTransaction();
      session.endSession();
    
      if (existingTxn.status === "COMPLETED") {
        return res.status(200).json({
          message: "Transaction already processed",
          transaction: existingTxn,
        });
      }
    
      if (existingTxn.status === "PENDING") {
        return res.status(200).json({
          message: "Transaction is still processing, please wait",
        });
      }
    
      if (existingTxn.status === "FAILED") {
        return res.status(400).json({
          message: "Previous transaction failed, please retry with a new idempotency key",
        });
      }
    }

    //  Get accounts
    const senderAccount = await Account.findOne({ user: senderId }).session(session);
    const receiverAccount = await Account.findOne({ user: receiverId }).session(session);

    if (!senderAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Sender account not found",
      });
    }

    if (!receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Receiver account not found",
      });
    }

    if (senderId.toString() === receiverId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Cannot transfer to yourself",
      });
    }

    if (senderAccount.balance < amt) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    //  1. Create Transaction (PENDING)
    const transaction = await Transaction.create(
      [{
        fromAccount: senderAccount._id,
        toAccount: receiverAccount._id,
        amount: amt,
        status: "PENDING",
        idempotencyKey, //  important
      }],
      { session }
    );

    //  2. Update balances
    senderAccount.balance -= amt;
    receiverAccount.balance += amt;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    //  3. Create Ledger entries

    // sender → DEBIT
    await Ledger.create([{
      account: senderAccount._id,
      transaction: transaction[0]._id,
      type: "DEBIT",
      amount: amt,
      balanceAfter: senderAccount.balance,
    }], { session });

    // receiver → CREDIT
    await Ledger.create([{
      account: receiverAccount._id,
      transaction: transaction[0]._id,
      type: "CREDIT",
      amount: amt,
      balanceAfter: receiverAccount.balance,
    }], { session });

    //  4. Mark COMPLETED
    transaction[0].status = "COMPLETED";
    await transaction[0].save({ session });

    //  5. Commit
    await session.commitTransaction();
    session.endSession();

    return res.json({
      message: "Transfer successful",
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const transactions = await Transaction.find({
      $or: [{ from: userId }, { to: userId }],
    }).sort({ createdAt: -1 });

    res.json({
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user._id;

    // 🔹 find account
    const account = await Account.findOne({ user: userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({
      balance: account.balance,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};