var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var Twitter = require('twitter-js-client').Twitter;
//  app instance
var app = express();
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var configDB = require('./routes/database.js');
//  Connect db
var db = mongoose.connect(configDB.url, {auth:{authdb:"admin"}});
var url = require('url');
//var Twitter = require('twitter');

/*var client = new Twitter({
	consumer_key: '9BHeLsq2NTO2kPZKBSkcLm5No',
	consumer_secret: 'SAwsJ6odkwu0efTZ0v7LOCd6uJtWFZA5Wr6Y93q5qRK3ibFNDk',
	access_token_key: '3012074284-EqTcnHDMlEuP7fxF3XMSATQWRHteK3XVNOHiqOJ',
	access_token_secret: 'D1OQ40XjGsd0tUfo1qOfnLNSaJh0foFg2Xio8pVlRks7s'
});

	client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
		stream.on('data', function(tweet) {
//			socket.emit('chat message', tweet.txt);
			console.log('tweet: ' + tweet.text);
		});
		});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'TwitterBubble/Socket')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// required for passport
app.use(session({
			     store: new MongoStore({mongooseConnection: mongoose.connection}),
				 resave: true,
				 maxAge: new Date(Date.now() + 3600000),
				 saveUninitialized:false,
				 secret: 'foo' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes/passport.js')(passport); // pass passport for configuration
// routes
require('./routes/routes.js')(app, passport); // connects routes and configured passport

// default routes
//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
//	var err = new Error('Not Found');
	res.status(404).send('Not Found');
// 	err.status = 404;
//  next(err);
});

// error handlers

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
