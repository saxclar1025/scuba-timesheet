$(document).ready(function(){
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $("#member-name").text(user.firstName + " " + user.lastName);
        });
    });

    function populateUsers() {
        $("#userToChange").empty();
        $("#assign-to-user-select").empty();
        $.get("/api/users")
        .then(users=>{
            users.forEach(user=>{
                $("#userToChange").append($("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>"));
                $("#assign-to-user-select").append($("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>"));
            });
            $("#userToChange").trigger("change");
            $("#assign-to-user-select").trigger("change");
        });
    };

    function populateRoles() {
        $("#change-role-id").empty();
        $("#role-assign-select").empty();
        $("#assign-to-role-select").empty();
        $.get("/api/roles")
        .then(roles=>{
            roles.forEach(role=>{
                $("#change-role-id").append($("<option value='" + role.id + "'>" + role.name + "</option>"));
                $("#role-assign-select").append($("<option value='" + role.id + "'>" + role.name + "</option>"));
                $("#assign-to-role-select").append($("<option value='" + role.id + "'>" + role.name + "</option>"));
            });
            $("#change-role-id").trigger("change");
            $("#role-assign-select").trigger("change");
            $("#assign-to-role-select").trigger("change");
        });
    };

    function populateGroups() {
        $("#change-group-id").empty();
        $("#group-assign-select").empty();
        $("#assign-to-group-select").empty();
        $.get("/api/groups")
        .then(groups=>{
            groups.forEach(group=>{
                $("#change-group-id").append($("<option value='" + group.id + "'>" + group.name + "</option>"));
                $("#group-assign-select").append($("<option value='" + group.id + "'>" + group.name + "</option>"));
                $("#assign-to-group-select").append($("<option value='" + group.id + "'>" + group.name + "</option>"));
            });
            $("#change-group-id").trigger("change");
            $("#group-assign-select").trigger("change");
            $("#assign-to-group-select").trigger("change");
        });
    };

    function populateTasks() {
        $("#change-task-id").empty();
        $("#task-assign-select").empty();
        $("#assign-to-task-select").empty();
        $.get("/api/tasks")
        .then(tasks=>{
            tasks.forEach(task=>{
                $("#change-task-id").append($("<option value='" + task.id + "'>" + task.name + "</option>"));
                $("#task-assign-select").append($("<option value='" + task.id + "'>" + task.name + "</option>"));
                $("#assign-to-task-select").append($("<option value='" + task.id + "'>" + task.name + "</option>"));
            });
            $("#change-task-id").trigger("change");
            $("#task-assign-select").trigger("change");
            $("#assign-to-task-select").trigger("change");
        });
    };

    $("#create-user").submit(event=>{
        event.preventDefault();
        if( !$("#firstName-input").val() ||
            !$("#lastName-input").val() ||
            !$("#userName-input").val() ||
            !$("#email-input").val() ||
            !$("#password-input").val() ) {
            return;
        }
        var newUser = {
            firstName: $("#firstName-input").val(),
            lastName: $("#lastName-input").val(),
            userName: $("#userName-input").val(),
            email: $("#email-input").val(),
            password: $("#password-input").val()
        };

        $("#create-user").trigger("reset");

        $.post("/api/users", newUser).done(data=>{    
            populateUsers();
        });
    });
    
    $("#userToChange").on("change", event=>{
        $.get("/api/users/"+$("#userToChange").val())
        .then(user=>{
            $("#newFirstName").val(user.firstName);
            $("#newLastName").val(user.lastName);
            $("#newUserName").val(user.userName);
            $("#newEmail").val(user.email);
        });
    });

    $("#user-change").submit(event=>{
        event.preventDefault();
        if(!$("#userToChange").val()) return;
        var newUser = {
            id: $("#userToChange").val(),
            firstName: $("#newFirstName").val(),
            lastName: $("#newLastName").val(),
            userName: $("#newUserName").val(),
            email: $("#newEmail").val()
        };
        if(!!$("#newPassword").val()) {
            newUser.password = $("#newPassword").val();
        }
        $.ajax("/api/users/", {
            method:"PUT",
            data: newUser
        }).done( function(data){
            $("#user-change").trigger("reset");
            populateUsers();
        });
    });

    $("#delete-user-button").click(event=>{
        if(!$("#userToChange").val()) return;
        var c = confirm("Are you sure you want to delete this user?");
        if (c) {
            $.ajax("/api/users/"+$("#userToChange").val(),{
                method: "DELETE"
            }).done(data=>{

            });
        }
    });

    $("#new-role-form").submit(event=>{
        event.preventDefault();
        if(!$("#new-role-name").val()) return;

        $.post("/api/roles", {name:$("#new-role-name").val()}).done(data=>{
            $("#new-role-form").trigger("reset");
            populateRoles();
        });
    });

    $("#change-role-form").submit(event=>{
        event.preventDefault();
        if(!$("#change-role-id").val() || !$("#change-role-name").val()) return;
        $.ajax("/api/roles/", {
            method:"PUT",
            data: {
                id: $("#change-role-id").val(),
                name: $("#change-role-name").val()
            }
        }).done( function(data){
            $("#change-role-form").trigger("reset");
            populateRoles();
        });
    });

    $("#delete-role-button").click(event=>{
        if(!$("#change-role-id").val()) return;
        var c = confirm("Are you sure you want to delete this role?");
        if (c) {
            $.ajax("/api/roles/"+$("#change-role-id").val(),{
                method: "DELETE"
            }).done(data=>{
                populateRoles();
            });
        }
    });

    $("#assign-to-user-select").on("change", event=>{
        $("#role-unassign-select").empty();
        $.get("/api/users/" + $("#assign-to-user-select").val() + "/roles")
        .then(roles=>{
            roles.forEach(role=>{
                $("#role-unassign-select").append("<option value='" + role.id + "'>" + role.name + "</option>");
            });
        });
    });

    $("#assign-role-button").click(event=>{
        event.preventDefault();
        if(!$("#assign-to-user-select").val() || !$("#role-assign-select").val()) return;
        $.post("/api/users/assignroles", {
            userId:$("#assign-to-user-select").val(),
            roleIds:[$("#role-assign-select").val()]
        })
        .then(data=>{
            $("#assign-to-user-select").trigger("change");
        });
    });

    $("#unassign-role-button").click(event=>{
        event.preventDefault();
        if(!$("#assign-to-user-select").val() || !$("#role-unassign-select").val()) return;
        $.post("/api/users/deleteroles", {
            userId:$("#assign-to-user-select").val(),
            roleIds:[$("#role-assign-select").val()]
        })
        .then(data=>{
            $("#assign-to-user-select").trigger("change");
        });
    });

    $("#new-group-form").submit(event=>{
        event.preventDefault();
        if(!$("#new-group-name").val()) return;

        $.post("/api/groups", {name:$("#new-group-name").val()}).done(data=>{
            $("#new-group-form").trigger("reset");
            populateGroups();
        });
    });

    $("#change-group-form").submit(event=>{
        event.preventDefault();
        if(!$("#change-group-id").val() || !$("#change-group-name").val()) return;
        $.ajax("/api/groups/", {
            method:"PUT",
            data: {
                id: $("#change-group-id").val(),
                name: $("#change-group-name").val()
            }
        }).done( function(data){
            $("#change-group-form").trigger("reset");
            populateGroups();
        });
    });

    $("#delete-group-button").click(event=>{
        if(!$("#change-group-id").val()) return;
        var c = confirm("Are you sure you want to delete this Taskgroup?");
        if (c) {
            $.ajax("/api/groups/"+$("#change-group-id").val(),{
                method: "DELETE"
            }).done(data=>{
                populateGroups();
            });
        }
    });

    $("#assign-to-role-select").on("change", event=>{
        $("#group-unassign-select").empty();
        $.get("/api/roles/" + $("#assign-to-role-select").val() + "/groups")
        .then(groups=>{
            groups.forEach(group=>{
                $("#group-unassign-select").append("<option value='" + group.id + "'>" + group.name + "</option>");
            });
        });
    });

    $("#assign-group-button").click(event=>{
        event.preventDefault();
        if(!$("#assign-to-role-select").val() || !$("#group-assign-select").val()) return;
        $.post("/api/roles/assigngroups", {
            roleId:$("#assign-to-role-select").val(),
            groupIds:[$("#group-assign-select").val()]
        })
        .then(data=>{
            $("#assign-to-role-select").trigger("change");
        });
    });

    $("#unassign-group-button").click(event=>{
        event.preventDefault();
        if(!$("#assign-to-role-select").val() || !$("#group-unassign-select").val()) return;
        $.post("/api/roles/deletegroups", {
            roleId:$("#assign-to-role-select").val(),
            groupIds:[$("#group-assign-select").val()]
        })
        .then(data=>{
            $("#assign-to-role-select").trigger("change");
        });
    });

    //tasks
    $("#new-task-form").submit(event=>{
        event.preventDefault();
        if(!$("#new-task-name").val() || !$("#new-task-commission").val()) return;

        $.post("/api/tasks", {name:$("#new-task-name").val(), commission:$("#new-task-commission").val()}).done(data=>{
            $("#new-task-form").trigger("reset");
            populateTasks();
        });
    });

    $("#change-task-form").submit(event=>{
        event.preventDefault();
        if(!$("#change-task-id").val() || !$("#change-task-name").val() || !$("#change-task-commission").val()) return;
        $.ajax("/api/tasks/", {
            method:"PUT",
            data: {
                id: $("#change-task-id").val(),
                name: $("#change-task-name").val(),
                commission: $("#change-task-commission").val()
            }
        }).done( function(data){
            $("#change-task-form").trigger("reset");
            populateTasks();
        });
    });

    $("#delete-task-button").click(event=>{
        if(!$("#change-task-id").val()) return;
        var c = confirm("Are you sure you want to delete this task?");
        if (c) {
            $.ajax("/api/tasks/"+$("#change-task-id").val(),{
                method: "DELETE"
            }).done(data=>{
                populateTasks();
            });
        }
    });

    $("#change-task-id").on("change", event=>{
        $.get("/api/tasks/" + $("#change-task-id").val())
        .then(task=>{
            $("#change-task-name").val(task.name);
            $("#change-task-commission").val(task.commission);
        });
    });

    $("#assign-to-group-select").on("change", event=>{
        $("#task-unassign-select").empty();
        $.get("/api/groups/" + $("#assign-to-group-select").val() + "/tasks")
        .then(tasks=>{
            tasks.forEach(task=>{
                $("#task-unassign-select").append("<option value='" + task.id + "'>" + task.name + "</option>");
            });
        });
    });

    $("#assign-task-button").click(event=>{
        event.preventDefault();
        if(!$("#assign-to-group-select").val() || !$("#task-assign-select").val()) return;
        $.post("/api/groups/assigntasks", {
            groupId:$("#assign-to-group-select").val(),
            taskIds:[$("#task-assign-select").val()]
        })
        .then(data=>{
            $("#assign-to-group-select").trigger("change");
        });
    });

    $("#unassign-task-button").click(event=>{
        event.preventDefault();
        if(!$("#assign-to-group-select").val() || !$("#task-unassign-select").val()) return;
        $.post("/api/groups/deletetasks", {
            groupId:$("#assign-to-group-select").val(),
            taskIds:[$("#task-assign-select").val()]
        })
        .then(data=>{
            $("#assign-to-group-select").trigger("change");
        });
    });

    populateUsers();
    populateRoles();
    populateGroups();
    populateTasks();
});