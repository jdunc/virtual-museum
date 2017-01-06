$(document).ready(function(){
  console.log('add images js here');
 $(".button-collapse").sideNav();
 $('select').material_select();
 $.get({
   url: '/items',
 })
 .then(function(results){
   $(results).each(function(){
     $('#selections').append(
       `<option value=${this.id}>${this.name}</option>`
     )
   });
   $('select').material_select();
 });
 $( "#selections" ).change(function() {
  var selectedItemId = $('#selections option:selected')[0].value;
  addImages(selectedItemId);
 });
}) //end on document ready

function addImages(itemId){
 $('#imagesContainer').remove();
 $('body').append(
   `
   <div class="container" id="imagesContainer">
     <form method="post" enctype="multipart/form-data" action="/add_images_action" id="imagesForm">
         <input type="file" name="image1"><br><br>
         <button type="button" id="anotherImage">Add Another Image</button><br><br>
         <input type="hidden" name="id" value="${itemId}"></input>
         <input type="submit" value="Submit" id="submitButton">
     </form>
   </div>`
 );
}
