const db = require('../index');
const Sequelize = require('sequelize');

const Users = db.define('users', {
  uuid: { type: Sequelize.STRING, unique: true, primaryKey: true },
  userName: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
})


module.exports = Users;