const router = require('express').Router();

router.use('/uniqueFunction', require('./uniqueFunction/uniqueFunction'));

module.exports = router;