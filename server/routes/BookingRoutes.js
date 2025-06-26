const bookingController = require("../controllers/BookingController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/create", auth, bookingController.createBooking);
router.get("/myBookings", auth, bookingController.getMyBookings);
router.get("/providerBookings", auth, bookingController.getProviderBookings);
router.patch("/update", auth, bookingController.updateBookings);

module.exports = router;
