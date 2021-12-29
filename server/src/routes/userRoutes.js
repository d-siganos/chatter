module.exports = app => {
  const { findAllUsers, findOneUser } = require('../controllers/userController');

  let router = require('express').Router();
  
  router.get("/:room", findAllUsers);
  router.get("/:room/:user", findOneUser);

  app.use('/users', router);
}
