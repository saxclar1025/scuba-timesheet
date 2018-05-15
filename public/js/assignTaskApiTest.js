$(document).ready(function(){
    function loadGroupOptions(callback) {
        $.get("/api/groups", groups=>{
            $("#group-select").empty();
            $("#group-unassign-select").empty();
            groups.forEach(group=>{
                $("<option value='" + group.id + "'>" + group.name + "</option>")
                    .appendTo($("#group-select"));
                $("<option value='" + group.id + "'>" + group.name + "</option>")
                    .appendTo($("#group-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadTaskOptions(callback) {
        $.get("/api/tasks", tasks=>{
            $("#task-select").empty();
            tasks.forEach(task=>{
                $("<option value='" + task.id + "'>" + task.name + "</option>")
                    .appendTo($("#task-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadUnassignTaskOptions(callback) {
        $.get("/api/groups/" + $("#group-unassign-select").val() + "/tasks/", tasks=>{
            $("#task-unassign-select").empty();
            tasks.forEach(task=>{
                $("<option value='" + task.id + "'>" + task.name + "</option>")
                    .appendTo($("#task-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    loadGroupOptions(loadUnassignTaskOptions);
    loadTaskOptions();

    $("#assign-task-form").submit(event=>{
        event.preventDefault();
        var taskAssign = {
            groupId: parseInt($("#group-select").val()),
            taskIds: [parseInt($("#task-select").val())]
        };

        $.post("/api/groups/assigntasks", taskAssign);
    });

    $("#unassign-task-form").submit(event=>{
        event.preventDefault();
        var taskUnassign = {
            groupId: parseInt($("#group-unassign-select").val()),
            taskIds: [parseInt($("#task-unassign-select").val())]
        };

        $.post("/api/groups/unassigntasks", taskUnassign);
    });

    $("#group-unassign-select").change(event=>{
        event.preventDefault();
        loadUnassignTaskOptions();
    });
});