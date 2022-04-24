const Room = require('./models/roomModel');
const { Message } = require('./models/messageModel');
const { User } = require('./models/userModel');

const adminUser = { username: 'Admin', nickname: 'Admin', avatarLink: 'https://avatars.dicebear.com/api/gridy/Admin.svg' };

const sendMessage = async (io, roomID, messageData) => {
  io.emit('message', messageData);

  const message = Message(messageData);
  message.save();
  
  const room = await Room.findById(roomID);
  room.messages.push(message.id);
  room.save();

  console.log('Message sent');
}

exports.createRoom = async roomName => {
  const key = Math.random().toString(16).slice(2);

  const room = Room({
    name: roomName,
    avatarLink: `https://avatars.dicebear.com/api/initials/${roomName}.svg`,
    users: [],
    messages: [],
    key,
  });
  
  await room.save();

  console.log('Room created');

  return room;
}

exports.userJoin = async (socket, io, user, roomID) => {
  socket.join(roomID);

  let room = await Room.findById(roomID).populate("users");

  if (!room) return;

  if (room.users.indexOf(user.userId) === -1) {
    let newUser = await User.findOne({ "username": user.username });   

    room.users.push(newUser.userId);
    room.save();

    const messageData = {
      room: roomID,
      user: adminUser,
      message: `A wild ${user.nickname} appeared!`,
      date: new Date().getTime(),
    };

    console.log('New user joined');
      
    await sendMessage(io, roomID, messageData);
  }

  return room.key;
}

exports.sendMessage = sendMessage;
