// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/createuser", (req,res)=>{
        res.sendFile(path.join(__dirname, "../public/createUser.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

    app.get("/users", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/userApiTest.html"));
    });

    app.get("/roles", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/roleApiTest.html"));
    });

    app.get("/groups", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/groupApiTest.html"));
    });

    app.get("/tasks", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/taskApiTest.html"));
    });

    app.get("/assignroles", function(req,res){
        res.sendFile(path.join(__dirname, "../public/assignRoleApiTest.html"));
    });

    app.get("/assigngroups", function(req,res){
        res.sendFile(path.join(__dirname, "../public/assignGroupApiTest.html"));
    });

    app.get("/assigntasks", function(req,res){
        res.sendFile(path.join(__dirname, "../public/assignTaskApiTest.html"));
    });

    app.get("/entries", (req,res)=>{
        res.sendFile(path.join(__dirname, "../public/entryAPITest.html"));
    });
};
