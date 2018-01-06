const db = require('../db.js');
const Sequelize = require('sequelize');

const users = db.define('users', {
  userID: {
    unique: true,
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: Sequelize.STRING,
  description: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  profileUrl: Sequelize.STRING,
})

module.exports = users;