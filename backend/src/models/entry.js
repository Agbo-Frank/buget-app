'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entry.belongsTo(models.User, { foreignKey: "userId"})
    }
  }
  Entry.init({
    amount: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    category: {
      type: DataTypes.ENUM,
      defaultValue: "user",
      values: ['expense', 'income'],
    }
  }, {
    sequelize,
    modelName: 'Entry',
  });
  return Entry;
};