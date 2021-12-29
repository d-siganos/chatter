const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
});

let User = mongoose.model('User', userSchema);

// TESTING PURPOSES
// User.deleteMany({}).then(function(){
//   console.log("Data deleted");
// });

module.exports = User;
