
    $(document).on("change", ":checkbox", function (event) {
        event.preventDefault()
        var id = $(this).data("id");
        

        if (!$(this).prop("checked")){
            $.get("/api/leave/" + id, function (data) {
            switch (data) {
                case "Not Authenticated":
                    //alert("Not authenticated");
                    $(event.target).prop('checked', true);
                    $('#login').modal('show');
                    break;
                case "Now Left":
                    $("#place-" + id + " .gocount span").html(+$("#place-" + id + " .gocount span").html()-1)
                    break;
                case "Already Left":
                    alert("Already not going, status unchanged");
                    break;
            }
        });
        } else {
            $.get("/api/go/" + id, function (data) {
            switch (data) {
                case "Not Authenticated":

                    $(event.target).prop('checked', false);
                    $('#login').modal('show');
                    break;
                case "Now Going":
                    $("#place-" + id + " .gocount span").html(+$("#place-" + id + " .gocount span").html()+1)
                    break;
                case "Already Going":
                    alert("Already going, status unchanged");
                    break;
            }
        });
        }
        
    })