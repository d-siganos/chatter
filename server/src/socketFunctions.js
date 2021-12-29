const connect = require('./dbConnection');
const Message = require('./models/messageModel');
const User = require('./models/userModel');

const sendMessage = (io, messageData) => {
  io.emit('message', messageData);

  connect.then(db  =>  {
    let msg = new Message(messageData);
    msg.save();
  });

  console.log('Message sent');
}

exports.userJoin = (socket, io, username, room) => {
  socket.join(room);

  connect.then(async (db) => {
    const data = await User.findOne({ username, room });

    if (!data) {
      const messageData = {
        room: room,
        user: 'Admin',
        message: `A wild ${username} appeared!`,
        date: new Date().getTime(),
      };

      const user = new User({username, room});
      user.save();

      console.log('New user joined')
    
      sendMessage(io, messageData);
    }
  });
}

exports.sendMessage = sendMessage;
