const bookingController = require("../controllers/BookingController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/create/:id", auth, bookingController.createBooking);
router.get("/myBookings", auth, bookingController.getMyBookings);
router.get(
  "/providerBookings/:status",
  auth,
  bookingController.getProviderBookings
);
router.patch("/update/:id", auth, bookingController.updateBookings);
router.get(
  "/dash-cards-stats",
  auth,
  bookingController.getProviderDashboardStats
);

router.get("/linechart-data", auth, bookingController.getLineChartData);
router.get("/bookings-bar-data", auth, bookingController.getBookingsPerDay);

module.exports = router;
