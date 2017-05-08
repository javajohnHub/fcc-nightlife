$(document).on("click", "going", function () {
    var id = $(this).data("id");


    $.get("/api/go/" + id, function (data) {
        if (data == "Now Going"){
            //Increment going count
            //Mark as going
        }
    });
})