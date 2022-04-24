const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { userSchema } = require('./userModel');

const messageSchema = Schema({
  room: String,
  user: userSchema,
  message: String,
  date: Number
});

let Message = mongoose.model('Message', messageSchema);

// TESTING PURPOSES
// Message.deleteMany({}).then(() => {
//   console.log("Message data deleted");
// });

exports.messageSchema = messageSchema;
exports.Message = Message;
