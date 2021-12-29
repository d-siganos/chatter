const connect = require('../dbConnection');
const Message = require('../models/messageModel');

exports.findAllMessages = (req, res) => {
  if (!req.params.room) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing 'room' parameter"
    });
  }

  connect.then(db => {
    Message.find({ room: req.params.room }).then(data => {
      res.send(data);
    }).catch(error => {
      res.status(500).send({
        error: "500 Internal Server Error",
        message: `Couldn't retrieve messages in room ${req.params.room}`
      });
    });
  });
}
