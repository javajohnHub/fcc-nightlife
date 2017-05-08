$( document ).ready(function() {

    $.get("http://ipinfo.io", function(response) {
        $.get( "/api/search/" + response.city, function( data ) {
            $( ".result" ).html( data );
        });
    }, "jsonp");

});

