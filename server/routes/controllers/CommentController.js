const { users, events, posts, comments } = require('../../sql/models');

const CommentController = {
  createComment: (req, res) => {

    comments.create({
      username: req.body.username,
      text: req.body.text,
      postID: req.body.postID
    })
      .then( results => {
          comments.findAll({
            where: {
              postID: req.body.postID
            }
          })
            .then( commentResults => {
              res.status(201).send(commentResults);
            })
            .catch( err => {
              res.status(500).send(err);
            })
      })
      .catch( err => {
        res.status(500).send(err);
      })

  },
  fetchAllCommentsByPost: (req, res) => {
    comments.findAll({
      where: {
        postID: req.body.postID
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

module.exports = CommentController;