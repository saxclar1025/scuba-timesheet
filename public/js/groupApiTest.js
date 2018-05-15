$(document).ready(function(){
    $("#new-group-form").submit(event=>{
        event.preventDefault();
        $.post("/api/groups", {
            name:$("#new-group-name").val()
        }).done(data=>{
            console.log(data);
            $("#new-group-form").trigger("reset");
        });
    });

    $("#get-group-button").click(event=>{
        event.preventDefault();
        $.get("/api/groups", group=>{
            console.log(group);
        });
    });

    $("#get-group-form").submit(event=>{
        event.preventDefault();
        $.get("/api/groups/" + $("#get-group-id").val(), group=>{
            console.log(group); 
            $("#get-group-form").trigger("reset");
        });
    });

    $("#change-group-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/groups/", {
            method:"PUT",
            data: {
                id:$("#change-group-id").val(),
                name:$("#change-group-name").val()
            }
        }).done( function(data){
            console.log(data);
            $("#change-group-form").trigger("reset");
        });
    });

    $("#delete-group-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/groups/"+$("#delete-group-id").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#delete-group-form").trigger("reset");
        });
    });
});