const router = require('express').Router();

router.use('/color', require('./color/color'));

module.exports = router;