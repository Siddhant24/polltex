'use strict';

(function () {
 
 var apiUrl = appUrl + '/my_polls/get';
 var poll_list = document.querySelector(".poll_list");
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
     console.log(JSON.parse(data));
     JSON.parse(data).forEach(function(poll){
         var btn = document.createElement("button");
         btn.innerHTML = poll.question;
         btn.setAttribute("class", "btn btn-default");
         poll_list.append(btn);
         poll_list.append(document.createElement("br"));
         poll_list.append(document.createElement("br"));
     });
     
 }));
 
})();