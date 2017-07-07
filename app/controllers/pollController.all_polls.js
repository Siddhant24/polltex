'use strict';

(function () {
 
 var apiUrl = appUrl + '/all_polls/get';
 var poll_list = document.querySelector(".poll_list");
 var  polls = [];
 var dropdown = document.querySelector(".dropdown");
 var btn_vote = document.getElementById("btn-vote");
 var ctx = document.getElementById("myChart");
 var prevChart = null;
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      var id  = 0;
      JSON.parse(data).slice(0,-1).forEach(function(poll){
         polls.push(poll);
         var btn = document.createElement("button");
         btn.innerHTML = poll.question;
         btn.setAttribute("class", "btn btn-default btn-poll");
         btn.setAttribute("id", `${id}`);
         id++;
         poll_list.append(btn);
         poll_list.append(document.createElement("br"));
         poll_list.append(document.createElement("br"));
     });
     
     document.querySelectorAll(".btn-poll").forEach(btn => btn.addEventListener('click', function(e){
     if(prevChart) prevChart.destroy();
     var index = Number(e.target.getAttribute("id"));
     var myChart = new Chart(ctx, JSON.parse(data).slice(-1)[0][index]);
     prevChart = myChart;
     document.querySelector(".question").innerHTML = polls[index].question;
     Object.keys(polls[index].options).forEach(function(option){
      var newOption = document.createElement("option");
      newOption.innerHTML = polls[index].options[option];
      newOption.setAttribute("value", polls[index].options[option]);
      dropdown.append(newOption);
     });
     dropdown.removeAttribute("style");
     document.getElementById("your_vote").removeAttribute("style");
     btn_vote.setAttribute("id", `.${index}`);
     btn_vote.removeAttribute("style");
     }));
     
     btn_vote.addEventListener("click", function(e){
      var body = {};
      body.poll_id = polls[Number(e.target.getAttribute("id").slice(1))]._id;
      body.option = Number(dropdown.selectedIndex) + 1;
      body.value = dropdown.value;
      ajaxFunctions.ajaxPostRequest(body,appUrl + '/my_polls/get', function(data){
       window.location.reload();
      });
     });
     
 }));
 
})();