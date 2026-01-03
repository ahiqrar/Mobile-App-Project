const mongoose = require("mongoose");

const banquetSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  price: Number,
  highlighted: {
    type: Boolean,
    default: false,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Banquet", banquetSchema);
