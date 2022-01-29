const Room = require('./models/roomModel');
const { Message } = require('./models/messageModel');
const { User } = require('./models/userModel');

const adminUser = { username: 'Admin', nickname: 'Admin', avatarLink: 'https://avatars.dicebear.com/api/gridy/Admin.svg' };

const sendMessage = async (io, roomName, messageData) => {
  io.emit('message', messageData);

  const message = Message(messageData);
    
  const room = await Room.findOne({ name: roomName });
  room.messages.push(message);
  room.save();

  console.log('Message sent');
}

const createRoom = async roomName => {
  const key = Math.random().toString(16).slice(2);

  const room = Room({
    name: roomName,
    avatarLink: `https://avatars.dicebear.com/api/initials/${roomName}.svg`,
    users: [],
    messages: [],
    key,
  });
  
  await room.save();

  return room;
}

exports.userJoin = async (socket, io, user, roomName) => {
  socket.join(roomName);

  let room = await Room.findOne({ name: roomName });

  if (!room) {
    room = await createRoom(roomName);
  }

  if (!room.users.some(user_ => user_.username === user.username)) {
    let newUser = await User.findOne({ "username": user.username });
    
    // if (!newUser) {
    //   newUser = User(user);
    //   await newUser.save();
    // }
    
    room.users.push(newUser);
    room.save();

    const messageData = {
      room: roomName,
      user: adminUser,
      message: `A wild ${user.nickname} appeared!`,
      date: new Date().getTime(),
    };

    console.log('New user joined');
      
    await sendMessage(io, roomName, messageData);
  }

  return room.key;
}

exports.sendMessage = sendMessage;
