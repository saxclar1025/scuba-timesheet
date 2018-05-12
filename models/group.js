module.exports = function(sequelize, DataTypes) {
  var Group= sequelize.define("Group", {

  	id: {type: DataTypes.INT, primaryKey: true},
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Group.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Group.belongsToMany(models.Role, {through:'RoleGroup'});
    Group.belongsToMany(models.Task, {through:'GroupTask'});
    
  };

  return Group;
};