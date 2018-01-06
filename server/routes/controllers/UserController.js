const { users, events, posts, comments } = require('../../sql/models');

const UserController = {
  checkIfUserExists: (req, res) => {
    console.log('getting to user controller', req.body);
    res.sendStatus(200);
  }
}

module.exports = UserController;