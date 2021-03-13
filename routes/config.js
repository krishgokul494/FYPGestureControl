const express = require('express');
const router = express.Router();
const Gesture = require('../models').Gesture
const Signal = require('../models').Signal

router.get('/', async (req, res, next) => {
    Gesture.findAll({
        raw: true,
        include: [
            {model: Signal, as: 'Signal'}
        ]
    }).then((gestures) => {
        res.send(gestures)
        console.log(gestures)
    })
})

router.get('/signal', async (req, res, next) => {
    await Signal.findAll()
        .then((signals) => {
            res.send(signals)
        }).catch((err) => {
            console.log(err)
        })
})

router.get('/change/:gesture/:signal', async (req, res) => {
    await Gesture.update(
        {signal_id: req.params.signal},
        {
            where: {
                id: req.params.gesture
            }
        }).then(() => {
            res.send("configuration changed");
        }).catch((err) => {
            console.log(err)
        })
})

module.exports = router