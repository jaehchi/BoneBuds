const users = require('./users.js');
const events = require('./events.js');
const posts = require('./posts.js');
const comments = require('./comments.js');

// users.belongsToMany(events, {
//   as: 'users',
//   through: 'users_events',
//   foreignKey: 'eventsID'
// })

// events.belongsToMany(users, {
//   as: 'events',
//   through: 'users_events',
//   foreignKey: 'userID'
// })
users.hasMany(events, {
  foreignKey: 'userID'
})

events.hasMany(users, {
  foreignKey: 'eventID'
})

comments.belongsTo(posts, {
  foreignKey: 'postID'
});
posts.hasMany(comments, {
  foreignKey: 'postID'
});
posts.belongsTo(events, {
  foreignKey: 'eventID'
});
events.hasMany(posts, {
  foreignKey: 'eventID'
});

users.sync()
  .then( () => {
    console.log('Users tables has been synced succesfully');

    events.sync()
      .then( () => {
        console.log('Events tables has been synced succesfully');
        posts.sync()
          .then( () => {
            console.log('Posts tables has been synced succesfully');
            comments.sync()
              .then( () => {
                console.log('Comments tables has been synced succesfully');
              })
              .catch ( err => {
              console.log('Unable to sync Comments table', err);
              })
          })
          .catch ( err => {
          console.log('Unable to sync Post table', err);
          })
      })
      .catch ( err => {
      console.log('Unable to sync Events table', err);
      })

  })
  .catch ( error => {
    console.log('Unable to sync Users table', error);
  })

module.exports = { users, events, posts, comments }