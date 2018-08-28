$(function(){
    renderButtons(gifSearch, 'searchButton', '#buttonsDiv');
});

var gifSearch = ['Nick Cage', 'Samuel Jackson', 'Toby McGuire', 'Keanu Reeves'];
console.log(gifSearch);

function renderButtons(gifSearch, newClass) {
    $('buttonsDiv').empty();
    for(var i=0; i<gifSearch.length; i++) {
        var a = $('<button>');
        a.addClass(newClass);
        a.attr('data-type', gifSearch[i]);
        a.text(gifSearch[i]);
        $('#buttonsDiv').append(a);
    }
    console.log(renderButtons);
};

$(document).on('click', '.searchButton', function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=st20VkzeBfZpJJdk1wxg2ohULZpgJs1x&limit=10';

    $.ajax({url: queryURL, method: 'GET'})
        .then(function(response) {
          for(var i=0; i<response.data.length; i++){
            // Create new div for gif searches

            var searchDiv = $('<div class="search-item">');
            
            // Store p tag as a variable and append to div

            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: ' + rating);
            searchDiv.append(p);
            
            // Store image and reponse data as variables and append to div

            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');

            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass('searchImage');
            
            searchDiv.append(image);
            $('#searches').append(searchDiv);
        }
    })
});

// On click function to animate and pause GIFs

$(document).on('click', '.searchImage', function() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    }
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

// On click function to push a new item into gifSearch array and populate the button
// **Currently not working for some reason**
// **Work in Progress**

$('#addGif').on('click', function(gifSearch){
    event.preventDefault();
    var newSearch = $('#search-input').val().trim();
    gifSearch.push(newSearch);
    renderButtons();
});