/* global $*/


$(document).ready(function(){

    $('#random').on('click', function(){
      window.location="https://fr.wikipedia.org/wiki/Special:Random";
  });
  
  $('#search').click(function(){
    getPages();
  });
  
  $('#searchbar').keypress(function(e) {
    if(e.which == 13) {
       $('#results').empty();
       getPages();
    }
  });
  
 var getPages = function(){
             var value = $('#searchbar').val();
            if($('#french').is(':checked')){
            var url = "https://fr.wikipedia.org/w/api.php?action=opensearch&search="+value+"&format=json&callback=?";
            }else if($('#english').is(':checked')){
              url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+value+"&format=json&callback=?";   
            }  
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data){
            $('#results').html('');
            for (var i=0; i<data[1].length; i++){
                $('#results').append("<li><a href="+data[3][i]+" target='_blank'>"+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
             }
        },
        error: function(errorMessage){
           alert("something went wrong");
        }
    });
 }; 

});
// end