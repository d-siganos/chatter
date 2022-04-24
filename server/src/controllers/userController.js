require('../dbConnection');
const { User } = require('../models/userModel');
const Room = require('../models/roomModel');

exports.createUser = async (req, res) => {
  if (!req.body.id || !req.body.username) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing user ID or username"
    });
  }

  try {
    const exists = await User.findOne({ "userId": req.body.id });

    if (exists) {
      res.send({ user: exists });
      return;
    }

    const nickname = req.body.nickname || req.body.username.replace(/@[^@]+$/);
    const avatarLink = req.body.avatarLink || `https://avatars.dicebear.com/api/gridy/${req.body.username}.svg`;

    const user = new User({ "userId": req.body.id, "username": req.body.username, "nickname": nickname, "avatarLink": avatarLink });
    user.save();

    res.status(201).send({ user });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't create user with username '${req.body.username}'`
    });
  }
}

exports.findAllRooms = async (req, res) => {
  if (!req.params.userId) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing user ID"
    });
  }

  try {
    const data = await Room.find({ users: req.params.userId }, { users: 0, messages: 0 });
    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve rooms of user with ID '${req.params.userId}'`
    });
  }
}
