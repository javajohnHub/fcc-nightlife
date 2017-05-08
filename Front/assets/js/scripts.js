$( document ).ready(function() {

    $.get("https://ipinfo.io", function(response) {
        $.get( "/api/search/" + response.city, function( data ) {
            $( ".result" ).html( data );
        });
    }, "jsonp");

});

