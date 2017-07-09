'use strict';

var Poll = require('../models/poll.js');
var chartHandler = require('../charts/chartHandler.js');

module.exports = {
  
  allPolls: function(res, isAuthenticated){
    Poll.find({}, function(err, docs){
      if(err) return console.error(err);
      res.json({poll_data: chartHandler.myCharts(docs), isAuthenticated: isAuthenticated});
    });
  },
  
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
  
  findMyPoll: function(poll_id ,res, isAuthenticated){
    Poll.find({_id: poll_id}, function(err, poll){
      if(err) return console.error(err);
      res.json({poll_data: chartHandler.myCharts(poll), isAuthenticated: isAuthenticated});
    })
  },
  
  removeMyPoll: function(id, user){
    Poll.remove({_id: id, user: user}, function(err) { 
      if(err) return console.error(err);
    });
  },
  
  myVote: function(user_id, body){
      console.log("myvote");
    var countField = {};
    countField["count." + (body.option-1).toString()] = 1;
    var voterInfo = {id: user_id, vote: body.value, option: body.option};
    Poll.findOneAndUpdate({_id: body.poll_id}, {
      $push: { voters: voterInfo },
      $inc : countField
    }, {new: true}, function(data){
    });
  },
  
  deleteMyVote: function(voter, poll_id){
      console.log(voter);
    var countField = {};
    countField["count." + (voter.option-1).toString()] = -1;
    Poll.findOneAndUpdate({_id: poll_id}, {
      $pull: {voters: voter },
      $inc: countField
    }, {new:true}, function(data){
      
    });
  },
  
  Voted: function(user_id, poll_id){
      console.log("voted");
      var voted = null;
      var promise = new Promise(function(resolve, reject) {
        Poll.findOne({_id: poll_id}, function(err, poll){
     //       console.log(poll.voters);
            console.log(user_id);
          if(err) return console.error(err);
          poll.voters.forEach(function(voter){
              console.log(voter.id);
            if(voter.id == user_id){
              voted = voter;
              resolve(voted);
            }
          });
          resolve(voted);
        });
      });
      
     return promise.then(function(voted) {
         console.log("found");
         console.log(voted);
        return voted;
          }, function(voted) {
              console.log("not found");
        return voted;
        });
   },
   
   addOption: function(data){
     console.log(data);
   /*  var optionField = {};
     optionField["options." + data.option] = data.value;*/
     Poll.findOneAndUpdate({_id: data.poll_id}, {
       options: data.options,
       $push : {count: 0}
     },{new: true}, function(doc){
       
     });
   }
};