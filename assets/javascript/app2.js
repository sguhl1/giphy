  var foods = ['Apples', 'Hamburgers', 'Hotdogs', 'Yogurt', 'Broccoli'];

  function displayfoodInfo(){
  
    $('#foodsView').empty();     

    var foodarray = $(this).attr('data-name');
   
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + foodarray + "&api_key=wS7YIrfULoK7PgPASMKz6wiKUiVWCmao&limit=10";

    $.ajax({
      url: queryURL, 
      method: 'GET'}
    ).done(function(response) {
           var results = response.data;

           for(var i=0; i < results.length; i++){


              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {

              }
              else {
             

               console.log(response)
               
               var rating = results[i].rating;

               var p = $('<p>').text( "Rating: " + rating);

               var foodImage = $('<img>');
             
               foodImage.attr('src', results[i].images.fixed_height_still.url);
               foodImage.attr('data-still', results[i].images.fixed_height_still.url);
               foodImage.attr('data-animate', results[i].images.fixed_height.url);
               foodImage.attr('data-state', 'still');
               foodImage.addClass('foodImage');
               
               
              
               $('#foodsView').append(foodImage);

              }

           }

      $('.foodImage').on('click', function(){
      
          var state = $(this).attr('data-state'); 
            console.log(state);
         
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
           
      });

        
      });   

  }

 
  function renderButtons(){ 

    $('#buttonsView').empty();

    for (var i = 0; i < foods.length; i++){

        var a = $('<button>') 
        a.addClass('foodarray'); 
        a.addClass("btn btn-primary"); 
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', foods[i]);
        a.text(foods[i]); 
        $('#buttonsView').append(a); 
    }
  }

  $('#addfood').on('click', function(){

    var foodarray = $('#food-input').val().trim();

    foods.push(foodarray);
   
    renderButtons();

    return false;
  })

  $(document).on('click', '.foodarray', displayfoodInfo);


  renderButtons();