const db = require('../db.js');
const Sequelize = require('sequelize');

const users = db.define('users', {
  userID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username : Sequelize.STRING(255),
  description: Sequelize.STRING(160),
  profileUrl : Sequelize.STRING(255),
})

module.exports = users;