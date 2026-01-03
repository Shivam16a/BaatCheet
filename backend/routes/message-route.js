const express = require("express");
const sendMessage = require("../controllers/message-controller.js");
const isLogin = require("../middleware/isLogin.js");
const router = express.Router();

router.route("/send/:id",isLogin,sendMessage);

module.exports = router;