$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $('#date-select').val(moment().format("YYYY-MM-DD"));
    $("#prev-date-button").click(event=>{
        var prevDate = moment($('#date-select').val(),"YYYY-MM-DD").subtract(1,"days");
        $("#date-select").val(prevDate.format("YYYY-MM-DD"));
        $("#date-select").trigger("change");
    });
    $("#next-date-button").click(event=>{
        var nextDate = moment($('#date-select').val(),"YYYY-MM-DD").add(1,"days");
        $("#date-select").val(nextDate.format("YYYY-MM-DD"));
        $("#date-select").trigger("change");
    });

    var taskIds = [];

    $.get("/api/currentuserid")
    .then(id=>{
        $("#date-select").on("change", event=>{
            $.get("/api/entries/user/"+id+"/date/"+$("#date-select").val())
            .then(entries=>{
                taskIds.forEach(id=>{
                    var qty = 0;
                    var taskEntry = entries.find(entry=>(entry.TaskId===id));
                    if(!!taskEntry){
                        qty = taskEntry.quantity;
                    }
                    $("#task"+id+"qty").val(qty);
                });
            });
        });
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
                            var $newGroupBody = $("<div class='collapse' aria-expanded='false' id='group" + group.id + "Body'>");
                            $("<div class='group-container container-fluid'>")
                                .addClass("mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp")
                                .append(
                                    $("<a data-toggle='collapse' class='collapsed' href='#group" + group.id + "Body'>"+group.name+"</a>")
                                )
                                .append($newGroupBody)
                                .appendTo($("#survey-container"));
                            $.get("/api/groups/"+group.id+"/tasks")
                            .then(tasks=>{
                                tasks.forEach(task=>{
                                    //handle each task here
                                    taskIds.push(task.id);
                                    var $newTask = $("<div class='row'>");
                                    $newTask.append($("<span class='col-xs-4'>"+task.name+"</span>"))
                                        .append($("<span class='col-xs-3'>$"+task.commission+"</span>"))
                                        .append($("<span class='col-xs-5'>")
                                            .append($("<input class='col-xs-8' type='number' value='0' min='0' step = '1' id='task"+ task.id + "qty'>"))
                                            .on("change", event=>{
                                                //update entry for that event
                                                $.post("/api/entries", {
                                                    quantity:parseInt($("#task"+task.id+"qty").val()),
                                                    date:$("#date-select").val(),
                                                    UserId:user.id,
                                                    TaskId:task.id
                                                });
                                            })
                                            .append($("<button class='btn btn-xs col-xs-2'>+</button>").click(event=>{
                                                $("#task"+task.id+"qty").val(parseInt($("#task"+task.id+"qty").val())+1);
                                                $("#task"+task.id+"qty").trigger("change");
                                                })
                                            )
                                            .append($("<button class='btn btn-xs col-xs-2'>-</button>").click(event=>{
                                                if($("#task"+task.id+"qty").val()<1) return;
                                                $("#task"+task.id+"qty").val(parseInt($("#task"+task.id+"qty").val())-1);
                                                $("#task"+task.id+"qty").trigger("change");
                                                })
                                            )
                                        );
                                    $newTask.appendTo($newGroupBody);
                                });
                                $("#date-select").trigger("change");
                            });
                        });
                    });
                });
            });
        });
    });
});