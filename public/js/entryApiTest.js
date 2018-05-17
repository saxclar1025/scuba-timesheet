$(document).ready(function(){
    function loadUserOptions(callback) {
        $.get("/api/users", users=>{
            $("#new-entry-user").empty();
            users.forEach(user=>{
                $("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>")
                    .appendTo($("#new-entry-user"));
            });
            if(!!callback) callback();
        });
    };

    function loadGroupOptions(callback) {
        $.get("/api/users/" + $("#new-entry-user").val() + "/roles", roles=>{
            $("#new-entry-group").empty();
            var userGroupIds = [];
            roles.forEach(role=>{
                $.get("/api/roles/"+role.id+"/groups", groups=>{
                    groups.forEach(group=>{
                        if(userGroupIds.indexOf(group.id) === -1){
                            userGroupIds.push(group.id);
                            $("<option value='" + group.id + "'>" + group.name + "</option>")
                            .appendTo($("#new-entry-group"));
                        }
                    });
                });
            });
            if(!!callback) callback();
        });
    };

    function loadTaskOptions(callback) {
        $.get("/api/groups/" + $("#new-entry-group").val() + "/tasks", tasks=>{
            $("#new-entry-task").empty();
            tasks.forEach(task=>{
                $("<option value='" + task.id + "'>" + task.name + "</option>")
                    .appendTo($("#new-entry-task"));
            });
            if(!!callback) callback();
        });
    };

    loadUserOptions(function(){
        loadGroupOptions(function(){
            loadTaskOptions();
        });
    });

    $("#new-entry-user").change(event=>{
        loadGroupOptions();
    });

    $("#new-entry-group").change(event=>{
        loadTaskOptions();
    });

    $("#new-entry-form").submit(event=>{
        event.preventDefault();
        console.log($("#new-entry-date").val());
        var newEntry = {
            date: $("#new-entry-date").val(),
            quantity: parseInt($("#new-entry-quantity").val()),
            TaskId: $("#new-entry-task").val(),
            UserId: $("#new-entry-user").val()
        };
        $.post("/api/entries", newEntry);
    });
});