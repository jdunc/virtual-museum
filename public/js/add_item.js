 $(document).ready(function(){
  $(".button-collapse").sideNav();
  $('form').on('submit', function(e){
    e.preventDefault();
    let formData = {};
    $('input').each(function(){
      if(this.id !== 'submit'){
        console.log($(this));
        formData[this.id] = $(this).val();
      }
      formData['additional'] = $('#additional').value;
    });
    $.post({
      data: JSON.stringify(formData),
      url: '/items',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8'
    })
    .then((data) => {
      console.log(data);
      getURL = `/museum/${data.id}`
      $.get({
        url: getURL,
      }).then((getData) => {
        $('body').append(
          `<h4>Object Added</h4><br>
                <h5>Item Name</h5><a>${getData.name}</a>
                <h5>Type</h5><a>${getData.type}</a>
                <h5>Location</h5><a>${getData.culture}</a>
                <h5>Culture</h5><a>${getData.collection}</a>
                <h5>Collection</h5><a>${getData.location}</a>
                <h5>Story</h5><a>${getData.story}</a>
                <h5>Description</h5><a>${getData.description}</a>
                <h5>Dimensions</h5><a>${getData.dimensions}</a>
                <h5>Provenance</h5><a>${getData.provenance}</a>
          `
        )
      })
    })
    .catch((err) => {
      alert('the request failed: ', err);
    })
  });//end on click submit
}) //end on document ready
