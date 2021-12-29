const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser  = require('body-parser');

const connect = require('./dbConnection');
const Message = require('./models/messageModel');

const PORT = 8080;

const app = express();
app.use(bodyParser.json());
require('./routes/messageRoutes')(app);

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: '*',
  }
});

const sendMessage = messageData => {
  io.emit('message', messageData);

  connect.then(db  =>  {
    let msg = new Message(messageData);
    msg.save();
  });

  console.log('Message sent');
}

io.on('connection', socket => {
  console.log('Connection established');

  socket.on('join', ({ username, room }) => {
    socket.join(room);

    const messageData = {
      room: room,
      user: 'Admin',
      message: `A wild ${username} appeared!`,
      date: new Date().getTime(),
    };

    sendMessage(messageData);

    console.log('User joined');
  });

  socket.on('sendMessage', messageData => {
    sendMessage(messageData);
  });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
    socket.disconnect();

    console.log('User disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
