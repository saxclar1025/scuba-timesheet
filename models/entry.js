module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {

  	id: {type: DataTypes.INT, primaryKey: true},
    // Giving the Author model a name of type STRING
    Date: DataTypes.DATEONLY,

    Quantity: DataTypes.INT
  });


  return Entry;
};