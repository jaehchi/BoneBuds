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
              .then(allEvents => {
                io.emit('fetchAllEvents', allEvents);
                res.status(201).send(allEvents);
              })
          })
          .catch(err => {
            res.send('Could not create event', err).status(500);
          });
      })
      .catch(() => {
        console.log('Not able to fetch api data for latLong')
        res.send('Invalid API Request');
      })
  },
  fetchAllEvents: (req, res) => {
    let io = req.app.get('socketio');
    events.findAll()
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
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  },
  fetchEventsByUser: (req, res) => {
    let io = req.app.get('socketio');
    const owner = req.body.userID
    // onwer is the user's uid
    events.findAll({
      where: {
        userID: owner,
      }
    })
      .then(events => {
        io.emit(`eventsByUser ${owner}`, events);
        res.status(201).send(events);
      })
      .catch(err => {
        console.log(err);
      })

  },
  updateEventInfo: (req, res) => {
    let io = req.app.get('socketio');
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
<<<<<<< HEAD
        }, { where: { eventID: req.body.id }, returning: true, plain: true })
          .then(() => {
            events.findAll()
              .then((results) => {
                io.emit('fetchAllEvents', results)
              })
              .catch(() => {
                console.log('could not fetch all events')
              })
            console.log('all event data')
          })
          .then(() => {
            console.log('Event has been updated');
            res.send('Event was updated')
          })
          .catch((e) => {
            console.log('users event was not updated', e)
          })
=======
        }, { where: { eventID: req.body.id}, returning: true, plain: true })
        .then(() => {
          console.log('Event has been updated');
          res.send('Event was updated')
        })
        .then(() => {
          events.findAll()
            .then((results) => {
              io.emit('fetchAllEvents', results)
            })
            .catch(() => {
              console.log('could not fetch all events')
            })
          console.log('all event data')
        })
        .catch((e) => {
          console.log('users event was not updated', e)
        })
>>>>>>> [ css ] colors, padding, clear console
      })
      .catch((e) => {
        console.log('users event was not updated', e)
        res.send(e);
      })
  },
  deleteEvent: (req, res) => {
    console.log('about to delete event with id:', req.params.id);
    let io = req.app.get('socketio');
    events.destroy({
      where: { eventID: req.params.id }
    })
      .then((result) => {
        console.log('Number of events deleted:', result);
        events.findAll()
          .then((response) => {
            io.emit('getAllMapEvents', response);
            io.emit('fetchAllEvents', response);
          })
          .catch((e) => {
            console.log('could not get all event data');
          })
        res.send('event deleted');
      })
      .catch((e) => {
        console.log('event was not destroyed', e);
      })
  },
  addLikeToEvent: (req, res) => {
    let io = req.app.get('socketio');
    events.update({
      likes: req.body.likes
    }, {
        where: {
          eventID: req.body.ID
        }
      })
      .then(() => {
        events.findAll()
          .then((result) => {
            io.emit('fetchAllEvents', result);
            res.send(result)
          })
      })
      .catch(() => {
        res.send(500);
      })

  }
};

module.exports = EventController;
