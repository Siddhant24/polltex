'use strict';

(function () {
 
 var poll_list = document.querySelector(".poll_list");
 var dropdown = document.querySelector(".dropdown");
 var btn_vote = document.getElementById("btn-vote");
 var ctx = document.getElementById("myChart");
 var btn_login = document.querySelector(".btn-login");
 var apiUrl = appUrl + '/all_polls/get';
 var  polls = [];
 var prevChart = null;
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
     console.log(data);
      var id  = 0;
      JSON.parse(data).poll_data.slice(0,-1).forEach(function(poll){
          console.log(poll);
         polls.push(poll);
         var btn = document.createElement("button");
         var option_btn = document.createElement("button");
         var input = document.createElement('input');
         input.setAttribute("type", "text");
         input.setAttribute("id", `^${id}`);
         input.setAttribute("style", "display:none");
         option_btn.innerHTML = "Add a new option";
         btn.innerHTML = poll.question;
         btn.setAttribute("class", "btn btn-default btn-poll");
         btn.setAttribute("id", `${id}`);
         option_btn.setAttribute("class", "btn btn-info btn-option");
         option_btn.setAttribute("id", `-${id}`);
         id++;
         poll_list.append(btn);
         if(JSON.parse(data).isAuthenticated){
             poll_list.append(input);
             poll_list.append(option_btn);
         }
         poll_list.append(document.createElement("br"));
         poll_list.append(document.createElement("br"));
     });
     
     document.querySelectorAll(".btn-poll").forEach(btn => btn.addEventListener('click', function(e){
     if(prevChart){
      prevChart.destroy();
      while (dropdown.firstChild) {
       dropdown.removeChild(dropdown.firstChild);
      }
     } 
     var index = Number(e.target.getAttribute("id"));
     var myChart = new Chart(ctx, JSON.parse(data).poll_data.slice(-1)[0][index]);
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
     
     if(JSON.parse(data).isAuthenticated){
         document.querySelectorAll(".btn-option").forEach(option => option.addEventListener("click", function(e){
             var id_num= Number(e.target.getAttribute("id").slice(1));
             var input = document.getElementById(`^${id_num}`);
             input.removeAttribute("style");
             e.target.innerHTML = "Submit new option";
             if(input.value != ""){
                var body = {};
                body.poll_id = polls[id_num]._id;
                body.options = polls[id_num].options;
                body.options[`option${Object.keys(polls[id_num].options).length+1}`] = input.value;
                console.log(body);
                ajaxFunctions.ajaxPostRequest(body,appUrl + '/all_polls/get', function(data){
                    window.location.reload();
                });
             }
        }));
     }
     
     btn_login.addEventListener("click", function(){
         window.location.href = appUrl + "/login";
     });
     
 }));
 
})();