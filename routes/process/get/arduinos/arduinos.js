const router = require('express').Router();
const { registry } = require('../../../../index');
router.get('/', (req, res) => {
    console.log(registry.getArduinoStates());
    res.status(200).json(registry.getArduinoStates());
})

module.exports = router;