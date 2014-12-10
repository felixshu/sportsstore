/**
 * Created by FelixGrayson on 2014/11/30.
 */

var debug = require('debug');
var express = require('express'),
    logger = require('morgan'),
    bodyparser = require('body-parser'),
    cookieparser = require('cookie-parser'),
    path = require('path');

var routes = require('./router/index');


var app = express();

//view engine setup
app.set('views', path.join(__dirname + '/views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(express.static(app.get('views')));
app.use('/public', express.static(path.join(__dirname + "/public")));
app.use('/components', express.static(path.join(__dirname + "/components")));
app.use('/controllers', express.static(path.join(__dirname + "/controllers")));
app.use('/filters', express.static(path.join(__dirname + "/filters")));
app.use('/ngmodules', express.static(path.join(__dirname + "/ngmodules")));
app.use('/', routes);

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'),function(){
    debug('Express server listening on port'+server.address().port);
});