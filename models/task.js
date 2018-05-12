module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {

  	id: {type: DataTypes.INT, primaryKey: true},
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,

    commission: DataTypes.DECIMAL(6,2)
  });

  Task.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Task.belongsToMany(models.Group, {through:'GroupTask'});
    Task.hasMany(models.Entry, {as:'Entries'});
    
  };

  return Task;
};