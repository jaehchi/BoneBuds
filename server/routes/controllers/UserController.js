const { users, events, posts, coomments } = require('../../SQL/models');

const UserController = {
  checkIfUserExists: (req, res) => {
    users.create({
      userID: `${req.body.userId}`,
      username: `${req.body.username}`,
      firstname: `${req.body.firstname}`,
      lastname: `${req.body.lastname}`,
      address: `${req.body.address}`,
      email: `${req.body.email}`,
      dogname: `${req.body.dogname}`,
      dogbio: `${req.body.dogbio}`,
      profileUrl: `${req.body.profileUrl}`
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
      username: user.username,
      profileUrl: user.profileUrl,
      username: user.username
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
  },
  allUsers: (req, res) => {
    users.findAll({})
      .then( users => {
        const result = users.map( user => {
          return Object.assign({}, {
            userID : user.userID,
            username : user.username,
            profileUrl: user.profileUrl,
            })
          });

          events.findAll()
            .then( events => {
              let results = events.map( event => {
                return Object.assign({}, {
                  eventID: event.eventID,
                  title: event.title,
                  location: event.location,
                  description: event.description,
                  tag: event.tag,
                  image: event.image
                })
              })
              res.status(200).send(result.concat(results));
            })
            .catch( e => {
              console.log(e);
            })

      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = UserController;