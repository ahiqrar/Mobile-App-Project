const mongoose = require("mongoose");

const banquetSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String, // e.g., 'Wedding', 'Birthday', 'Corporate', 'Party'
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerPlate: {
    type: Number,
    required: true,
  },
  images: [{
    type: String, // URLs
  }],
  amenities: [{
    type: String, // WiFi, AC, Parking, etc.
  }],
  rating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Banquet", banquetSchema);
