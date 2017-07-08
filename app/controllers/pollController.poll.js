'use strict';

(function () {
 
 var apiUrl = appUrl + '/api/:id';
 var poll_list = document.querySelector(".poll_list");
 var ctx = document.getElementById("myChart");
 var poll, chart;
 var dropdown = document.querySelector(".dropdown");
 var btn_vote = document.getElementById("btn-vote");
 var header = document.querySelector("header");
 var share = document.querySelector(".btn-group");
 var prevChart = null;
 var isAuthenticated;
 ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', window.location.href + '/get', function(data){
  console.log(data);
      poll = JSON.parse(data).poll_data.slice(0,-1)[0];
      chart = JSON.parse(data).poll_data.slice(-1)[0];
      isAuthenticated = JSON.parse(data).isAuthenticated;
      console.log(poll);
      console.log(chart);
      
      if(isAuthenticated){
       var option = document.createElement("button");
       option.innerHTML = "Add new option";
       option.setAttribute("class", "btn btn-info btn-option");
       var input = document.createElement("input");
       input.setAttribute("style", "display:none");
       input.setAttribute("type", "text");
       poll_list.append(input);
       poll_list.append(option);
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
       var twitterUrl = `https://twitter.com/intent/tweet?url=${window.location.href}`;
       var facebookUrl =`https://www.facebook.com/sharer/sharer.php?u=${document.location.href}&am`;
      var a3 =document.createElement("a");
      a3.setAttribute("href", twitterUrl);
      a3.innerHTML = '<button class="twitter btn btn-primary"><i class="fa fa-twitter" style="font-size:20px" aria-hidden="true"></i>&nbsp;Tweet</button>';
      var a4 = document.createElement("a");
      a4.setAttribute("href", facebookUrl);
      a4.innerHTML = '<button class="facebook btn btn-primary"><i class="fa fa-facebook" style="font-size:20px"></i>&nbsp;Share</button>';
     share.append(a3);
     share.append(a4);
     console.log(a3);
       document.querySelector(".home").addEventListener("click", function(){
      window.location.href = appUrl;
     });
       document.querySelector(".btn-option").addEventListener("click", function(e){
      var input = document.querySelector("input");
      input.removeAttribute("style");
      e.target.innerHTML = "Submit new option";
      if(input.value != ""){
         var body = {};
         body.poll_id = poll._id;
         body.options = poll.options;
         body.options[`option${Object.keys(poll.options).length+1}`] = input.value;
         console.log(body);
         ajaxFunctions.ajaxPostRequest(body,appUrl + '/all_polls/get', function(data){
          window.location.reload();
         });
       }
     });
     var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');

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
       document.querySelector(".home").addEventListener("click", function(){
      window.location.href = appUrl + '/all_polls';
     });
      }
     
     if(prevChart){
      prevChart.destroy();
      while (dropdown.firstChild) {
       dropdown.removeChild(dropdown.firstChild);
      }
     } 
     var myChart = new Chart(ctx, chart[0]);
     prevChart = myChart;
     document.querySelector(".question").innerHTML = poll.question;
     Object.keys(poll.options).forEach(function(option){
      var newOption = document.createElement("option");
      newOption.innerHTML = poll.options[option];
      newOption.setAttribute("value", poll.options[option]);
      dropdown.append(newOption);
     });
     }));
     
     btn_vote.addEventListener("click", function(e){
      var body = {};
      body.poll_id = poll._id;
      body.option = Number(dropdown.selectedIndex) + 1;
      body.value = dropdown.value;
      ajaxFunctions.ajaxPostRequest(body, appUrl + '/my_polls/get', function(data){
       window.location.reload();
      });
     });
    
     

 
})();