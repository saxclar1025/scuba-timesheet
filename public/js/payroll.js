function getWorkWeek(date,weekDiff) {
    if(!weekDiff) weekDiff=0;
    var startMoment = moment(date).subtract(((date.day()+6) % 7) - (7*weekDiff), "days"); //gets the latest monday + the week differential
    var endMoment = moment(startMoment).add(6,"days");
    return {start:startMoment,end:endMoment};
}

$(document).ready(function(){
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $("#username").text(user.firstName + " " + user.lastName);
        });
    });

    var startWeek = getWorkWeek(moment());
    $("#start-date").val(startWeek.start.format("YYYY-MM-DD"));
    $("#end-date").val(startWeek.end.format("YYYY-MM-DD"));
    
    $("#prev-week-button").click(event=>{
        var newWeek = getWorkWeek(moment($("#start-date").val(), "YYYY-MM-DD"),(-1));
        $("#start-date").val(newWeek.start.format("YYYY-MM-DD"));
        $("#end-date").val(newWeek.end.format("YYYY-MM-DD"));
        $("#start-date").trigger("change");
    });

    $("#next-week-button").click(event=>{
        var newWeek = getWorkWeek(moment($("#start-date").val(), "YYYY-MM-DD"),1);
        $("#start-date").val(newWeek.start.format("YYYY-MM-DD"));
        $("#end-date").val(newWeek.end.format("YYYY-MM-DD"));
        $("#start-date").trigger("change");
    });

    $("#user-select, #start-date, #end-date").on("change", event=>{
        $("tbody").empty();
        $("#total").text(0);
        $.get("/api/entries/user/"+$("#user-select").val()+"/daterange/" + $("#start-date").val() + "/" + $("#end-date").val())
        .then(entries=>{
            entries.forEach(entry=>{
                $.get("/api/tasks/" + entry.TaskId)
                .then(task=>{
                    var $entryRow = $("<tr>");
                    $entryRow.append($("<td>").text(entry.date))
                        .append($("<td>").text(task.name))
                        .append($("<td>").text(task.commission))
                        .append($("<td>").text(entry.quantity))
                        .append($("<td>").text(parseInt(entry.quantity)*parseFloat(task.commission)));
                    $entryRow.appendTo("tbody");
                    var total = parseFloat($("#total").text())+parseInt(entry.quantity)*parseFloat(task.commission);
                    $("#total").text(total.toFixed(2));
                });
            });
        });
    });

    $.get("/api/users")
    .then(users=>{
        users.forEach(user=>{
            $("#user-select").append("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>");
        });
        $("#user-select").trigger("change");
    });
});