const users = require('./users');
const events = require('./events');

users.sync()
  .then( () => {
    console.log('Users tables has been synced succesfully');

    events.sync()
      .then( () => {
        console.log('Events tables has been synced succesfully');
      })
      .catch ( err => {
      console.log('Unable to sync Events table', err);
      })
  
  })
  .catch ( error => {
    console.log('Unable to sync Users table', error);
  })

modules.exports = { users, events }