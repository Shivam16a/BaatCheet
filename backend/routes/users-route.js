const express = require('express');
const router = express.Router();
const islogin = require('../middleware/isLogin.js');
const { searchUsers, getCurrentChatters, deleteCurrentChatters } = require('../controllers/users-controller.js');

router.route('/search').get(islogin, searchUsers);
router.route('/correntChatters').get(islogin, getCurrentChatters);
router.route('/deleteCurrentChatter').delete(islogin, deleteCurrentChatters);

module.exports = router;