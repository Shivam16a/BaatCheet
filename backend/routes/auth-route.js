const express = require("express");
const register = require("../controllers/auth-controller.js");

const router = express.Router();

router.route("/register").post(register);

module.exports = router;