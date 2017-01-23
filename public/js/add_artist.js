$(document).ready(function(){
 $(".button-collapse").sideNav();
 // $('form').on('submit', function(e){
 //   e.preventDefault();
 //   console.log(e.target.files);
 //   var formData = new FormData();
 //   $('input').each(function(){
 //     if(this.id !== 'submit' && this.type !== 'file'){
 //       formData[this.id] = $(this).val();
 //     }
 //   });
 //   var file = $('#profileImage')[0]['files'][0];
 //   formData['files[]'] = file;
 //   console.log(file);
 //   console.log(formData);
 //   var test = {'1':'2'};
 //   $.post({
 //     data: formData,
 //     url: '/add_artist',
 //     cache: false,
 //     contentType: false,
 //     processData: false
 //   })
 //   .then((getData) => {
 //     $('form').remove();
 //       $('body').append(
 //         `
        //  <div class="container">
        //   <h4>Artist Added</h4><br>
        //    <h5>Item Name</h5><a>${getData.artist_name}</a>
        //    <h5>Brief</h5><a>${getData.brief}</a>
        //    <h5>Description</h5><a>${getData.description}</a>
        //    <h5>Community</h5><a>${getData.community}</a>
        //    <h5>Image Status:<a>${getData.file}</a></h5>
        //    <br><br>
        //    <button id="reloadPage">Add Another Artist</button>
        //   </div>
 //         `
 //       );
 //       reload();
 //     })
 //   .catch((err) => {
 //     alert('the request failed: ', err);
 //   })
 // });//end on click submit
}) //end on document ready

function reload(){
  $('#reloadPage').click(() => {
    location.reload();
  })
}
