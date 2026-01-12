const Banquet = require("../models/Banquet");

// Create a new banquet (Owner Only)
exports.createBanquet = async (req, res) => {
  try {
    const { ownerId, name, location, capacity, pricePerPlate, description, amenities, images } = req.body;

    // Validate required fields
    if (!ownerId || !name || !location || !capacity || !pricePerPlate) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const banquet = await Banquet.create({
      ownerId,
      name,
      location,
      capacity,
      pricePerPlate,
      description,
      amenities,
      images
    });

    res.status(201).json({
      message: "Banquet listed successfully",
      banquet,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Banquets (with Search/Filter)
exports.getBanquets = async (req, res) => {
  try {
    const { search, location } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (req.query.type) {
      query.type = req.query.type;
    }

    const banquets = await Banquet.find(query).sort({ createdAt: -1 });
    res.json(banquets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Banquet Details
exports.getBanquetById = async (req, res) => {
  try {
    const banquet = await Banquet.findById(req.params.id).populate('ownerId', 'businessName email phone');
    if (!banquet) return res.status(404).json({ message: "Banquet not found" });
    res.json(banquet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Banquets by Owner (For Owner Dashboard)
exports.getOwnerBanquets = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const banquets = await Banquet.find({ ownerId });
    res.json(banquets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update Banquet
exports.updateBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!banquet) return res.status(404).json({ message: "Banquet not found" });
    res.json({ message: "Banquet updated successfully", banquet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
