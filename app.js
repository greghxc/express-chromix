var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tabs = require('./routes/tabs');

var swaggerJSDoc = require('swagger-jsdoc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// basic auth
var basicAuth = require('express-basic-auth')
app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
    realm: 'express-chromix'
}))

// swagger-docs
var options = {
  swaggerDefinition: {
    info: {
      title: 'Express Chromix-Too',
      version: '1.0.0',
      description: 'Exposure of Chrome\'s tab API',
      path: '/',
    },
  },
  apis: ['./routes/tabs.js'], // Path to the API docs 
};
 
var swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/', index);
app.use('/tabs', tabs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
