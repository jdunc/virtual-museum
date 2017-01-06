$(document).ready(function(){
  $(".button-collapse").sideNav();  //matrialize code to ensure small size menu collapses
  $('select').material_select();   //materialize function to ensure select box is formatted properly
  $.get({ //dynamically update drop down with items from database
    url: '/items',    //this route will return information about the items
  })
  .then(function(results){
    $(results).each(function(){  //the results includes all item details
      $('#selections').append(`<option value=${this.id}>${this.name}</option>`) //update the selection box with the name of the item and its value as the item id
    });
    $('select').material_select();
  });
  $( "#selections" ).change(function() { //once item is selected fill page with form to edit info
    var selectedItemId = $('#selections option:selected')[0].value;
    fillPage(selectedItemId);   //call to fill page function which takes an item id and retrieves the database information about that item
  });
}) //end on document ready

function fillPage(itemId){ //function to add editable form with info from database to page to allow user to update item
  $.get({
    url: `/items/${itemId}`,
  })
  .then(function(getData){
    $('#alterForm').remove();     //these two lines will remove the existing form / item information from the page
    $('#updatedInfo').remove();
    $('body').append(     //this adds the full form to the page, prefilled with the database info about an item
      `<div class="container" id="alterForm">
      <br>
      <div class="row">
      <form class="col s12">
      <div class="row">
      <div class="input-field col s12">
      <input placeholder="" id="name" type="text" class="validate" value="${getData.name}" >
      <label for="name" class="active">Object Name</label>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input placeholder="" id="reference_id" type="text" class="validate" value="${getData.reference_id}" >
      <label for="reference_id" class="active">reference_id</label>
      </div>
      <div class="input-field col s12">
      <input id="type" type="text" value="${getData.type}">
      <label for="type" class="active">Type</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="culture" type="text" value="${getData.culture}">
      <label for="culture" class="active">Culture</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="collection" type="text" value="${getData.collection}">
      <label for="collection" class="active">Collection</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="location" type="text" value="${getData.location}" >
      <label for="location" class="active">Location</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="story" type="text" value="${getData.story}" >
      <label for="story" class="active">Story</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="description" type="text" value="${getData.description}" >
      <label for="description" class="active">Description</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="dimensions" type="text" value="${getData.dimensions}" >
      <label for="dimensions" class="active">Dimensions</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <input id="provenance" type="text" value="${getData.provenance}" >
      <label for="provenance" class="active">Provenance</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <textarea id="additional" class="materialize-textarea" value="${getData.additional}" ></textarea>
      <label for="additional" class="active">Additional Information (Formatted in HTML)</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12">
      <select id="primaryImageSelections">
      <option value="" disabled selected>Select A Primary Image</option>
      </select>
      <label class="active">Select A Primary Image</label>
      </div>
      </div>
      <div class="row">
      <div class="input-field col s12 ">
      <input id="submit" type="submit" class="waves-effect waves-light btn"  >
      </div>
      </div>
      </form>
      </div>
      </div>
      `
    );
    updateImages(itemId); //this will call updateImages which fills the select box with image selections to choose primary image
    $('select').material_select();
    $('form').on('submit', function(e){     //when form is submitted, place ajax patch call to a route that will send back information to update item details on the page
      e.preventDefault();
      let formData = {};
      $('input').each(function(){       //add the information from the server to the formData object to be sent to the server
        if(this.id !== 'submit'  && this.className !== 'select-dropdown'){         //select all the form info that's not the submit button or the 'select an item' default message
          formData[this.id] = $(this).val();
        }
      });
      if($('#primaryImageSelections option:selected')[0].value !== ''){
      formData['primary_image'] = $('#primaryImageSelections option:selected')[0].value; //this chooses the selected primary image since it's not included in the input selection
      }
      formData['additional'] = $('#additional').value;
      $.ajax({ //this is the ajax call to patch the info!
        type : 'PATCH',
        data: JSON.stringify(formData),
        url: `/items/${itemId}`,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8'
      })
      .then((data) => {
        getURL = `/items/${data.id}`
        $.get({ //ajax call to see if the information was actually updated in the database
          url: getURL,
        }).then((getData) => {
          $('#alterForm').remove();
          $('#updatedInfo').remove();
          resetDropDown(); //updates the dropdown with the new name of the edited item
          $('body').append( //adding the info about the item currently in the database
            `<div id="updatedInfo" class="container">
            <h4>Object Updated!</h4><br>
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
          )
        }); //end of ajax patch call to update details about item
      }) //end of appending info received at server
      .catch((err) => {
        alert('the request failed: ', err);
      })
    });//end of submitting edited information
  }); //end of ajax call to update info on page
} //end of fill page function

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
//this function will update the images select bar with images from the directory that has the itemId as a name
function updateImages(itemId){   //dynamically update image drop down with images from directory
  $.get({
    url: `/images/${itemId}`,     //this route will return information about the items
  })
  .then(function(results){     //the results includes all item details
    $(results).each(function(){
      //update the selection box with the name of the item and its value as the item id
      $('#primaryImageSelections').append(
        `<option value=${this}>${this}</option>`
      )
    });
    $('select').material_select();
    displayImages(itemId);  //this will add the image below the dropdown to ensure correct choice
  });
}

function displayImages(itemId){ //this function will display the currently selected primary image right below the selection menu so you have an idea of what you're choosing
  $( "#primaryImageSelections" ).change(function() {
    $('#selectedImage').remove();
    var selectedImage = $('#primaryImageSelections option:selected')[0].value;
    $('#primaryImageSelections').after(`<img src="./${itemId}/${selectedImage}" style="max-height 200px; width: auto; max-width:50vw;" id="selectedImage" />`);
    $('select').material_select();

  });
}
