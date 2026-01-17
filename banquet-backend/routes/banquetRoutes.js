const express = require("express");
const router = express.Router();
const {
  createBanquet,
  getBanquets,
  getBanquetById,
  getOwnerBanquets,
  updateBanquet
} = require("../controllers/banquetControllers");

router.post("/", createBanquet);
router.get("/", getBanquets);
router.get("/:id", getBanquetById);
router.get("/owner/:ownerId", getOwnerBanquets);
router.put("/:id", updateBanquet);

module.exports = router;
