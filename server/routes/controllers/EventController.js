const { users, events, posts, comments } = require('../../sql/models');

const EventController = {
  createEvent : (req , res) => {
    console.log(req.body)
    events.create({
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
      owner: req.body.owner,
      latitude : req.body.latitude,
      longitude: req.body.longitude,
      description : req.body.description,
      tag: req.body.tag,
      image: req.body.image,
    })
      .then( results => {
        res.status(201).send(results);
      })
      .catch( err => {
        res.status(500).send(err);
      })
  },
  retrieveEventFromTiles : (req, res) => {
    
  }
}

module.exports = EventController;