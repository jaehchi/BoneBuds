const { users } = require('../../SQL/models');

const UserController = {
  checkIfUserExists: (req, res) => {
    users.create({
      userID: `${req.body.userId}`,
      username: `${req.body.username}`,
      firstname: null,
      lastname: null,
      address: null,
      email: `${req.body.email}`,
      dogname: null,
      dogbio: null,
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