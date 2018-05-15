$(document).ready(function(){
    $("#new-task-form").submit(event=>{
        event.preventDefault();
        $.post("/api/tasks", {
            name:$("#new-task-name").val(),
            commission:parseFloat($("#new-task-commission").val())
        }).done(data=>{
            console.log(data);
            $("#new-task-form").trigger("reset");
        });
    });

    $("#get-task-button").click(event=>{
        event.preventDefault();
        $.get("/api/tasks", task=>{
            console.log(task);
        });
    });

    $("#get-task-form").submit(event=>{
        event.preventDefault();
        $.get("/api/tasks/" + $("#get-task-id").val(), task=>{
            console.log(task); 
            $("#get-task-form").trigger("reset");
        });
    });

    $("#change-task-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/tasks/", {
            method:"PUT",
            data: {
                id:$("#change-task-id").val(),
                name:$("#change-task-name").val()
            }
        }).done( function(data){
            console.log(data);
            $("#change-task-form").trigger("reset");
        });
    });

    $("#delete-task-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/tasks/"+$("#delete-task-id").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#delete-task-form").trigger("reset");
        });
    });
});