require('../dbConnection');
const Room = require('../models/roomModel');

exports.findAllMessages = async (req, res) => {
  if (!req.params.roomID) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing room ID"
    });

    return;
  }

  if (!req.params.roomID.match(/^[0-9a-fA-F]{24}$/)) {
    res.sendStatus(204);
    return;
  }

  try {
    const data = await Room.findById(req.params.roomID, { _id: 0 }).populate("messages").sort({ _id: 1 }).limit(50);

    if (!data) {
      res.sendStatus(204);
      return;
    }

    res.send(data.messages);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve messages in room '${req.params.roomID}'`
    });
  }
}

exports.findAllUsers = async (req, res) => {
  if (!req.params.roomID) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing room ID"
    });

    return;
  }

  if (!req.params.roomID.match(/^[0-9a-fA-F]{24}$/)) {
    res.sendStatus(204);
    return;
  }

  try {
    const data = await Room.findById(req.params.roomID, { _id: 0 }).sort({ _id: 1 });
    res.send(data[0].users);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve users in room '${req.params.roomID}'`
    });
  }
}

exports.findRoom = async (req, res) => {
  if (!req.params.roomID) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing room ID"
    });

    return;
  }

  if (!req.params.roomID.match(/^[0-9a-fA-F]{24}$/)) {
    res.sendStatus(204);
    return;
  }

  try {
    const data = await Room.findById(req.params.roomID, { users: 0, messages: 0 });

    if (!data) {
      res.sendStatus(204);
      return;
    }

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve room with ID '${req.params.roomID}'`
    });
  }
}
