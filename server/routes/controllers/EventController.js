const { users, events, posts, comments } = require("../../sql/models");

const EventController = {
  createEvent: (req, res) => {
    events
      .create({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        owner: req.body.owner,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        tag: req.body.tag,
        image: req.body.image,
        userID: req.body.owner.uid
      })
      .then(results => {
        res.status(201).send(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  editEvent: (req, res) => {
    console.log('edit event. req.body.info:', req.body.info);
    const event = req.body.info
    events.update({
      title: event.title,
      date: event.date,
      time: event.time,
      owner: event.owner,
      latitude: event.latitude,
      longitude: event.longitude,
      description: event.description,
      tag: event.tag,
      image: event.image,
      userID: event.owner.uid
    })
  },
  fetchAllEvents: (req, res) => {
    events
      .findAll()
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  fetchByEventID: (req, res) => {
    events.find({
      where: {
        eventID: req.body.eventID
      }
    })
      .then( result => {
        res.status(201).send(result);
      })
      .catch( err => {
        res.status(500).send(err);
      })
  }
};

module.exports = EventController;
