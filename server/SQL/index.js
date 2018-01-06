const Sequelize = require('sequelize');
const db = new Sequelize('users_db', 'root', 'david');


db.authenticate()
  .then(() => {
    console.log('db connected');
  })
  .catch(() => {
    console.log('error syncing db');
  })


module.exports = db;