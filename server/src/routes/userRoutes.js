module.exports = app => {
  const { findAllRooms } = require('../controllers/userController');

  let router = require('express').Router();
  
  router.get("/:name/rooms", findAllRooms);

  app.use('/users', router);
}
