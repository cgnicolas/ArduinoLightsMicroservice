const router = require('express').Router();

router.use('/arduinos', require('./arduinos/arduinos'));

module.exports = router;