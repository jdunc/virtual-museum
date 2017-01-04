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
  fillPage(selectedItemId);
});

}) //end on document ready

function fillPage(item){
  $.get({
    url: `/items/${item}`,
  })
  .then(function(getData){
    $('#alterForm').remove();
    $('#updatedInfo').remove();
    $('body').append(
      `<div class="container" id="alterForm">
        <br>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="" id="name" type="text" class="validate" value="${getData.name}" >
              <label for="name" class="active">Object Name</label>
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
            <div class="input-field col s12 ">
              <input id="submit" type="submit" class="waves-effect waves-light btn"  >
            </div>
          </div>
        </form>
      </div>
      </div>
      `
    )
    $('form').on('submit', function(e){
      e.preventDefault();
      let formData = {};
      $('input').each(function(){
        if(this.id !== 'submit'  && this.className !== 'select-dropdown'){
          console.log($(this));
          formData[this.id] = $(this).val();
        }
      });
      $.ajax({
        type : 'PATCH',
        data: JSON.stringify(formData),
        url: `/items/${item}`,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8'
      })
      .then((data) => {
        console.log(data);
        getURL = `/items/${data.id}`
        $.get({
          url: getURL,
        }).then((getData) => {
          $('#alterForm').remove();
          $('#updatedInfo').remove();
          resetDropDown();
          $('body').append(
            `<div id="updatedInfo" class="container">
              <h4>Object Updated!</h4><br>
                  <h5>Item Name</h5><a>${getData.name}</a>
                  <h5>Type</h5><a>${getData.type}</a>
                  <h5>Location</h5><a>${getData.culture}</a>
                  <h5>Culture</h5><a>${getData.collection}</a>
                  <h5>Collection</h5><a>${getData.location}</a>
                  <h5>Story</h5><a>${getData.story}</a>
                  <h5>Description</h5><a>${getData.description}</a>
                  <h5>Dimensions</h5><a>${getData.dimensions}</a>
                  <h5>Provenance</h5><a>${getData.provenance}</a>
            </div>
            `
          )
        })
      })
      .catch((err) => {
        alert('the request failed: ', err);
      })
    });//end on click submit
  });
}

function resetDropDown(){
  $('#selections > option').each(function () {this.remove();});
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
}
