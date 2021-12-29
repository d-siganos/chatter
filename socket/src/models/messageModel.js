const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  user: String,
  message: String,
  date: Number
});

let Message = mongoose.model('Message', messageSchema);

// TESTING PURPOSES
// Message.deleteMany({}).then(function(){
//   console.log("Data deleted");
// });

module.exports = Message;
