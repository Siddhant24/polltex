'use strict';

var Poll = require('../models/poll.js');

module.exports = {
  
  newPoll: function(data, user){
      var poll_data = {
          question: data.question,
          options: {}
      }
      delete data['question'];
      poll_data.options = data;
      poll_data.user = user.github;
      return new Poll(poll_data);
  },
    
};