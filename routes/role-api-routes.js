var db = require("../models");

module.exports = function(app) {

    app.get("/api/roles", function(req,res){
        db.Role.findAll({}).then(function(roles){
            res.json(roles);
        });
    });

    app.get("/api/roles/:id", function(req,res){
        db.Role.findOne({where:{id:req.params.id}})
        .then(function(role){
            res.json(role);
        });
    });

    app.post("/api/roles", (req,res)=>{
        db.Role.create(req.body)
        .then(role=>{
            res.json(role);
        });
    });

    app.put("/api/roles", (req,res)=>{
        db.Role.update(req.body, {where:{id:req.body.id}})
        .then(function(role){
            res.json(role);
        });
    });

    app.delete("/api/roles/:id",(req,res)=>{
        db.Role.destroy({where:{id:req.params.id}})
        .then(role=>{
            res.json(role);
        });
    });

    app.get("/api/roles/:userId", function(req,res){
        db.User.findOne({where:{id:req.params.userId}})
        .then(function(user){
            res.json(user.getRoles());
        });
    });
}