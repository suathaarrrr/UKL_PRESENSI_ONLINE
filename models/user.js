'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {

    }
  }

  user.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull: false,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user', 
});
  return user;
};