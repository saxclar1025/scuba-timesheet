var db = require("../models");

module.exports = function(app) {

    app.get("/api/task", function(req,res){
        db.Task.findAll({}).then(function(Task){
            res.json(Task);
        });
    });

    app.get("/api/task/:id", function(req,res){
        db.Task.findOne({where:{id:req.params.id}})
        .then(function(Task){ 
            res.json(Task);
        });
    });

    app.post("/api/task", (req,res)=>{
        db.Task.create(req.body)
        .then(Task=>{
            res.json(Task);
        });
    });

    app.put("/api/task", (req,res)=>{
        db.Task.update(req.body, {where:{id:req.body.id}})
        .then(function(Task){
            res.json(Task);
        });
    });

    app.delete("/api/task/:id",(req,res)=>{
        db.Task.destroy({where:{id:req.params.id}})
        .then(Task=>{
            res.json(task);
        });
    });

    app.get("/api/task/:userId", function(req,res){
        db.User.findOne({where:{id:req.params.userId}})
        .then(function(Task){
            res.json(Task.getRoles());
        });
    });
}