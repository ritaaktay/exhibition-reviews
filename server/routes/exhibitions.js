const express = require("express");
const router = express.Router();
const ExhibitionsController = require("../controllers/exhibitions");

router.get("/", ExhibitionsController.All);
router.get("/:id", ExhibitionsController.GetById);
router.post("/", ExhibitionsController.Create);

module.exports = router;
