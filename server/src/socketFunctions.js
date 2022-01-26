const Message = require('./models/messageModel');
const Room = require('./models/roomModel');
const User = require('./models/userModel');

const sendMessage = async (io, roomName, messageData) => {
  io.emit('message', messageData);
    
  const room = await Room.findOne({ name: roomName });
  room.messages.push(messageData);
  room.save();

  console.log('Message sent');
}

const createRoom = async roomName => {
  const key = Math.random().toString(16).slice(2);

  const room = Room({
    name: roomName,
    users: [],
    messages: [],
    key,
  });
  
  await room.save();

  return room;
}

exports.userJoin = async (socket, io, username, roomName) => {
  socket.join(roomName);

  let room = await Room.findOne({ name: roomName });

  if (!room) {
    room = await createRoom(roomName);
  }

  if (!room.users.some(user => user.username === username)) {
    room.users.push({ username });
    room.save();

    const messageData = {
      room: roomName,
      user: 'Admin',
      message: `A wild ${username} appeared!`,
      date: new Date().getTime(),
    };

    console.log('New user joined');
      
    await sendMessage(io, roomName, messageData);
  }

  return room.key;
}

exports.sendMessage = sendMessage;
