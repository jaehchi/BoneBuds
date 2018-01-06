const db = require('../index');
const Users = require('./Users');

Users.sync()
  .then(() => {
    Users.create({
      uuid: 'afda392428afa',
      userName: 'davidd232',
      email: 'david@test.com'
    })
  })
  .catch(() => {
    console.log('error syncing users');
  })


module.exports = { Users };