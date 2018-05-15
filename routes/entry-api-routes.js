var db = require("../models");

module.exports = function(app) {
    app.get("/api/entries", (req,res)=>{
        db.Entry.findAll({})
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

    app.post("/api/entries", (req,res)=>{
        db.Entry.create(req.body)
        .then(entry=>{
            res.json(entry);
        });
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
}