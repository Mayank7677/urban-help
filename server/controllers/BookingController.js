const bookingModel = require("../models/BookingModel");
const ServiceModel = require("../models/ServiceModel");
const moment = require("moment");


// Create Booking
exports.createBooking = async (req, res) => {
  console.log(req.body);
  try {
    const { date, time, notes, name, myNumber, address, totalAmount } =
      req.body;
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
      totalAmount,
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
      .find({ provider: req.user._id, status })
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

exports.getProviderDashboardStats = async (req, res) => {
  console.log("hyy-------------------------");
  const providerId = req.user._id;

  try {
    const totalBookings = await bookingModel.countDocuments({
      provider: providerId,
      status: { $nin: ["Completed"] },
    });

    const completeBookings = await bookingModel.countDocuments({
      provider: providerId,
      status: "Completed",
    });

    const totalServices = await ServiceModel.countDocuments({
      provider: providerId,
    });

    const bookings = await bookingModel.find({
      provider: providerId,
      status: { $nin: ["Pending", "Rejected"] },
    });

    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalAmount,
      0
    );

    res.status(200).json({
      totalBookings,
      completeBookings,
      totalServices,
      totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
    console.log("error in getProviderDashboardStats : ", err);
  }
};

// charts data

// [GET] /api/analytics/revenue-per-day?start=2024-06-01&end=2024-06-28
exports.getLineChartData = async (req, res) => {
  try {
    const { start, end } = req.query;

    const matchStage = {
      status: { $nin: ["Pending", "Rejected"] },
    };

    if (start && end) {
      matchStage.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const data = await bookingModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const formatted = Array.from({ length: 7 }, (_, i) => {
      const entry = data.find((d) => d._id === ((i + 1) % 7) + 1);
      return {
        day: weekdays[i],
        desktop: entry?.totalRevenue || 0,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getBookingsPerDay = async (req, res) => {
  try {
    const { start, end } = req.query;
    const providerId = req.user._id;

    const startDate = start
      ? new Date(start)
      : moment().subtract(6, "days").startOf("day").toDate();
    const endDate = end ? new Date(end) : moment().endOf("day").toDate();

    const bookings = await bookingModel.aggregate([
      {
        $match: {
          provider: providerId,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" }, // 1 = Sunday, 2 = Monday, ...
          count: { $sum: 1 },
        },
      },
    ]);

    // Optional: Convert day numbers to names
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const formatted = bookings.map((entry) => ({
      day: dayNames[entry._id - 1],
      totalBookings: entry.count,
    }));

    // Fill missing days with 0
    const fullWeek = dayNames.map((day) => {
      const found = formatted.find((d) => d.day === day);
      return found || { day, totalBookings: 0 };
    });

    res.json(fullWeek);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

