const bookingModel = require("../models/BookingModel");
const ServiceModel = require("../models/ServiceModel");

// Create Booking
exports.createBooking = async (req, res) => {
  console.log(req.body)
  try {
    const { date, time, notes, name, myNumber, address } = req.body;
    const { id } = req.params;

    let service = await ServiceModel.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Prevent same service booked at same time by different users
    const alreadyBooked = await bookingModel.findOne({
      service: id,
      date,
      time,
      status: { $ne: "Rejected" }, // ignore rejected ones
    });

    if (alreadyBooked) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked" });
    }

    // prevent same user booking same service on same day
    const userDoubleBooking = await bookingModel.findOne({
      user: req.user._id,
      service: id,
      date,
    });

    if (userDoubleBooking) {
      return res
        .status(400)
        .json({ message: "You already booked this service on this date" });
    }

    const newBooking = await bookingModel.create({
      user: req.user._id,
      service: service._id,
      provider: service.provider,
      date,
      time,
      notes,
      name,
      myNumber,
      address,
    });

    res.status(201).json({ message: "Booking Created", newBooking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
    console.log("error in createBooking : ", error);
  }
};

// Get Booking ( customer )
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user._id })
      .populate(
        "service",
        "title category images rating city state contactNumber price"
      )
      .populate("provider", "name email phone");

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while getting bookings", error: error.message });
  }
};

// Get Booking ( Provider )
exports.getProviderBookings = async (req, res) => {
  try {
    const { status } = req.params;
    const bookings = await bookingModel
      .find({ provider: req.user._id , status })
      .populate(
        "service",
        "title category city state rating images contactNumber reviews price  "
      )
      .populate("user", "name email phone");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error while getting provider bookings",
      error: error.message,
    });
  }
};

// Update Booking Status (Provider only)
exports.updateBookings = async (req, res) => {
  try {
    let { id } = req.params;
    let { status } = req.body;

    let booking = await bookingModel.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    booking.status = status;

    await booking.save();

    res.status(200).json({ message: "Status updated", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating booking", error: error.message });

    console.log("error in updateBooking : ", error);
  }
};
