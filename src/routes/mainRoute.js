const express = require("express");
const router = express.Router();
const controller = require("../controller/mainController.js");

router.get("/", controller.index);

module.exports = router;