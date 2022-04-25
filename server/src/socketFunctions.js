const Room = require('./models/roomModel');
const { Message } = require('./models/messageModel');
const { User } = require('./models/userModel');

const adminUser = { username: 'Admin', nickname: 'Admin', avatarLink: 'https://avatars.dicebear.com/api/gridy/Admin.svg' };

const sendMessage = async (io, roomID, messageData) => {
  io.in(roomID).emit('message', messageData);

  const message = Message(messageData);
  message.save();
  
  const room = await Room.findById(roomID);
  room.messages.push(message.id);
  room.save();

  console.log(`Message sent in room ${roomID}`);
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
  if (!roomID.match(/^[0-9a-fA-F]{24}$/)) return;

  let room = await Room.findById(roomID).populate("users");

  if (!room) return;

  socket.join(roomID);

  if (room.users.indexOf(user.userId) === -1) {
    let newUser = await User.findOne({ "username": user.username });   

    room.users.push(newUser.userId);
    room.save();

    const greetings = [ `A wild ${user.nickname} appeared!`, `Everyone welcome ${user.nickname}!`, `A ${user.nickname} has spawned in the room!`, `Swoooosh. ${user.nickname} just landed!`, `${user.nickname} just slid into the room!` ];
    const index = ~~(Math.random() * greetings.length);

    const messageData = {
      type: 'default',
      room: roomID,
      user: adminUser,
      message: greetings[index],
      date: new Date().getTime(),
    };

    console.log('New user joined');
      
    await sendMessage(io, roomID, messageData);
  }

  return room.key;
}

exports.sendMessage = sendMessage;
