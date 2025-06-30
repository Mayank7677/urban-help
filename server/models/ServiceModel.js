const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String, // Electrician", "AC Repair
      required: true,
      trim: true,
    },
    description: String,
    category: String, // Home Services, Cleaning, Tutoring
    price: {
      type: Number,
      required: true,
    },
    city: String,
    state: String,
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: Number,
      },
    ],
    images: {
      type: Array,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("services", serviceSchema);
