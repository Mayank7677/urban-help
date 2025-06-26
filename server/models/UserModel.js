const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },

    city: String,
    state: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
