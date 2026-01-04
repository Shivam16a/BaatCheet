const express = require("express");
const router = express.Router();
const islogin = require("../middleware/isLogin.js");
const {searchUsers,getCurrentChatters} = require("../controllers/users-controller.js");

router.route("/search").get(islogin,searchUsers);
router.route("/correntChatters").get(islogin,getCurrentChatters);

module.exports = router;