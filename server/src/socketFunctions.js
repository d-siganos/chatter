const Room = require('./models/roomModel');
const { Message } = require('./models/messageModel');
const { User } = require('./models/userModel');

const adminUser = { username: 'Admin', nickname: 'Admin', avatarLink: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin' };

const sendMessage = async (io, roomID, messageData) => {
  const message = Message(messageData);
  message.save();

  messageData._id = message.id;
  io.in(roomID).emit('message', messageData);
  
  const room = await Room.findById(roomID);
  room.messages.push(message.id);
  room.save();

  console.log(`Message sent in room ${roomID}`);
}

exports.deleteMessage = async (io, messageID, userID, roomID) => {
  const room = await Room.findById(roomID);

  if (room.users.indexOf(userID) === -1) return;

  const index = room.messages.indexOf(messageID);
  if (index === -1) return;
  room.messages.splice(index, 1);

  io.in(roomID).emit('messageDeletion', messageID);

  await Message.deleteOne({ _id: messageID });

  console.log(`Message deleted in room ${roomID}`);
}

exports.createRoom = async roomName => {
  const key = Math.random().toString(16).slice(2);

  const room = Room({
    name: roomName,
    avatarLink: `https://api.dicebear.com/7.x/initials/svg?seed=${roomName}`,
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
