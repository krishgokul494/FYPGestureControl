var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cons = require('consolidate');
const {sequelize} = require('./models')

var uiRouter = require('./routes/ui');
var recvModeRouter = require('./routes/recv_mode.js');
var sendModeRouter = require('./routes/send_mode');
var configRouter = require('./routes/config');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res, next) => {
  res.redirect('ui');
})
app.get('/app', (req, res, next) => {
  res.render('app.html')
});
app.use('/ui', uiRouter);
app.use('/recv', recvModeRouter);
app.use('/send', sendModeRouter);
app.use('/config', configRouter);

const port = require('./port');


// Read the port data
port.on("open", () => {
    console.log('serial port open');
  });

module.exports = app;
