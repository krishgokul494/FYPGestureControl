var express = require('express');
var router = express.Router();
var port = require('../port');
const Readline = require('@serialport/parser-readline');
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const Signal = require('../models').Signal

console.log(Signal)
/* GET users listing. */
router.get('/:name', async (req, res, next) => {
  port.write('RECV\n', (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
  parser.on('data', async (data) =>{
    if(data == null || data == '') {
      return
    }
    console.log('got word from arduino:', data);
    data = data.split(" ");
    data[1] = data[1].replace('\r', '')
    await Signal.findOne({
      where: {
        signal_code: data[1]
      }
    }).then((signal) => {
      if(signal == null || signal == []) { 
        console.log('no duplicate')
        console.log(req.params.name);
        Signal.create({
          name: req.params.name,
          signal_code: data[1],
          signal_type: data[0],
          repeat: false
        }).then(() => {
          res.send('Recieve mode ON');
          parser = null
          return
          console.log("signal added");
        }).catch((err) => {
          console.log(err)
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  });
});

module.exports = router;
