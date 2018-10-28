var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require("fs");
var axios = require("axios");

var oxford = require("./oxford-api");
var wordnik = require("./wordnik-api");
var datamuse = require("./datamuse-api");
var anagramica = require("./anagramica-api");

var app = express();

app.set('view engine', 'pug');

//app.use(express.static('../build'));
app.use(cors());

/* app.get('/', function (req, res) {
    res.sendFile("../build/index.html" );
 }) */

app.get('/', function (req, res) {
  res.render('index', { title: 'Word Wrangler (server)', message: 'Pug woz ere'})
})


// API routes
app.use('/oxford', oxford);
app.use('/wordnik', wordnik);
app.use('/datamuse', datamuse);
app.use('/anagramica', anagramica);

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

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })


module.exports = app;
