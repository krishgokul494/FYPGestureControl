var express = require('express');
var router = express.Router();
var port = require('../port');
const Readline = require('@serialport/parser-readline');
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const Gesture = require('../models').Gesture;
const Signal = require('../models').Signal;


/* GET users listing. */
router.get('/:gesture', async function(req, res, next) {
    const gesture = req.params.gesture;
    parser.on('data', async (data) =>{
        console.log('got word from arduino:', data);
    });

    await Gesture.findOne({
        attributes: ['signal_id'],
        where: {
            name: gesture
        }
    }).then(async (gesture) => {
        if(gesture && gesture.dataValues.signal_id) {
            await Signal.findOne({
                where: {
                    id: gesture.dataValues.signal_id
                }
            }).then((signal) => {
                port.write('SEND ' + signal.dataValues.signal_type + ' ' + signal.dataValues.signal_code + '\n', (err) => {
                    if (err) {
                        return console.log('Error on write: ', err.message);
                    }
                    console.log('code sent');
                });
            }).catch((err) => {
                console.log(err);
            })
        }
    })
    
    res.send(gesture + 'code sent');
});

module.exports = router;
