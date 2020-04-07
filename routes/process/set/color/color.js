const router = require('express').Router();
const { client } = require('../../../../index');
router.post('/', (req, res) => {
    client.executeInstruction('setcolor', req.body.payload)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        // console.log(err);
        res.status(400).send(err.stack);
    })

})

module.exports = router;