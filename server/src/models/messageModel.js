const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
  room: String,
  user: String,
  message: String,
  date: Number
});

let Message = mongoose.model('Message', messageSchema);

exports.messageSchema = messageSchema;
exports.Message = Message;
