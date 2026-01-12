const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    registerOwner,
    loginOwner
} = require("../controllers/authControllers");

// User Auth Routes
router.post("/register/user", registerUser);
router.post("/login/user", loginUser);

// Owner Auth Routes
router.post("/register/owner", registerOwner);
router.post("/login/owner", loginOwner);

module.exports = router;
