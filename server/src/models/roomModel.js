const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const roomSchema = new Schema({
  name: { type: String },
  avatarLink: String,
  users: [
    // { type: ObjectID, ref: "User" }
    String
  ],
  messages: [
    { type: ObjectID, ref: "Message" }
  ],
  key: String,
});

let Room = mongoose.model('Room', roomSchema);

// TESTING PURPOSES
// Room.deleteMany({}).then(() => {
//   console.log("Room data deleted");
// });

module.exports = Room;
