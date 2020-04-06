const router = require('express').Router();

router.use('/colr', require('./color/color'));

module.exports = router;