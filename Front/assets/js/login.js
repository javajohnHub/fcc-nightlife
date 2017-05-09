$("#loginform").ajaxForm({
    success: function(responseText){
        $('#login').modal('hide');
        alert("You have been logged in");
        search(lastSearch ? lastSearch : myCity)
    }
});