'use strict';

var Poll = require('../models/poll.js');
var chartHandler = require('../charts/chartHandler.js');

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
      res.json(chartHandler.myCharts(polls));
    })
  },
  
  removeMyPoll: function(id, user){
    Poll.remove({_id: id, user: user}, function(err) { 
      if(err) throw err;
    });
  },
  
  myVote: function(user_id, body){
    var countField = {};
    countField["count." + (body.option-1).toString()] = 1;
    var voterInfo = {id: user_id, vote: body.value};
    console.log(body.poll_id);
    Poll.findOneAndUpdate({_id: body.poll_id}, {
      $push: { voters: voterInfo },
      $inc : countField
    }, {new: true}, function(data){
      console.log(data);
    });
  },
  
 /* hasVoted: function(id){
    Poll.find({})
  }
    */
};