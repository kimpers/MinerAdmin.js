var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Parse = require('parse').Parse;


var routes = require('./routes/index');
var users = require('./routes/users');
var miner = require('./routes/miner');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('json spaces', 2);

// Setup Parse
Parse.initialize("wPlZWRv5VWbY5ZM1VkeHyfxSYXAvBhEY2n20CjV1", "cTcCL3ewGe33rvLCwIBQ7TXpNmXWMBzD1oy3CPoC");

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
// Prefetch miner info
app.use('/miner/', function(req, res, next) {
	req.Miner = Parse.Object.extend('Miner');
	return next();
});
app.use('/miner/status', function(req, res, next) {
	var q = new Parse.Query(req.Miner);
	q.find({
		success: function(miners) {
			req.miners = miners;
			return next();
		},
		error: function(err) {
			console.error(err);
			return next(err);
		}
	});
});
app.use('/miner', miner);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});
module.exports = app;
