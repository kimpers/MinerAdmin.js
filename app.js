var express       = require('express');
var path          = require('path');
var favicon       = require('static-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var bodyParser    = require('body-parser');
var flash         = require('connect-flash');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoskin     = require('mongoskin');
var bcrypt        = require('bcrypt-nodejs');

var routes = require('./routes/index');
var users  = require('./routes/users');
var miner  = require('./routes/miner');

var app = express();
var db = mongoskin.db('mongodb://@localhost:27017/miner_admin', {safe: true});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
			secret: 'to_the_moon'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(
		function(username, password, done){
			db.collection('users').findOne({username: username}, function (err, user) {
				if(err){
					console.error(err);
					return done(err,null);
				} else if(!user){
					return done(null, false, {message: 'Incorrect username.'});
				}else {
					bcrypt.compare(password, user.password, function (err, res) {
						if(err){
							console.error(err);
							return done(err,null);
						}
						if(res)
							return done(null,user);
						else
							return done(null, false, { message: 'Incorrect password.' });
					});
				}
			});
		}
));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	db.collection('users').findById(id, function(err, user) {
		done(err,user);
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('json spaces', 2);

// Set default global variables
app.locals.css = { button_class: 'btn btn-primary' };


app.get('/login', function(req, res){
	var flash = req.flash('error')[0];
	res.render('login', {error: flash});
});
app.post('/login',
	passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true })
);

// API auth
app.use('/miner', function (req, res, next) {
	if(req.isAuthenticated())
		return next();
	else
		res.json({error: "unauthenticated"});
});
app.use('/miner/', function(req, res, next) {
	db.collection('miners').find().toArray(function(err, result) {
		if(err)
			return next(err);
		req.miners = result;
		return next();
	});
});
app.use('/miner', miner);

// Regular auth
app.use(function (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	else
		res.redirect('/login');
});
app.use(routes);
app.use('/users', users);



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
