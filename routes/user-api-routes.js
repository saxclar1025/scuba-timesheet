// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Strategy = require('passport-local').Strategy;

passport.use( new Strategy(
  function(username, password, cb) {
    db.User.findOne({where:{"userName":username}}).then( user=> {
      if (!user) { return cb(null, false); }
      if (!user.validPassword(password)) { return cb(null, false); }
      return cb(null, user);
    });
  })
);

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json("/members");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error

    app.post("/api/createuser", function(req, res) {
      console.log(req.body);
      db.User.create(req.body)
      .then(function() {
        res.redirect(307, "/api/login");
      }).catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
    });

    // Route for logging user out
    app.get("/api/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/currentuserid", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json(req.user.id);
        }
    });

    app.get("/api/users/:id", function(req,res){
        db.User.findOne({where:{"id":req.params.id}})
        .then(function(user_data){
            res.json(user_data);
        });
    });

    app.get("/api/users", function(req,res){
        db.User.findAll({})
        .then(function(users){
            res.json(users);
        });
    });

    app.post("/api/users", function(req,res){
        db.User.create(req.body)
        .then(function(user){
            res.json(user);
        });
    });

    app.put("/api/users", function(req,res){
        db.User.update(req.body, {where:{id:req.body.id}})
        .then(function(user){
            res.json(user);
        });
    });

    app.get("/api/users/:id/roles", (req,res)=>{
        db.User.findById(req.params.id)
        .then(user=>{
            user.getRoles()
            .then(roles=>{
                res.json(roles);
            });
        });
    });

    app.get("/api/users/:id/groups", (req,res)=>{
        db.User.findById(req.params.id)
        .then(user=>{
            user.getRoles()
            .then(roles=>{
                var userGroups = [];
                roles.forEach(role=>{
                    role.getGroups()
                    .then(groups=>{
                        groups.forEach(group=>{
                            if(userGroups.indexOf(group) === -1) {
                                userGroups.push(group);
                            }
                        });
                        res.json(userGroups);
                    });
                });
            });
        });
    });

    //takes an object {userId, [roleIds]}
    app.post("/api/users/assignroles", function(req,res){
        db.User.findById(req.body.userId)
        .then(user=>{
            user.addRoles(req.body.roleIds);
        });
    });

    //takes an object {userId, [roleIds]}
    app.post("/api/users/deleteroles", function(req,res){
        db.User.findById(req.body.userId)
        .then(user=>{
            user.removeRoles(req.body.roleIds);
        });
    });

    app.delete("/api/users/:id", function(req,res){
        db.User.destroy({where:{id:req.params.id}})
        .then(function(user){
            res.json(user);
        });
    });
};
