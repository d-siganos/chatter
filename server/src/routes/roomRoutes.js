module.exports = app => {
  const { findAllMessages, findAllUsers } = require('../controllers/roomController');

  let router = require('express').Router();
  
  router.get("/:name/messages", findAllMessages);
  router.get("/:name/users", findAllUsers);

  app.use('/room', router);
}
