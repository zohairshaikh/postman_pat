var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Utils = require('./utils.js');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();
var utils = new Utils();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


function react_route(req, res, next) {
    res.sendFile('reactapp.html', {root: path.join(__dirname, '/public/templates/')});
}

require('./routes/api')(app); // Enable All API with routes
app.use('/chat', react_route);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

utils.generateGlobalHardCodedData();  // Using global user list as hardcoded data

io.on('connection', function (socket) {

    var userId;
    socket.on('new player', function (id, name) {
        userId = id = parseInt(id);
    });

    socket.on('disconnect', function (data) {
        console.log('user disconnected', data);
    });
    socket.on('newMessage', function (msg) {
        io.emit("broadcastMessage:f" + msg.from + "-t" + msg.to, msg);
    });
});


http.listen(3000, () => {
    console.log('Running server on 0.0.0.0:3000');
});
