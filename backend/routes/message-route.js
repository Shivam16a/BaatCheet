const express = require("express");
const {sendMessage,getMessages} = require("../controllers/message-controller.js");
const islogin = require("../middleware/isLogin.js");
const router = express.Router();

router.route("/send/:id").post(islogin,sendMessage);
router.route("/:id").get(islogin,getMessages);

module.exports = router;