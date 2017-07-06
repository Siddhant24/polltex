// model for a poll

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: String,
    options: { type: Schema.Types.Mixed, default: {} },
    user : {
        github: {
		    id: String,
		    displayName: String,
		    username: String,
            publicRepos: Number
	    }
    }
 }, { minimize: false });

module.exports = mongoose.model('Poll', Poll);