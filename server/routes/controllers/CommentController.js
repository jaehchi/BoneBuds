const { users, events, posts, comments } = require('../../sql/models');

const CommentController = {
  createPost: (req, res) => {
    console.log(req.body)
    posts.find({
      where : {
        postID : req.body.postID
      }
    })
      .then( result => {
        console.log(result)
        comments.create({
          username: req.body.username,
          text: req.body.text,
          postID: result.dataValues.postID
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