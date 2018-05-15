var db = require("../models");

module.exports = function(app) {

    app.get("/api/groups", function(req,res){
        db.Group.findAll({})
        .then(function(group){
            res.json(group);
        });
    });

    app.get("/api/groups/:id", function(req,res){
        db.Group.findOne({where:{id:req.params.id}})
        .then(function(group){ //started here 
            res.json(group);
        });
    });

    app.post("/api/groups", (req,res)=>{
        db.Group.create(req.body)
        .then(group=>{
            res.json(group);
        });
    });

    app.put("/api/groups", (req,res)=>{
        db.Group.update(req.body, {where:{id:req.body.id}})
        .then(function(group){
            res.json(group);
        });
    });

    app.delete("/api/groups/:id",(req,res)=>{
        db.Group.destroy({where:{id:req.params.id}})
        .then(group=>{
            res.json(group);
        });
    });

    //takes an object {groupId, [taskIds]}
    app.post("/api/groups/assigntasks", (req,res)=>{
        db.Group.findById(req.body.groupId)
        .then(group=>{
            group.addTasks(req.body.taskIds);
        });
    });

    //takes an object {groupId, [taskIds]}
    app.post("/api/groups/deletetasks", (req,res)=>{
        db.Group.findById(req.body.groupId)
        .then(group=>{
            group.removeTasks(req.body.taskIds);
        });
    });

    app.get("/api/groups/:id/tasks", (req,res)=>{
        db.Group.findById(req.params.id)
        .then(group=>{
            group.getTasks()
            .then(tasks=>{
                res.json(tasks);
            });
        });
    });
}