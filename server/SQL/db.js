const Sequelize = require('sequelize');
const path = require('path');
const db = new Sequelize('db', 'null', 'null', {
  // host: 'localhost',
  // port: 3000,
  dialect: 'sqlite',
  storage: path.join(__dirname, 'BoneBuds.sqlite')
})

db.authenticate()
  .then(() => {
    console.log('db connected');
  })
  .catch((error) => {
    console.error('oops db not connected', error);
  })

module.exports = db;