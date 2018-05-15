var db = require("../models");

module.exports = function(app) {

    app.get("/api/tasks", function(req,res){
        db.Task.findAll({})
        .then(function(task){
            res.json(task);
        });
    });

    app.get("/api/tasks/:id", function(req,res){
        db.Task.findOne({where:{id:req.params.id}})
        .then(function(task){ 
            res.json(task);
        });
    });

    app.post("/api/tasks", (req,res)=>{
        db.Task.create(req.body)
        .then(task=>{
            res.json(task);
        });
    });

    app.put("/api/tasks", (req,res)=>{
        db.Task.update(req.body, {where:{id:req.body.id}})
        .then(function(task){
            res.json(task);
        });
    });

    app.delete("/api/tasks/:id",(req,res)=>{
        db.Task.destroy({where:{id:req.params.id}})
        .then(task=>{
            res.json(task);
        });
    });
}