const express = require("express");
const router = express.Router();
const {
  createBanquet,
  getBanquets,
} = require("../controllers/banquetControllers");

router.post("/", createBanquet);
router.get("/", getBanquets);

module.exports = router;
