const db = require('../db.js');
const Sequelize = require('sequelize');

const events = db.define('events', {
  eventID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventTitle: Sequelize.STRING,
  eventDate: Sequelize.STRING,
  eventTime: Sequelize.STRING,
  eventOwner: Sequelize.STRING,
  city: Sequelize.STRING,
  latitude : Sequelize.STRING,
  longitude: Sequelize.STRING,
  description : Sequelize.STRING,
  tag: Sequelize.STRING,
  eventImage: Sequelize.STRING,
});

module.exports = events;
