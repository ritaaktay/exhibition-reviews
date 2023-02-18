const express = require("express");
const router = express.Router();
const LocationsController = require("../controllers/locations");

router.get("/", LocationsController.All);

module.exports = router;
