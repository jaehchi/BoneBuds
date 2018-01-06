const db = require('../db.js');
const Sequelize = require('sequelize');

const users = db.define('users', {
  userID : {
    type: Sequelize.STRING(255),
    autoIncrement: true,
    primaryKey: true
  },
  username : Sequelize.STRING(25),
  description: Seequelize.STRING(160),
  profileUrl : Sequelize.STRING(255),
})

module.exports = users;