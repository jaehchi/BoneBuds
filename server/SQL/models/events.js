const db = require('../db.js');
const Sequelize = require('sequelize');

const events = db.define('events', {
  eventID : {
    type: Sequelize.STRING(255),
    autoIncrement: true,
    primaryKey: true
  },
  eventOwner: Sequelize.STRING(255),
  latitude : Sequelize.STRING(255),
  longitude: Seequelize.STRING(255),
  description : Sequelize.STRING(255),
  eventImage: Sequelize.STRING(255)
});

modules.exports = events;
