module.exports = app => {
  const { findAllMessages, findAllUsers, findRoom } = require('../controllers/roomController');

  let router = require('express').Router();
  
  router.get("/:roomID/messages", findAllMessages);
  router.get("/:roomID/users", findAllUsers);
  router.get("/:roomID/info", findRoom);

  app.use('/room', router);
}
