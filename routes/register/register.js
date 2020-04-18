const router = require('express').Router();
const {registry} = require('../../index');
const Arduino = require('../../utils/Arduino');

router.post('/', (req, res) => {
    const {type, name, url, options} = req.body;
    const newArduino = new Arduino(type, name, url, options);
    registry.register(newArduino);
    console.log(registry.findArduino("Headboard"));
    res.sendStatus(200);
})

module.exports = router;