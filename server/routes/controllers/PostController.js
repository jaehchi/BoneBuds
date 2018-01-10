const { users, events, posts, comments } = require('../../sql/models');

const PostController = {
  createPost: (req, res) => {

    let io = req.app.get('socketio');

    posts.create({
      username: req.body.username,
      text: req.body.text,
      eventID: req.body.eventID
    })
      .then( results => {
        posts.findAll({
          where: {
            eventID: req.body.eventID
          }
        })
          .then( postsResults => {
            // res.status(201).send(postsResults);
            io.emit('posts', postsResults);
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
  }
  
}

module.exports = PostController;