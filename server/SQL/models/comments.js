const db = require('../db.js');
const Sequelize = require('sequelize');

const comments = db.define('comments', {
  commentID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  userID: Sequelize.STRING
})

module.exports = comments;