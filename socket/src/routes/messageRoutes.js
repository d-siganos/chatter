module.exports = app => {
  const messages = require('../controllers/bookController');

  let router = require('express').Router();
  
  router.get("/:room", messages.findAll);

  app.use('/messages', router);
}
