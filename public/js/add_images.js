 $(document).ready(function(){
   console.log('add images js here');
  $(".button-collapse").sideNav();
  $('select').material_select();
  $.get({
    url: '/items',
  })
  .then(function(results){
    console.log(results);
    $(results).each(function(){
      console.log(this.name);
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
  addImageButton();
  // submitImages();
}

function addImageButton(){
  //on clicking anotherImage, add another choose file button
  $("#anotherImage").click( function(){
    var imageNumber = $(':file').length;
    var newNumber = imageNumber + 1;
    console.log(imageNumber);
    console.log('clicked another image');
    $("#anotherImage").before(
      `
      <input type="file" name="image${newNumber}"><br><br>
      `);
  });//end of another image click
}

// function submitImages(){
//   $('#submitButton').click(
//     function(){
//       event.preventDefault();
//     }
//   )
// }
