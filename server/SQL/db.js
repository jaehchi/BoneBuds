const Sequelize = require('sequelize');
const path = require('path');
const db = new Sequelize('db', 'null', 'null', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'BoneBuds.sqlite'),
  logging: false,
})

db.authenticate()
  .then(() => {
    console.log('db connected');
  })
  .catch((error) => {
    console.error('oops db not connected', error);
  })

module.exports = db;