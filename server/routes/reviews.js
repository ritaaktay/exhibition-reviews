const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews");

router.get("/", ReviewsController.All);
router.post("/", ReviewsController.Create);

module.exports = router;
