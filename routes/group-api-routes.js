var db = require("../models");

module.exports = function(app) {

    app.get("/api/group", function(req,res){
        db.Group.findAll({}).then(function(roles){
            res.json(Group);
        });
    });

    app.get("/api/group/:id", function(req,res){
        db.Group.findOne({where:{id:req.params.id}})
        .then(function(Group){ //started here 
            res.json(Group);
        });
    });

    app.post("/api/group", (req,res)=>{
        db.Group.create(req.body)
        .then(Group=>{
            res.json(Group);
        });
    });

    app.put("/api/group", (req,res)=>{
        db.Group.update(req.body, {where:{id:req.body.id}})
        .then(function(Group){
            res.json(Group);
        });
    });

    app.delete("/api/group/:id",(req,res)=>{
        db.Group.destroy({where:{id:req.params.id}})
        .then(Group=>{
            res.json(Group);
        });
    });

    app.get("/api/group/:userId", function(req,res){
        db.User.findOne({where:{id:req.params.userId}})
        .then(function(Group){
            res.json(Group.getRoles());
        });
    });
}