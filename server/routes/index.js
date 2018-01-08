const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const MapLocationController = require('./controllers/MapLocationController');
const EventController = require('./controllers/EventController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');


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


// Creates Event
router.route('/createEvent')
  .post(EventController.createEvent);

// Fetches all Events
router.route('/fetchAllEvents')
  .get(EventController.fetchAllEvents);

// Create Post for Events
router.route('/createPost')
  .post(PostController.createPost);

// Fetches all Post By Event
router.route('/fetchAllPostsByEvent')
  .get();

// Create Comment for Post
router.route('/createComment')
  .post();

router.route('/fetchAllCommentsByPost')
  .get()




module.exports = router;