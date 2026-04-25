const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Account is required"],
    immutable: true,
    index: true,
  },

  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: [true, "Transaction reference is required"],
    immutable: true,
    index: true,
  },

  type: {
    type: String,
    enum: {
      values: ["DEBIT", "CREDIT"],
      message: "Type must be either DEBIT or CREDIT",
    },
    required: true,
    immutable: true,
  },

  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount must be greater than 0"],
    immutable: true,
  },

  balanceAfter: {
    type: Number,
    required: [true, "Balance after transaction is required"],
    immutable: true,
  },

}, { timestamps: true });

//making ledger entries immutable
ledgerSchema.pre("findOneAndUpdate", function () {
  throw new Error("Ledger entries cannot be modified");
});

ledgerSchema.pre("deleteOne", function () {
  throw new Error("Ledger entries cannot be deleted");
});

module.exports = mongoose.model("Ledger", ledgerSchema);