const router = require('express').Router();
const {registry} = require('../../index');
const Arduino = require('../../utils/Arduino');

router.post('/', (req, res) => {
    const {url, options, state, uniqueFunctions} = req.body;
    const { type, name } = state;
    const newArduino = new Arduino(type, name, url, options, uniqueFunctions, state);
    registry.register(newArduino);
    res.sendStatus(200);
})

module.exports = router;