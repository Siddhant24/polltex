'use strict';

(function () {
 
 var apiUrl = appUrl + '/my_polls/get';
 var poll_list = document.querySelector(".poll_list");
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
     var id  = 0;
     JSON.parse(data).slice(0,-1).forEach(function(poll){
         var btn = document.createElement("button");
         btn.innerHTML = poll.question;
         btn.setAttribute("class", "btn btn-default btn-poll");
         btn.setAttribute("id", `${id}`);
         id++;
         poll_list.append(btn);
         poll_list.append(document.createElement("br"));
         poll_list.append(document.createElement("br"));
     });
     
    var ctx = document.getElementById("myChart");
    document.querySelectorAll(".btn-poll").forEach(btn => btn.addEventListener('click', function(e){
     console.log(document.querySelector(".btn-poll"));
    var myChart = new Chart(ctx, JSON.parse(data).slice(-1)[0][Number(e.target.getAttribute("id"))]);
}));
 }));
 
})();