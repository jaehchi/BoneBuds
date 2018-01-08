const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const MapLocationController = require('./controllers/MapLocationController');
const EventController = require('./controllers/EventController');

router.route('/createUser')
  .post(UserController.checkIfUserExists);
router.route('/popups')
  .get(MapLocationController.GetAllEvents);
router.route('/latLong')
  .post(MapLocationController.GetLocationLatLong)
router.route('/update/')
  .post(UserController.updateUserProfile)
router.route('/update/:uid')
  .get(UserController.getUsersSavedInfo)


// Event routers

// Creates Event
router.route('/createEvent')
  .post(EventController.createEvent);

// Fetches all Events
router.route('/fetchAllEvents')
  .get(EventController.fetchAllEvents);




module.exports = router;