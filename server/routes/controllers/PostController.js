const { users, events, posts, comments } = require('../../sql/models');

const PostController = {
  createPost: (req, res) => {
    console.log(req.body)
    events.find({
      where : {
        eventID : req.body.eventID
      }
    })
      .then( result => {
        console.log(result)
        posts.create({
          username: req.body.username,
          text: req.body.text,
          eventID: result.dataValues.eventID
        })
          .then( results => {
            res.status(201).send(results);
          })
          .catch( err => {
            res.status(500).send(err);
          })
      })
      .catch( error => {
        res.status(500).send(error);
      })
  }
  
}

module.exports = PostController;