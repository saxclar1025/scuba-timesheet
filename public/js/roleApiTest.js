$(document).ready(function(){
    $("#new-role-form").submit(event=>{
        event.preventDefault();
        $.post("/api/roles", {
            name:$("#new-role-name").val()
        }).done(data=>{
            console.log(data);
            $("#new-role-form").trigger("reset");
        });
    });

    $("#get-roles-button").click(event=>{
        event.preventDefault();
        $.get("/api/roles", roles=>{
            console.log(roles);
        });
    });

    $("#get-role-form").submit(event=>{
        event.preventDefault();
        $.get("/api/roles/"+$("#get-role-id").val(), role=>{
            console.log(role);
            $("#get-role-form").trigger("reset");
        });
    });

    $("#change-role-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/roles/", {
            method:"PUT",
            data: {
                id:$("#change-role-id").val(),
                name:$("#change-role-name").val()
            }
        }).done( function(data){
            console.log(data);
            $("#change-role-form").trigger("reset");
        });
    });

    $("#delete-role-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/roles/"+$("#delete-role-id").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#delete-role-form").trigger("reset");
        });
    });
});