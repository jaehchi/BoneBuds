const users = require('./users.js');
const events = require('./events.js');

users.belongsToMany(events, {
  as: 'users',
  through: 'users_events',
  foreignKey: 'userID'
})

events.belongsToMany(users, {
  as: 'events',
  through: 'users_events',
  foreignKey: 'eventID'
})

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

module.exports = { users, events }