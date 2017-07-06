// model for a poll

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: String,
    options: { type: Schema.Types.Mixed, default: {} }
 }, { minimize: false });

module.exports = mongoose.model('Poll', Poll);