const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

const transactionController = require("../controllers/TransactionController");

// Create a new transaction
router.post("/create-order", auth, transactionController.createOrder);

// Verify payment
router.post("/verify-payment", auth, transactionController.verifyPayment);

module.exports = router;
