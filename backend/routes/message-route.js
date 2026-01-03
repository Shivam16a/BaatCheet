const express = require("express");
const sendMessage = require("../controllers/message-controller.js");
const router = express.Router();

router.route("/send/:id",sendMessage);

module.exports = router;