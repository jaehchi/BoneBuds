const db = require('../db.js');
const Sequelize = require('sequelize');

const users = db.define('users', {
  userID : {
    type: Sequelize.STRING(255),
    primaryKey: true
  },
  username : Sequelize.STRING(255),
  description: Sequelize.STRING(160),
  email: Sequelize.STRING(255),
  profileUrl : Sequelize.STRING(255)
})

module.exports = users;