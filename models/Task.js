// models/Task.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // inProgress: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task'
  }
);

module.exports = Task;
