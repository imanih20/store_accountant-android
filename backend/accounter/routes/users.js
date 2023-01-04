const user = require('../controller/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/me',auth, user.getUser);


module.exports = router;