const Booking = require("../models/Booking");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    console.log("Booking Request Body:", req.body);
    const { userId, banquetId, date, timeSlot, guestCount, totalPrice } = req.body;

    const booking = await Booking.create({
      userId,
      banquetId,
      date,
      timeSlot,
      guestCount,
      totalPrice
    });

    console.log("Booking Created:", booking);
    res.status(201).json({
      message: "Booking request sent successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking Creation Error:", error);
    res.status(400).json({
      message: "Booking failed. Please check if you are logged in and selecting a valid banquet.",
      error: error.message
    });
  }
};

// Get User's Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId })
      .populate('banquetId', 'name location images')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Owner's Banquets Bookings
exports.getOwnerBookings = async (req, res) => {
  // This is complex as bookings are linked to banquets, not directly to owners.
  // 1. Find all banquets by this owner
  // 2. Find bookings for those banquets
  try {
    // Implementation pending proper middleware setup
    res.status(501).json({ message: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
