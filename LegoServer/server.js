// server.js

// call the packages we need
var logger = require('morgan');
var express = require('express');       // call express
var bodyParser = require('body-parser');
var userRoutes = require('./routes/users.js');
var postRoutes = require('./routes/posts.js');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/legoApp');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        next(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
