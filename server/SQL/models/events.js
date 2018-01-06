const db = require('../db.js');
const Sequelize = require('sequelize');

const events = db.define('events', {
  eventID : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventName: Sequelize.STRING(255),
  eventOwner: Sequelize.STRING(255),
  latitude : Sequelize.STRING(255),
  longitude: Sequelize.STRING(255),
  description : Sequelize.STRING(255),
  eventImage: Sequelize.STRING(255)
});

module.exports = events;
