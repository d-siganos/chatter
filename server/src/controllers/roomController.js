require('../dbConnection');
const Room = require('../models/roomModel');

exports.findAllMessages = async (req, res) => {
  if (!req.params.name) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing room name"
    });
  }

  try {
    const data = await Room.find({ name: req.params.name }, { messages: 1, _id: 0 }).sort({ _id: 1 }).limit(50);
    res.send(data[0].messages);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve messages in room '${req.params.name}'`
    });
  }
}

exports.findAllUsers = async (req, res) => {
  if (!req.params.name) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing room name"
    });
  }

  try {
    const data = await Room.find({ name: req.params.name }, { users: 1, _id: 0 }).sort({ _id: 1 });
    res.send(data[0].users);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve users in room '${req.params.name}'`
    });
  }
}
