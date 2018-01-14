const db = require('../db.js');
const Sequelize = require('sequelize');

const posts = db.define('posts', {
  postID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  userID: Sequelize.STRING,
  likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
})

module.exports = posts;