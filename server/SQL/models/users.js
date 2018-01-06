const db = require('../db.js');
const Sequelize = require('sequelize');

const users = db.define('users', {
  userID : {
    type: Sequelize.STRING,
    primaryKey: true
  },
  username : Sequelize.STRING,
  description: Sequelize.STRING,
  email: Sequelize.STRING,
  profileUrl : Sequelize.STRING,
})

module.exports = users;