'use strict';

(function () {
   
   var new_poll = document.querySelector('#new');
   var my_polls = document.querySelector("#my");
   var all_polls = document.querySelector("#all");
   
   new_poll.addEventListener('click', function(){
      window.location.href = appUrl + '/new_poll';
   });
   
   my_polls.addEventListener('click', function(){
      window.location.href = appUrl + '/my_polls';
   });
   
   all_polls.addEventListener('click', function(){
      window.location.href = appUrl + '/all_polls';
   })
   
})();
