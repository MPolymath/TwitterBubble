var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/Socket')));

app.use(function(req, res, next) {
	res.status(404).send('Not Found');
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
