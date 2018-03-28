// creating an empty array for fav Topics that will be added to
var topics = ["Dog", "Panda", "Deer", "Cat", "Dolphin", "Tiger" ];

$(document).ready(function () {
//create buttons for new button


function createNewButton () {
    // earase the class to avoid duplicates
    $(".animalButton").empty();

    // creating for loop for generate an button for each animal that is added to the topics array
    for (var i=0; i<topics.length; i++) {
        $(".animalButton").append("<button class='btn btn-outline-dark' id='addedButton' data-name='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}
$(document).on("click", "#submitNewAnimal", function(e){
  e.preventDefault();
  var newAnimal = $("#newAnimalInput").val();
  topics.push(newAnimal);
  createNewButton();
  console.log("newAnimal");
});

createNewButton();
});


// display giphy image from  giphy search result
$(document).on("click","#addedButton", function(){
    var animal = $(this).attr("data-name");
    var api_key = "0W74wPAFg35nNm9VMTJbdCSFrMArj6jC"
    var limit ="&limit=10"

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + api_key +limit;
    console.log("Before");
    // Performing our AJAX GET request
    console.log($.ajax);
    $.ajax({
      url: queryURL,
      type: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
      console.log("after");
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "gif"
            var gifDiv = $("<div class='gif'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var animalImage = $("<img>");

            // animalImage.attr("src",result[i].images.fixed_height.url);
            // console.log(animalImage);
            //set src attribute to still img url
            animalImage.attr("src", results[i].images.fixed_height_still.url)
                       .addClass("animalImg")
                       .attr("imgFreeze", result[i].image.fixed_height_still.url)
                       .attr("imagActive", result[i].images.fixed_height.url);
            

            // Appending the paragraph and animalImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(animalImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
            
          }
        }
        console.log(queryURL);
        console.log(response);
        });
    });

// click function for Active or Freeze giphy
$(document).on("click",".animalImg", function(){
    // store current state of the variable
    var curState = $(this).attr("currentState");
    // set conditions: if still -> active else freeze
    if (curState === "still") {
        $(this).attr("src", $(this).attr("imagActive"));
    }
    else{
        $(this).attr("src", $(this).attr("imgFreeze"));
    }
});


//add new Animal to the topics array
  // create variable for new animals

 
  
 

 



