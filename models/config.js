const { Sequelize, DataTypes } = require('sequelize');
require("dotenv").config();
// Initialize Sequelize with your MySQL connection details
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

module.exports=sequelize;