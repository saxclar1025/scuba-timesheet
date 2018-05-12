module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    // Giving the Author model a name of type STRING
    "date": DataTypes.DATEONLY,

    "quantity": DataTypes.INTEGER
  });


  return Entry;
};