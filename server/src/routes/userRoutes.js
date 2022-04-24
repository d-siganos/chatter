module.exports = app => {
  const { createUser, findAllRooms } = require('../controllers/userController');

  let router = require('express').Router();
  
  router.post("/", createUser);
  router.get("/:userId/rooms", findAllRooms);

  app.use('/users', router);
}
