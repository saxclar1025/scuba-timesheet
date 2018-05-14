$(document).ready(function(){
    $("#user-form").submit(function(event){
        event.preventDefault();
        var user = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            userName: $("#userName").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
        $("#user-form").trigger("reset");
        $.post("/api/users", user);
    });

    $("#getUsersButton").click(function(event){
        $.get("/api/users", function(users){
            console.log(users);
        });
    });

    $("#getUserById").submit(function(event){
        event.preventDefault();
        $.get("/api/users/"+$("#userId").val(), function(user){
            console.log(user);
            $("#getUserById").trigger("reset");
        });
    });

    $("#username-change").submit(function(event){
        event.preventDefault();
        $.ajax("/api/users/", {
            method:"PUT",
            data: {
                id:$("#idToChange").val(),
                userName:$("#newUsername").val()
            }
        }).done( function(data){
            console.log(data);
            $("#username-change").trigger("reset");
        });
    });

    $("#delete-user").submit(event=>{
        event.preventDefault();
        $.ajax("/api/users/"+$("#idToDelete").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#delete-user").trigger("reset");
        });
    });
});