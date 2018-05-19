$(document).ready(function(){
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $("#member-name").text(user.firstName + " " + user.lastName);
        });
        $.get("/api/users/"+id+"/roles")
        .then(roles=>{
            console.log("Is admin:");
            console.log(roles.find(role=>(role.name === "Admin")));
            console.log("Is payroll:");
            console.log(roles.find(role=>(role.name === "Payroll")));
            if(!roles.find(role=>(role.name === "Admin"))) {
                console.log("user is not an admin");
                $("#admin-link").remove();
            }
            if(!roles.find(role=>(role.name === "Payroll"))) {
                console.log("user is not a payroll");
                $("#payroll-link").remove();
            }
        });
    });

    $("#password-reset-form").submit(event=>{
        event.preventDefault();
        if( $("#new-password").val() != $("#new-password-confirm").val()) {
            alert("Passwords don't match");
            return;
        }
        $.get("/api/currentuserid")
        .then(id=>{
            $.ajax("/api/users/", {
                method: "PUT",
                data: {
                    id:id,
                    password: $("#new-password").val()
                }
            })
            .done(data=>{
                alert("Password changed");
            });
        });
    });
});