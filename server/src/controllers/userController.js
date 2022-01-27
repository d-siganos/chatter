require('../dbConnection');
const Room = require('../models/roomModel');

exports.findAllRooms = async (req, res) => {
  if (!req.params.name) {
    res.status(400).send({
      error: "400 Bad Request",
      message: "Missing username"
    });
  }

  try {
    const data = await Room.find({ "users.username": req.params.name }, { _id: 0, name: 1 });
    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "500 Internal Server Error",
      message: `Couldn't retrieve rooms '${req.params.name}'`
    });
  }
}
