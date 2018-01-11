const axios = require('axios');
const { users, events, posts, comments } = require("../../sql/models");

const EventController = {
  createEvent: (req, res) => {
    const event = req.body.info;
    const query = event.location;
    const swapped = query.replace(/\s/g, '+')

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + swapped + '&key=AIzaSyBsL7VlcbDZTbz2CvN6moCFIQOR27U1t6s')
      .then((response) => {
        events
          .create({
            title: event.title,
            date: event.date,
            time: event.time,
            owner: event.owner,
            location: event.location,
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng,
            description: event.description,
            tag: event.tag,
            image: event.image,
            userID: event.userID,
          })
          .then(results => {
            res.status(201).send(results);
          })
          .catch(err => {
            res.status(500).send(err);
          });
    })
    .catch((e)=> {
      console.log('Not able to fetch api data for latLong', e)
      res.status(500);
    })
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
      userID: event.owner,
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
