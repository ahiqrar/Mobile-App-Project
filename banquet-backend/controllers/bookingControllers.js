const Booking = require("../models/Booking");
const bookingService = require("../services/bookingService");


exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.json({
      message: "Booking request submitted",
      booking,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("banquetId");
  res.json(bookings);
};
