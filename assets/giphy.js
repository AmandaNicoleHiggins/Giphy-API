$(document).ready(function(){

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
            var button = $('<button type="button" class="btn btn-secondary mr-2">');
            button.val(topics[i]);
            button.text(topics[i]);
            $('.buttons').append(button);
        }
    }

    renderButtons();

    // This function handles events where one button is clicked
    $("form#add").on("submit", function (event) {
        event.preventDefault();

        var userInput = $("input[name='userInput']").val().trim();
        
        topics.push(userInput);

        // clear the input box after submit is clicked
        $(".form-control").val("");

        // calling renderButtons which handles the processing of our topics array
        renderButtons();
    });

    //When buttons are clicked
    $(document).on('click', '.buttons button', function () {
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
                    var build = '<div class="col-12 col-sm-6 gif">' + 
                        '<div class="card mb-4" id="' + gif['id'] + '">' +
                        '<img '+
                        'src="' + gif['images']['480w_still']['url'] + '" class="card-img-top" alt="' + gif['title'] + '" ' +
                        'data-state="still" ' +
                        'data-animate="' + gif['images']['original']['url'] + '" ' +
                        'data-still="' + gif['images']['480w_still']['url'] + '"' +
                        '>' +
                        '<div class="card-body">' + 
                        '<h5 class="card-title">' + gif['title'] + '</h5>' +
                        '<p class="card-text"><strong>Rating:</strong> ' + gif['rating'] + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('.gifs').append(build);
                });
            }
        });
    });

    $(document).on('click', '.gif img', function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});