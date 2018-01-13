const axios = require('axios');
const { users, events, posts, comments } = require("../../SQL/models");

const EventController = {
  createEvent: (req, res) => {
    const event = req.body.info;
    let io = req.app.get('socketio');
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
            ownerUrl: event.ownerUrl
          })
          .then(results => {
            events.findAll()
              .then( allEvents => {
                io.emit('fetchAllEvents', allEvents);
                res.status(201).send(allEvents);
              })
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
    let io = req.app.get('socketio');

    events
      .findAll()
      .then(results => {
        io.emit('fetchAllEvents', results);
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
  },
  fetchEventsByUser: (req, res) => {
    let io = req.app.get('socketio');
    const owner = req.body.userID
    // onwer is the user's uid
    events.findAll({
      where : {
        userID: owner,
      }
    })
      .then( events => {
        io.emit(`eventsByUser ${owner}`, events);
        res.status(201).send(events);
      })
      .catch( err => {
        console.log(err);
      })

  },
  updateEventInfo: (req, res) => {
    const location = req.body.event.location;
    const swapped = location.replace(/\s/g, '+');
    const event = req.body.event;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + swapped + '&key=AIzaSyBsL7VlcbDZTbz2CvN6moCFIQOR27U1t6s')
      .then((response) => {
        events.update({
          title: event.title,
          description: event.description,
          location: event.location,
          latitude: response.data.results[0].geometry.location.lat,
          longitude: response.data.results[0].geometry.location.lng,
          image: event.image,
          tag: event.tag,
        }, { where: { eventID: req.body.id}, returning: true, plain: true })
        .then((res) => {
          console.log('updated', res)
        })
        .catch((e) => {
          console.log('users event was not updated', e)
        })
      })
      .catch((e) => {
        console.log('users event was not updated')
      })
  },
};

module.exports = EventController;
