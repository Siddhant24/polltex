'use strict';

var Poll = require('../models/poll.js');

module.exports = {
  
  newPoll: function(data){
      var poll_data = {
          question: data.question,
          options: {}
      }
      delete data['question'];
      poll_data.options = data;
      return new Poll(poll_data);
  },
    
};