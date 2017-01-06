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
  $('#updatedInfo').remove();
  $('#imagesContainer').remove();
 $('body').append(
   `
   <div class="container" id="imagesContainer">
     <form id="removeItemForm">
        <a>Click Submit To Remove Item</a><br><br>
         <input type="hidden" name="id" value="${itemId}"></input>
         <input type="submit" value="Submit" id="submitButton">
     </form>
   </div>`
 );
 removeItem();
 // submitImages();
}

function removeItem(){
  $('form').on('submit', function(e){     //when form is submitted, place ajax patch call to a route that will send back information to update item details on the page
    e.preventDefault();
    var itemId = $("input[name='id']").val();
    console.log(itemId);
    $.ajax({ //this is the ajax call to patch the info!
      type : 'DELETE',
      url: `/items/${itemId}`,
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8'
    })
    .then((getData) => {
      $('body').append( //adding the info about the item currently in the database
        `<div id="updatedInfo" class="container">
        <h4>Item Removed!</h4><br>
        <h5>Item Name</h5><a>${getData.name}</a>
        <h5>Reference Id</h5><a>${getData.reference_id}</a>
        <h5>Type</h5><a>${getData.type}</a>
        <h5>Location</h5><a>${getData.culture}</a>
        <h5>Culture</h5><a>${getData.collection}</a>
        <h5>Collection</h5><a>${getData.location}</a>
        <h5>Story</h5><a>${getData.story}</a>
        <h5>Description</h5><a>${getData.description}</a>
        <h5>Dimensions</h5><a>${getData.dimensions}</a>
        <h5>Provenance</h5><a>${getData.provenance}</a>
        <h5>Additional</h5><a>${getData.additional}</a>
        <h5>Primary Image</h5><img src="./${getData.id}/${getData.primary_image}" style="height:200px; width:auto; max-width:50vw"/>
        </div>
        `
      );
      resetDropDown();
    }) //end of appending info received at server
    .catch((err) => {
      alert('the request failed: ', err);
    })
  });//end of submitting edited information
}

//update the dropdown menu based on the newly submitted information
function resetDropDown(){
  $('#selections > option').each(function () {this.remove();});   //remove all the existing selection options
  $.get({   //update the selections with the information in database after the update was submitted, same as above, just might have a new name for recently updated item
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
}
