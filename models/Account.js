const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required for account"],
      unique: true, //  one account per user
      index: true,
    },

    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance cannot be negative"], // safety
    },

    status: {
      type: String,
      enum: ["ACTIVE", "FROZEN"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);