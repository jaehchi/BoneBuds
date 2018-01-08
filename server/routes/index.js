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

// Fetches all Posts By Event
router.route('/fetchAllPostsByEvent')
  .post(PostController.fetchAllPostsByEvent);

// Create Comment for Post
router.route('/createComment')
  .post(CommentController.createComment);

// Fetches All Comments by Post
router.route('/fetchAllCommentsByPost')
  .post(CommentController.fetchAllCommentsByPost);




module.exports = router;