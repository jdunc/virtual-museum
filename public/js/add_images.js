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
  })
}) //end on document ready
