const db = require('../db.js');
const Sequelize = require('sequelize');

const users = db.define('users', {
  userID: {
    unique: true,
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  address: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  dogname: Sequelize.STRING,
  dogbio: Sequelize.STRING,
  profileUrl: Sequelize.STRING,
})

module.exports = users;