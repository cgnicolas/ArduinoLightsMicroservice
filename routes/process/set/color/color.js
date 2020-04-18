const router = require('express').Router();
const { registry } = require('../../../../index');
router.post('/', (req, res) => {
    registry.executeInstruction(req.body.name, 'setcolor', req.body.payload)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(400).send(err);
    })

})

module.exports = router;