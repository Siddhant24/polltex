'use strict';

(function () {
 
 var apiUrl = appUrl + '/my_polls/get';
 var poll_list = document.querySelector(".poll_list");
 var polls = [];
 
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      var id  = 0;
      JSON.parse(data).slice(0,-1).forEach(function(poll){
         polls.push(poll);
         var btn = document.createElement("button");
         var delBtn = document.createElement("button");
         delBtn.innerHTML = "Delete Poll";
         btn.innerHTML = poll.question;
         btn.setAttribute("class", "btn btn-default btn-poll");
         btn.setAttribute("id", `${id}`);
         delBtn.setAttribute("class", "btn btn-danger btn-del");
         delBtn.setAttribute("id", `#${id}`);
         id++;
         poll_list.append(btn);
         poll_list.append(delBtn);
         poll_list.append(document.createElement("br"));
         poll_list.append(document.createElement("br"));
     });
     
     document.querySelectorAll(".btn-poll").forEach(btn => btn.addEventListener('click', function(e){
     var index = Number(e.target.getAttribute("id"));
     window.location.href = appUrl + `/api/poll/${polls[index]._id}`;
     }));
     
     document.querySelectorAll(".btn-del").forEach(btn => btn.addEventListener('click', function(e){
     var index = Number(e.target.getAttribute("id").slice(1));
     ajaxFunctions.ajaxRequest('DELETE', apiUrl + `?id=${polls[index]._id}`, function (data) {
        console.log(data);
        if(data === "success")
         window.location.reload(true);
      });
     }));
    
     document.querySelector(".home").addEventListener("click", function(){
      window.location.href = appUrl;
     })
     
 }));
 
})();