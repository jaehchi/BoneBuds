const { users, events, posts, comments } = require('../../SQL/models');

const CommentController = {
  createComment: (req, res) => {
    let io = req.app.get('socketio');

    comments.create({
      username: req.body.username,
      text: req.body.text,
      userID: req.body.userID,
      postID: req.body.postID
    })
      .then(results => {
        comments.findAll({
          where: {
            postID: req.body.postID
          }
        })
          .then(commentResults => {
            io.emit(`comments ${req.body.postID}`, commentResults);
            res.status(201).send(commentResults);
          })
          .catch(err => {
            res.status(500).send(err);
          })
      })
      .catch(err => {
        res.status(500).send(err);
      })

  },
  fetchAllCommentsByPost: (req, res) => {
    comments.findAll({
      where: {
        postID: req.body.postID
      }
    })
      .then(results => {
        res.status(201).send(results);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  },
  fetchUserFromComment: (req, res) => {
    users.find({
      where: {
        userID: req.body.userID
      }
    })
      .then(results => {
        res.status(201).send(results);
      })
      .catch(err => {
        res.send(500).send(err);
      })
  },
  addLikeToComment: (req, res) => {
    comments.update({
      likes: req.body.likes
    }, {
      where: {
        commentID: req.body.ID
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
// User.update({
//   clicks: sequelize.literal('clicks +1')
// ,... )
module.exports = CommentController;