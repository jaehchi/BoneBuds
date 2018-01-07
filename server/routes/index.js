const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const MapLocationController = require('./controllers/MapLocationController');

router.route('/createUser')
  .post(UserController.checkIfUserExists);
router.route('/popups')
  .get(MapLocationController.GetEventLocation);
router.route('/latLong')
  .post(MapLocationController.GetLocationLatLong)

module.exports = router;