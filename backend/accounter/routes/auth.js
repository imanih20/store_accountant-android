const user = require('../controller/user');
const auth = require('../middleware/auth');
const express = require('express');

const router = express.Router();

// router.post('/login', user.login);

// router.post('/register', user.register);

router.post('/sign',user.signWithPhone);
router.post('/verify',auth,user.verifyPhone);

module.exports = router;