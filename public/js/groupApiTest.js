$(document).ready(function(){
    $("#new-group-form").submit(event=>{
        event.preventDefault();
        $.post("/api/group", {
            name:$("#new-group-name").val()
        }).done(data=>{
            console.log(data);
            $("#new-group-form").trigger("reset");
        });
    });

    $("#get-group-button").click(event=>{
        event.preventDefault();
        $.get("/api/group", group=>{
            console.log(group);
        });
    });

    $("#get-group-form").submit(event=>{
        event.preventDefault();
        $.get("/api/group/" + $("#get-group-id").val(), group=>{
            console.log(group); 
            $("#get-group-form").trigger("reset");
        });
    });

    $("#change-group-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/group/", {
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
        $.ajax("/api/group/"+$("#delete-group-id").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#delete-group-form").trigger("reset");
        });
    });
});