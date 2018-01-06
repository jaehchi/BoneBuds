const db = require('../db.js');
const Sequelize = require('sequelize');

const comments = db.define('comments', {
  commentID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: Sequelize.TEXT,
})

module.exports = comments;