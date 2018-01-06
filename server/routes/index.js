const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');

router.route('/createUser')
  .post(UserController.checkIfUserExists);

module.exports = router;