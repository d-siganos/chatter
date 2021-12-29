module.exports = app => {
  const { findAllMessages } = require('../controllers/messageController');

  let router = require('express').Router();
  
  router.get("/:room", findAllMessages);

  app.use('/messages', router);
}
