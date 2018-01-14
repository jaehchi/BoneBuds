const { users, events, posts, comments } = require('../../SQL/models');

const PostController = {
  createPost: (req, res) => {
    
    //allows us to use socket.io outside of server/index.js
    let io = req.app.get('socketio');

    posts.create({
      username: req.body.username,
      text: req.body.text,
      userID: req.body.userID,
      eventID: req.body.eventID
    })
      .then( results => {
        posts.findAll({
          where: {
            eventID: req.body.eventID
          }
        })
          .then( postsResults => {
            // sends all posts by eventID thru post listener event
            io.emit('posts', postsResults);
            res.status(201).send(postsResults);
          })
          .catch( err => {
            res.status(500).send(err);
          })
      })
      .catch( err => {
        res.status(500).send(err);
      })


  },
  fetchAllPostsByEvent: (req, res) => {
    posts.findAll({
      where: {
        eventID: req.body.eventID
      }
    })
      .then( results => {
        res.status(201).send(results);
      })
      .catch( err => {
        res.status(500).send(err);
      })
  },
  fetchUserFromPost: (req, res) => {
    users.find({
      where: {
        userID: req.body.userID
      }
    })
      .then( results => {
        res.status(201).send(results);
      })
      .catch( err => {
        res.send(500).send(err);
      })
  },
  addLikeToPost: (req, res) => {
    console.log('comment liker', req.body.likes);
    posts.update({
      likes: req.body.likes
    }, {
      where: {
        postID: req.body.ID
      }
      })
      .then((result) => {
        res.send(result)
      })
      .catch(() => {
        res.send(500);
      })

  }  
}

module.exports = PostController;