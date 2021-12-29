const connect = require('../dbConnection');
const User = require('../models/userModel');

exports.findAllUsers = (req, res) => {
  if (!req.params.room) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing 'room' parameter"
    });
  }

  connect.then(db => {
    User.find({ room: req.params.room }).then(data => {
      res.send(data);
    }).catch(error => {
      res.status(500).send({
        error: "500 Internal Server Error",
        message: `Couldn't retrieve users in room ${req.params.room}`
      });
    });
  });
}

exports.findOneUser = (req, res) => {
  if (!req.params.room || !req.params.username) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing 'room' or 'username' parameter"
    });
  }

  connect.then(db => {
    User.findOne({ username: req.params.username, room: req.params.room }).then(data => {
      res.send(data);
    }).catch(error => {
      res.status(500).send({
        error: "500 Internal Server Error",
        message: `Couldn't retrieve user ${req.params.username} in room ${req.params.room}`
      });
    });
  });
}
