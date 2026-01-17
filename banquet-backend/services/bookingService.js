const Booking = require("../models/Booking");

exports.createBooking = async (data) => {
  const existingBooking = await Booking.findOne({
    banquetId: data.banquetId,
    date: data.date,
    timeSlot: data.timeSlot,
    status: { $ne: "rejected" },
  });

  if (existingBooking) {
    throw new Error("This banquet is already booked for this time");
  }

  return await Booking.create(data);
};
