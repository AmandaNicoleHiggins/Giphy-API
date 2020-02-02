jQuery(function ($) {

    // Topics array
    var topics = [
        'Spring',
        'Summer',
        'Fall',
        'Winter'
    ];

    // add topics to array
    function renderButtons() {
        $(".buttons").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("weatherButtons");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $(".buttons").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#submit").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var weatherButton = $("#userInput").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(weatherButton);
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // clear the input box after submit is clicked
    $(".form-control").val("");

    // append topics to buttons
    $.each(topics, function (i, value) {
        $('.buttons').append('<button type="button" value="' + value + '">' + value + '</button>');
    });

    //When buttons are clicked
    $('.buttons button').click(function () {
        var value = $(this).val();
        $('.gifs').html('');

        //Ajax call
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search',
            method: 'GET',
            data: { q: value, limit: '10', key: 'QgIqBovnd09l5Osxax5T3msINA48WXgg' },
            success: function (data) {
                var gifs = data.data;
                $.each(gifs, function (i, gif) {
                    console.log(gif);
                    //building still gif with rating and appending to html
                    var build = '<div class="gif">' +
                        gif['rating'] +
                        '<img src="' + gif['images']['480w_still']['url'] + '" alt="' + gif['title'] + '">' +
                        '</div>';
                    $('.gifs').append(build);
                });
            }
        });
    });
});