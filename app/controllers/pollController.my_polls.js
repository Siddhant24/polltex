'use strict';

(function () {
 
 var apiUrl = appUrl + '/my_polls/get';
 var poll_list = document.querySelector(".poll_list");
 var ctx = document.getElementById("myChart");
 var  polls = [];
 var dropdown = document.querySelector(".dropdown");
 var btn_vote = document.getElementById("btn-vote");
 var prevChart = null;
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      var id  = 0;
      JSON.parse(data).slice(0,-1).forEach(function(poll){
         polls.push(poll);
         var btn = document.createElement("button");
         var delBtn = document.createElement("button");
         var option_btn = document.createElement("button");
         var input = document.createElement('input');
         input.setAttribute("type", "text");
         input.setAttribute("id", `^${id}`);
         input.setAttribute("style", "display:none");
         option_btn.innerHTML = "Add a new option";
         delBtn.innerHTML = "Delete Poll";
         btn.innerHTML = poll.question;
         option_btn.setAttribute("class", "btn btn-info btn-option");
         option_btn.setAttribute("id", `-${id}`);
         btn.setAttribute("class", "btn btn-default btn-poll");
         btn.setAttribute("id", `${id}`);
         delBtn.setAttribute("class", "btn btn-danger btn-del");
         delBtn.setAttribute("id", `#${id}`);
         id++;
         poll_list.append(btn);
         poll_list.append(input);
         poll_list.append(option_btn);
         poll_list.append(delBtn);
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
     
     document.querySelectorAll(".btn-del").forEach(btn => btn.addEventListener('click', function(e){
     var index = Number(e.target.getAttribute("id").slice(1));
     ajaxFunctions.ajaxRequest('DELETE', apiUrl + `?id=${polls[index]._id}`, function (data) {
        console.log(data);
        if(data === "success")
         window.location.reload(true);
      });
     }));
     
     btn_vote.addEventListener("click", function(e){
      var body = {};
      body.poll_id = polls[Number(e.target.getAttribute("id").slice(1))]._id;
      body.option = Number(dropdown.selectedIndex) + 1;
      body.value = dropdown.value;
      ajaxFunctions.ajaxPostRequest(body, apiUrl, function(data){
       window.location.reload();
      });
     });
     
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
     
 }));
 
})();