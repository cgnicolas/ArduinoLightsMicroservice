const router = require('express').Router();

router.use('/process', require('./process/process'));
router.use('/register', require('./register/register'));

module.exports = router;