var db = require("../models");

module.exports = function(app) {

    app.get("/api/roles", function(req,res){
        db.Role.findAll({}).then(function(roles){
            res.json(roles);
        });
    });

    app.get("/api/roles:id", function(req,res){
        db.Role.findOne({where:{id:req.params.id}}).then(function(role){
            res.json(role);
        });
    });

    app.get("/api/roles:user"), function(req,res){
        db.
    }
}