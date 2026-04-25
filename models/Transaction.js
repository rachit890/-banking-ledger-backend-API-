const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "From account is required"],
    index: true,
  },

  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "To account is required"],
    index: true,
  },

  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount must be greater than 0"],
  },

  status: {
    type: String,
    enum: {
      values: ["PENDING", "COMPLETED", "FAILED"],
      message: "Invalid status",
    },
    default: "PENDING",
  },

  idempotencyKey: {
    type: String,
    required: [true, "Idempotency key is required"],
    unique: true,
    index: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);