$( document ).ready(function() {

    $.get("https://ipinfo.io", function(response) {
        $.get( "/api/search/" + response.city, function( data ) {
            $( ".result" ).append(
                "<li class='list-group-item'>" + data.name + "<img src='" + data.image + "'>" + data.isGoing + data.goingCount + "</li>"
            );
        });
    }, "jsonp");

});

