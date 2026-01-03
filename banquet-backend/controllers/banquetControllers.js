const Banquet = require("../models/Banquet");


exports.createBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.create(req.body);
    res.json({
      message: "Banquet added successfully",
      banquet,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getBanquets = async (req, res) => {
  const banquets = await Banquet.find().sort({ highlighted: -1 });
  res.json(banquets);
};
