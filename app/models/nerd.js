// app/models/nerd.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NerdSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Nerd', NerdSchema);

