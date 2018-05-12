module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    // Giving the Author model a name of type STRING
    "name": DataTypes.STRING
  });

  Role.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Role.belongsToMany(models.User, {through:'UserRole'});
    Role.belongsToMany(models.Group, {through:'RoleGroup'});
    
  };

  return Role;
};