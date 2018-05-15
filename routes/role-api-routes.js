var db = require("../models");

module.exports = function(app) {

    app.get("/api/roles", function(req,res){
        db.Role.findAll({})
        .then(function(roles){
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

    app.delete("/api/roles/:id", (req,res)=>{
        db.Role.destroy({where:{id:req.params.id}})
        .then(role=>{
            res.json(role);
        });
    });

    //takes an object {roleId, [groupIds]}
    app.post("/api/roles/assigngroups", (req,res)=>{
        db.Role.findById(req.body.roleId)
        .then(role=>{
            role.addGroups(req.body.groupIds);
        });
    });

    //takes an object {roleId, [groupIds]}
    app.post("/api/roles/deletegroups", (req,res)=>{
        db.Role.findById(req.body.roleId)
        .then(role=>{
            role.removeGroups(req.body.groupIds);
        });
    });

    app.get("/api/roles/:id/groups", (req,res)=>{
        db.Role.findById(req.params.id)
        .then(role=>{
            role.getGroups()
            .then(groups=>{
                res.json(groups);
            });
        });
    });
}