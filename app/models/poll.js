// model for a poll

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: String,
    options: [{name: String, value: Number}]
});

module.exports = mongoose.model('Poll', Poll);