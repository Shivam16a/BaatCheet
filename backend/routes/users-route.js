const express = require("express");
const router = express.Router();
const islogin = require("../middleware/isLogin.js");
const searchUsers = require("../controllers/users-controller.js");

router.route("/search").get(islogin,searchUsers);

module.exports = router;