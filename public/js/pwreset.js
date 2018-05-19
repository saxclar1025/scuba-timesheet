$(document).ready(function(){
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $("#member-name").text(user.firstName + " " + user.lastName);
        });
    });

    $("#password-reset-form").submit(event=>{
        event.preventDefault();
        if( $("#new-password").val() != $("#new-password-confirm").val()) {
            alert("Passwords don't match");
            return;
        }
        $.get("/api/currentuserid")
        .then(id=>{
            $.ajax("/api/users/", {
                method: "PUT",
                data: {
                    id:id,
                    password: $("#new-password").val()
                }
            })
            .done(data=>{
                alert("Password changed");
            });
        });
    });
});