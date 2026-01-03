const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  banquetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Banquet",
  },
  date: String,
  timeSlot: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
