jQuery(function($){
    var topics = [
        'Spring',
        'Summer',
        'Fall',
        'Winter'
    ];

    $.each(topics, function(i, value){
        $('.buttons').append('<button type="button" value="' + value + '">' + value + '</button>');
    });

    $('.buttons button').click(function(){
        var value = $(this).val();
        $('.gifs').html('');
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search',
            method: 'GET',
            data: { q: value, limit: '10', key: 'QgIqBovnd09l5Osxax5T3msINA48WXgg' },
            success: function(data) {
                var gifs = data.data;
                $.each(gifs, function(i, gif){
                    console.log(gif);
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