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

exports.messageSchema = messageSchema;
exports.Message = Message;
