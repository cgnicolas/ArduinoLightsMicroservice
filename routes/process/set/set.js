const router = require('express').Router();

router.use('/color', require('./color/color'));
router.use('/power', require('./power/power'));

module.exports = router;