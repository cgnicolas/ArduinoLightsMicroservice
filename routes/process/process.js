const router = require('express').Router();

router.use('/set', require('./set/set'));

module.exports = router;