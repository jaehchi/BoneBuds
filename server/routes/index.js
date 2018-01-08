const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const MapLocationController = require('./controllers/MapLocationController');

router.route('/createUser')
  .post(UserController.checkIfUserExists);
router.route('/popups')
  .get(MapLocationController.getAllEvents);
router.route('/latLong')
  .post(MapLocationController.getLocationLatLong)
router.route('/update/')
  .post(UserController.updateUserProfile)
router.route('/update/:uid')
  .get(UserController.getUsersSavedInfo)

module.exports = router;