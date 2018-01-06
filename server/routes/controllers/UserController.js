const { users } = require('../../SQL/models');

const UserController = {
  checkIfUserExists: (req, res) => {
    users.create({
      userID: `${req.body.userId}`,
      username: `${req.body.username}`,
      description: null,
      email: `${req.body.email}`,
      profileUrl: null
    })
      .then(() => {
        console.log('sqlite user created');
        res.sendStatus(201);
      })
      .catch(() => {
        console.error('error creating sqlite user');
        res.sendStatus(500);
      })
  }
}

module.exports = UserController;