'use strict';

var Poll = require('../models/poll.js');

module.exports = {
  
  newPoll: function(data, user){
      var poll_data = {
          question: data.question,
          options: {},
          count: [],
          user: user
      }
      delete data['question'];
      for(var key in data){
        poll_data.count.push(0);
      }
      poll_data.options = data;
      return new Poll(poll_data);
  },
  
  findMyPolls: function(user, res){
    
    Poll.find({
      user: user
    }, function (err, polls) {
      if (err) return console.error(err);
      res.send(polls);
    })
  }
    
};