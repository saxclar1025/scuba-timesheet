$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $(".member-name").text(user.firstName + " " + user.lastName);
            $.get("/api/users/"+id+"/roles")
            .then(roles=>{
                roles.forEach(role=>{
                    console.log(role.name);
                    $.get("/api/roles/"+role.id+"/groups")
                    .then(group=>{
                        //handle each group here
                        console.log(group.name);
                        $.get("/api/groups/"+group.id+"/tasks")
                        .then(tasks=>{
                            tasks.forEach(task=>{
                                //handle each task here
                                console.log(task.name);
                            });
                        });
                    });
                });
            });
        });
    });
});
