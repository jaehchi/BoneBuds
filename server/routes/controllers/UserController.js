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
      .catch((e) => {
        console.error('error creating sqlite user', e);
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
      profileUrl: user.profileUrl,
    }, { where: { email: req.body.email }, returning: true, plain: true })
      .then(() => {
        console.log('Entry is updated!');
        res.send(`${req.body.info.firstname}'s account was updated`);
      })
      .catch((e) => {
        console.log('DB could not find:', req.body.email);
        console.log(e);
        res.status(500);
      })
  },
  getUserData: (req, res) => {
    users.find({
      where : {
        userID: req.body.userID
      }
    })
      .then( results => {
        res.status(201).send(results);
      })
      .catch( err => {
        console.log(err);
      })
  }
}

module.exports = UserController;