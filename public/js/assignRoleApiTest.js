$(document).ready(function(){
    function loadUserOptions(callback) {
        $.get("/api/users", users=>{
            $("#user-select").empty();
            $("#user-unassign-select").empty();
            users.forEach(user=>{
                $("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>")
                    .appendTo($("#user-select"));
                $("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>")
                    .appendTo($("#user-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadRoleOptions(callback) {
        $.get("/api/roles", roles=>{
            $("#role-select").empty();
            roles.forEach(role=>{
                $("<option value='" + role.id + "'>" + role.name + "</option>")
                    .appendTo($("#role-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadUnassignRoleOptions(callback) {
        $.get("/api/users/" + $("#user-unassign-select").val() + "/roles/", roles=>{
            $("#role-unassign-select").empty();
            roles.forEach(role=>{
                $("<option value='" + role.id + "'>" + role.name + "</option>")
                    .appendTo($("#role-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    loadUserOptions(loadUnassignRoleOptions);
    loadRoleOptions();

    $("#assign-role-form").submit(event=>{
        event.preventDefault();
        var roleAssign = {
            userId: parseInt($("#user-select").val()),
            roleIds: [parseInt($("#role-select").val())]
        };

        $.post("/api/users/assignroles", roleAssign);
    });

    $("#unassign-role-form").submit(event=>{
        event.preventDefault();
        var roleUnassign = {
            userId: parseInt($("#user-unassign-select").val()),
            roleIds: [parseInt($("#role-unassign-select").val())]
        };

        $.post("/api/users/unassignroles", roleUnassign);
    });

    $("#user-unassign-select").change(event=>{
        event.preventDefault();
        loadUnassignRoleOptions();
    });
});