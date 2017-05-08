$( document ).ready(function() {

    $.get("https://ipinfo.io", function(response) {
        $.get( "/api/search/" + response.city, function( data ) {
            JSON.parse(data).forEach(function (bar){
                addItem(bar.id, bar.name, bar.image, bar.goingCount, bar.isGoing);
            })
        });
    }, "jsonp");

});

/**
 * Add item to results
 * @param {String} id unique ID associated to the bar
 * @param {String} name Human-Readable name of bar
 * @param {String} image URI of image associated with the bar
 * @param {Number} goingCount Number of people going
 * @param {Boolean} isGoing If the current (logged-in) user is going
 */
function addItem(id, name, image, goingCount, isGoing){
   $( ".result" ).append(
                "<li class='list-group-item'>" + name + "<img src='" + image + "'>" + isGoing + goingCount + "</li>"
            );
}