const db = require('../db.js');
const Sequelize = require('sequelize');

const events = db.define('events', {
  eventID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  date: Sequelize.STRING,
  time: Sequelize.STRING,
  owner: Sequelize.STRING,
  location: Sequelize.STRING,
  latitude : Sequelize.STRING,
  longitude: Sequelize.STRING,
  description : Sequelize.STRING,
  tag: Sequelize.STRING,
  image: Sequelize.STRING,
  likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
});

module.exports = events;
