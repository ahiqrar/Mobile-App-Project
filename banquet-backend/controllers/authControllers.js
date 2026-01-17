const User = require("../models/User");
const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");

// --- UTILS ---
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// --- USER CONTROLLERS ---

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({ name, email, password }); // In real app, hash password here

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, "user"),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "user"
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.password === password) { // In real app, compare hash
      res.json({
        message: "Login successful",
        token: generateToken(user._id, "user"),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "user"
        }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- OWNER CONTROLLERS ---

exports.registerOwner = async (req, res) => {
  try {
    const { businessName, email, password, phone } = req.body;

    // Check if owner exists
    const ownerExists = await Owner.findOne({ email });
    if (ownerExists) {
      return res.status(400).json({ message: "Owner account already exists" });
    }

    // Create owner
    const owner = await Owner.create({ businessName, email, password, phone });

    res.status(201).json({
      message: "Owner registered successfully",
      token: generateToken(owner._id, "owner"),
      user: { // Sending as 'user' key for consistency on frontend
        id: owner._id,
        name: owner.businessName,
        email: owner.email,
        role: "owner",
        isVerified: owner.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });

    if (owner && owner.password === password) {
      res.json({
        message: "Login successful",
        token: generateToken(owner._id, "owner"),
        user: {
          id: owner._id,
          name: owner.businessName,
          email: owner.email,
          role: "owner",
          isVerified: owner.isVerified
        }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
