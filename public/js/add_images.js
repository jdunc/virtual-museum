 $(document).ready(function(){
  $(".button-collapse").sideNav();
  $('select').material_select();
  $.get({
    url: '/items',
  })
  .then(function(results){
    $(results).each(() =>{
      $('#selections').append(
        `<option value=${results.id}>${results.name}</option>`
      )
    })
  })
}) //end on document ready
