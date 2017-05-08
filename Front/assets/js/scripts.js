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
                "<li class='list-group-item'>" + "<div class='row'><img class='img-fluid img-thumbnail rounded float-left' style='width:100px;height:100px;' src='" + image + "'>" + "<h3 class='text-center'>" + name + "</h3>" + "<div class='col'>I Going " + isGoing + "</div>" + "<div class='col'>Going count " + goingCount + "</div></div></li>"
            );
}

function replaceItem(id, name, image, goingCount, isGoing){
    $(".result").innerHTML = '';
    $( ".result" ).append(
        "<li class='list-group-item'>" + "<div class='row'><img class='img-fluid img-thumbnail rounded float-left' style='width:100px;height:100px;' src='" + image + "'>" + "<h3 class='text-center'>" + name + "</h3>" + "<div class='col'>I Going " + isGoing + "</div>" + "<div class='col'>Going count " + goingCount + "</div></div></li>"
    );
}
$("#go").on('click', function(){
    $.get("https://ipinfo.io", function(response) {
        $.get( "/api/search/" + $("#city").val(), function( data ) {
            JSON.parse(data).forEach(function (bar){
                replaceItem(bar.id, bar.name, bar.image, bar.goingCount, bar.isGoing);
            })
        });
    }, "jsonp");

});