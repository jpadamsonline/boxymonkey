// server.js

// modules ===============================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ghost = require('ghost');
var path = require('path');

console.log(path.join(__dirname, 'config.js'));
console.log( path.join(__dirname, './node_modules/ghost/content/data/ghost-dev.db'));

ghost({
  config: path.join(__dirname, 'config.js')
});
/*
.then(function (app) {
    app.start();
});
*/

// configuration ========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 5000; // set up oru ports
mongoose.connect(db.url); // connect to your mongoDB database (uncomment after you set up creds)

app.use(function(req, res, next) {
    req.socket.on("error", function() {
        console.log('rq error');
    });
    res.socket.on("error", function() {
        console.log('rs error');
    });
    next();
});

app.use(bodyParser.json({
    extended: true,
    type: 'application/vnd.api+json'
})); // use body parser


app.use(bodyParser.urlencoded({
    extended: true
})); // use body parser // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override
app.use(express.static(__dirname + '/public')); // set the static files location public/img will be /img for users


// models here?
var Nerd = require('./app/models/nerd');

// routes ==============================================
require('./app/routes')(app); // configure our routes


// start app  ==========================================
app.listen(port); // startup our app at the http://localhost:5000
console.log('Go time on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
