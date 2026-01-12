const express = require("express");
const { register, login, user } = require("../controllers/auth-controller.js");
const islogin = require("../middleware/isLogin.js")
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(islogin, user);
module.exports = router;