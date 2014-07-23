// server.js

// modules ===============================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 5000; // set up oru ports
// mongoose.connect(db.url); // connect to your mongoDB database (uncomment after you set up creds)


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/json

app.use(bodyParser.json({
    extended: true
})); // parse application/x-www-form-urlencoded


app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override
app.use(express.static(__dirname + '/public')); // set the static files location public/img will be /img for users


// routes ==============================================
require('./app/routes')(app); // configure our routes


// start app  ==========================================
app.listen(port); // startup our app at the http://localhost:5000
console.log('Go time on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
