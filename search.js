/* global $*/


$(document).ready(function(){

    $('#random').on('click', function(){
         if($('#french').is(':checked')){
            window.location="https://fr.wikipedia.org/wiki/Special:Random";
        }else if($('#english').is(':checked')){
            window.location="https://en.wikipedia.org/wiki/Special:Random"; 
            } 
      
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
            $('#error').html('');  
            
            if(data[1].length >= 1){
            for (var i=0; i<data[1].length; i++){
                $('#results').append("<li><a href="+data[3][i]+" target='_blank'>"+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
             }
            }else if(data[1].length === 0){
                
                if($('#english').is(':checked')){
                    $('#error').append('<p class="alert text-center"> nothing found for "'+value+'"</p>');
                   
                    
                }else if($('#french').is(':checked')){
                    $('#error').append('<p class="alert text-center"> rien de trouvé: "' + value +'"</p>');
                    
                }
            }
        },
        error: function(errorMessage){
           alert("something went wrong");
        }
    });
 }; 

});
// end