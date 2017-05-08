$( document ).ready(function() {

    $.get("https://ipinfo.io", function(response) {
        $.get( "/api/search/" + response.city, function( data ) {
            JSON.parse(data).forEach(function (bar){
                addItem(bar.id, bar.name, bar.image, bar.goingCount, bar.isGoing, bar.address);
            })
        });
    }, "jsonp");



/**
 * Add item to results
 * @param {String} id unique ID associated to the bar
 * @param {String} name Human-Readable name of bar
 * @param {String} image URI of image associated with the bar
 * @param {Number} goingCount Number of people going
 * @param {Boolean} isGoing If the current (logged-in) user is going
 */
function addItem(id, name, image, goingCount, isGoing, address){
    var checked = isGoing ? 'checked' : "";
    $( ".result" ).append(
        "<li class='list-group-item' id='place-" + id + "'><div class='row'><div class='col-3'>"+
        "<img class='img-fluid img-thumbnail rounded ' style='width:100px;height:100px;' src='" + image + "'><p>" + 
        address + "</p></div>" +
        "<h3 class='text-center col-3'>" + name + "</h3>" + 
        "<div class='attending col-3'>" + `<h2>Wanna go?</h2><label class="switch">
  <input type="checkbox" data-id='${id}' ${checked}>
  <div class="slider"></div>
</label>` + "</div>" + 
        "<div class='col-3 gocount' >Going count <span>" + goingCount + "</span></div></div></li>"
    );
}

$("#go").on('click', function(){
    $(".result").html("")
    $.get( "/api/search/" + $("#city").val(), function( data ) {
        JSON.parse(data).forEach(function (bar){
            addItem(bar.id, bar.name, bar.image, bar.goingCount, bar.isGoing);
        })

    });
    $("#city").val("")
});


});