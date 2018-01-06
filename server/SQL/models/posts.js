const db = require('../db.js');
const Sequelize = require('sequelize');

const posts = db.define('posts', {
  postID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequezeli.STRING,
  text: Sequelize.TEXT,
})

module.exports = posts;