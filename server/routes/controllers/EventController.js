const { users, events, posts, comments } = require("../../sql/models");

const EventController = {
  createEvent: (req, res) => {
    const event = req.body.info;
    events
      .create({
        title: event.title,
        date: event.date,
        time: event.time,
        owner: event.owner,
        location: event.location,
        latitude: event.latitude,
        longitude: event.longitude,
        description: event.description,
        tag: event.tag,
        image: event.image,
        userID: event.userID,
      })
      .then(results => {
        console.log(results)
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
      location: event.location,
      latitude: event.latitude,
      longitude: event.longitude,
      description: event.description,
      tag: event.tag,
      image: event.image,
      userID: event.userID,
    }, { where: { owner: event.owner }, returning: true, plain: true })
      .then(() => {
        console.log('Event is updated!');
        res.send(`${event.title} has been updated`);
      })
      .catch((e) => {
        console.log('DB could not find:', event.title);
        console.log(e);
        res.status(500);
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
