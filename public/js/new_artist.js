$(document).ready(function(){
 $(".button-collapse").sideNav();
 function reload(){
   $('#reloadPage').click(() => {
window.location.href = "/add_artist.js";
})
 }
}) //end on document ready
