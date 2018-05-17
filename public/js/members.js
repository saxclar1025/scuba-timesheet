$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $(".member-name").text(user.firstName + " " + user.lastName);
            var groupsCovered = [];
            $.get("/api/users/"+id+"/roles")
            .then(roles=>{
                roles.forEach(role=>{
                    $.get("/api/roles/"+role.id+"/groups")
                    .then(groups=>{
                        groups.forEach(group=>{
                            //handle each group here
                            if(groupsCovered.indexOf(group.id) != -1) {
                                return;
                            }
                            groupsCovered.push(group.id);
                            var $newGroupBody = $("<tbody id='group" + group.id + "Body'>");
                            $("<table>")
                                .addClass("mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp")
                                .append(
                                    $("<thead><tr><th><a data-toggle='collapse' href='#group" + group.id + "Body'>"+group.name+"</th></tr></thead>")
                                )
                                .append($newGroupBody)
                                .appendTo($("#survey-container"));
                            $.get("/api/groups/"+group.id+"/tasks")
                            .then(tasks=>{
                                tasks.forEach(task=>{
                                    //handle each task here
                                    var $newTask = $("<tr>");
                                    $newTask.append($("<td>"+task.name+"</td>"))
                                        .append($("<td>$"+task.commission+"</td>"))
                                        .append($("<td>")
                                            .append("<input type='number' value='0' min='0' step = '1' id='task"+ task.id + "qty'>")
                                            .on("change", event=>{
                                                //update entry for that event
                                            })
                                        )
                                        .append($("<td>")
                                            .append($("<button>+</button>").click(event=>{
                                                $("#task"+task.id+"qty").val(parseInt($("#task"+task.id+"qty").val())+1);
                                                })
                                            )
                                        )
                                        .append($("<td>")
                                            .append($("<button>-</button>").click(event=>{
                                                if($("#task"+task.id+"qty").val()<1) return;
                                                $("#task"+task.id+"qty").val(parseInt($("#task"+task.id+"qty").val())-1);
                                                })
                                            )
                                        );
                                    $newTask.appendTo($newGroupBody);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});