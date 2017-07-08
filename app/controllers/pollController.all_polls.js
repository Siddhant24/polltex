'use strict';

(function () {
 
 var poll_list = document.querySelector(".poll_list");
 var btn_login = document.querySelector(".btn-login");
 var header = document.querySelector("header");
 var apiUrl = appUrl + '/all_polls/get';
 var  polls = [];
 
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
     console.log(data);
      var id  = 0;
      JSON.parse(data).poll_data.slice(0,-1).forEach(function(poll){
          console.log(poll);
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
     var index = Number(e.target.getAttribute("id"));
     window.location.href = appUrl + `/api/poll/${polls[index]._id}`;
     }));
     
     if(JSON.parse(data).isAuthenticated){
       var home = document.createElement("button");
       home.setAttribute("class", "home btn-link");
       home.innerHTML = '<i class="fa fa-home" style="font-size:48px;" aria-hidden="true"></i>Home';
       header.append(home);
       var p1 = document.createElement("p");
       p1.innerHTML = 'Welcome, <span id="display-name"></span>!';
       header.append(p1);
       var a = document.createElement("a");
       a.setAttribute("class", "menu");
       a.setAttribute("href", "/profile");
       a.innerHTML = "Profile";
       header.append(a);
       var p2 = document.createElement("p");
       p2.innerHTML = "|";
       header.append(p2);
       var a2 = document.createElement("a");
       a2.setAttribute("class", "menu");
       a2.setAttribute("href", "/logout");
       a2.innerHTML ="Logout";
       header.append(a2);
       document.querySelector(".home").addEventListener("click", function(){
      window.location.href = appUrl;
     });
       var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }

   }));
     }
     else{
      document.querySelector(".login-div").removeAttribute("style");
     }
     
     btn_login.addEventListener("click", function(){
         window.location.href = appUrl + "/login";
     });
    
     
 }));
 
})();