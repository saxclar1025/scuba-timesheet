$(document).ready(function(){
    function loadRoleOptions(callback) {
        $.get("/api/roles", roles=>{
            $("#role-select").empty();
            $("#role-unassign-select").empty();
            roles.forEach(role=>{
                $("<option value='" + role.id + "'>" + role.name + "</option>")
                    .appendTo($("#role-select"));
                $("<option value='" + role.id + "'>" + role.name + "</option>")
                    .appendTo($("#role-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadGroupOptions(callback) {
        $.get("/api/groups", groups=>{
            $("#group-select").empty();
            groups.forEach(group=>{
                $("<option value='" + group.id + "'>" + group.name + "</option>")
                    .appendTo($("#group-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadUnassignGroupOptions(callback) {
        $.get("/api/roles/" + $("#role-unassign-select").val() + "/groups/", groups=>{
            $("#group-unassign-select").empty();
            groups.forEach(group=>{
                $("<option value='" + group.id + "'>" + group.name + "</option>")
                    .appendTo($("#group-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    loadRoleOptions(loadUnassignGroupOptions);
    loadGroupOptions();

    $("#assign-group-form").submit(event=>{
        event.preventDefault();
        var groupAssign = {
            roleId: parseInt($("#role-select").val()),
            groupIds: [parseInt($("#group-select").val())]
        };

        $.post("/api/roles/assigngroups", groupAssign);
    });

    $("#unassign-group-form").submit(event=>{
        event.preventDefault();
        var groupUnassign = {
            roleId: parseInt($("#role-unassign-select").val()),
            groupIds: [parseInt($("#group-unassign-select").val())]
        };

        $.post("/api/roles/unassigngroups", groupUnassign);
    });

    $("#role-unassign-select").change(event=>{
        event.preventDefault();
        loadUnassignGroupOptions();
    });
});