const { users } = require('../../SQL/models');

const UserController = {
  checkIfUserExists: (req, res) => {
    users.create({
      userID: `${req.body.userId}`,
      username: `${req.body.username}`,
      firstname: '',
      lastname: '',
      address: '',
      email: `${req.body.email}`,
      dogname: '',
      dogbio: '',
      profileUrl: ''
    })
      .then((results) => {
        console.log('sqlite user created');
        res.status(201).send(results);
      })
      .catch(() => {
        console.error('error creating sqlite user');
        res.sendStatus(500);
      })
  },
  getUsersSavedInfo: (req, res) => {
    users.find({ where: { userID: req.params.uid } })
      .then((result) => {
        console.log('User info is sent to client')
        res.send(result)
      })
      .catch((e) => {
        console.log('Failed to send data to client', e)
        res.send(500);
      })
  },
  updateUserProfile: (req, res) => {
    const user = req.body.info;
    users.update({
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      dogname: user.dogname,
      dogbio: user.dogbio,
    }, { where: { email: req.body.email }, returning: true, plain: true })
      .then(() => {
        console.log('Entry is updated!');
        res.send(`${req.body.info.firstname}'s account was updated`);
      })
      .catch((err) => {
        console.log('DB could not find:', req.body.email);
        console.log(err);
        res.status(500);
      })
  },
}

module.exports = UserController;