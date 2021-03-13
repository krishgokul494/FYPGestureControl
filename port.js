const portName = require('./config/params.json').port_name;
const SerialPort = require('serialport');
const port = new SerialPort(portName, { baudRate: 9600 });

module.exports = port;