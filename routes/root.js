const router = require('express').Router();

router.use('/process', require('./process/process'));

module.exports = router;