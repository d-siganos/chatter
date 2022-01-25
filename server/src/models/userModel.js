const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
});

let User = mongoose.model('User', userSchema);

// TESTING PURPOSES
// User.deleteMany({}).then(function(){
//   console.log("Data deleted");
// });

exports.userSchema = userSchema;
exports.User = User;
