'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      defaultValue: "pending",
      values: ['pending', 'active'],
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: "user",
      values: ['user', 'admin'],
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};