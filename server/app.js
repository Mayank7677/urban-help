const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();

const userRoutes = require("./routes/UserRoutes");
const serviceRoutes = require("./routes/ServiceRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Working");
});

module.exports = app;
