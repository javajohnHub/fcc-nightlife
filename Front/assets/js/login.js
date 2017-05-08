$("#loginform").ajaxForm({
    success: function(responseText){
        alert(responseText);
    }
});