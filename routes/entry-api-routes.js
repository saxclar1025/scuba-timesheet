var db = require("../models");

module.exports = function(app) {
    app.get("/api/entries", (req,res)=>{
        db.Entry.findAll({order:[date]})
        .then(entries=>{
            res.json(entries);
        });
    });

    app.get("/api/entries/:id", function(req,res){
        db.Entry.findOne({where:{id:req.params.id}})
        .then(function(entry){ 
            res.json(entry);
        });
    });

    app.get("/api/entries/date/:date", (req,res)=>{
        db.Entry.findAll({where:{date:req.params.date}})
        .then(entries=>{
            res.json(entries);
        });
    });

    app.get("/api/entries/user/:userid/date/:date", (req,res)=>{
        db.Entry.findAll({where:{date:req.params.date,UserId:req.params.userid}})
        .then(entries=>{
            res.json(entries);
        });
    });

    app.get("/api/entries/user/:userid/date/:date/task/:taskid", (req,res)=>{
        db.Entry.findOne({where:{date:req.params.date,UserId:req.params.userid,TaskId:req.params.taskid}})
        .then(entry=>{
            res.json(entry);
        });
    });

    app.get("/api/entries/user/:userid/daterange/:startdate/:enddate", (req,res)=>{
        db.Entry.findAll({where:{date:{between: [req.params.startdate,req.params.enddate]},UserId:req.params.userid},order:["date"]})
        .then(entries=>{
            res.json(entries);
        });
    });

    app.post("/api/entries", (req,res)=>{
        var searchParams = {
            date:req.body.date,
            UserId:req.body.UserId,
            TaskId:req.body.TaskId
        };
        if (req.body.quantity < 1) {
            db.Entry.destroy({where:searchParams}).then(entry=>{
                res.json(entry);
            });
        }
        else {
            db.Entry.findOrCreate({
                where:searchParams,
                defaults: req.body
            })
            .then(data=>{
                if(!data[1]) {
                    data[0].update({quantity:req.body.quantity})
                    .then(entry=>{
                        res.json(entry);
                    });
                }
                else res.json(data[0].dataValues);
            });
        }
    });

    app.put("/api/entries", (req,res)=>{
        db.Entry.update(req.body, {where:{id:req.body.id}})
        .then(function(entry){
            res.json(entry);
        });
    });

    app.delete("/api/entries/:id",(req,res)=>{
        db.Entry.destroy({where:{id:req.params.id}})
        .then(entry=>{
            res.json(entry);
        });
    });

    app.get("/api/entries/:id/total", (req,res)=>{
        db.Entry.findById(req.params.id)
        .then(entry=>{
            db.Task.findById(entry.TaskId).then(task=>{
                res.json(parseInt(entry.quantity)*parseFloat(task.commission));
            });
        });
    });
}