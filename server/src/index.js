const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser  = require('body-parser');
const cors = require('cors');

const { sendMessage, userJoin } = require('./socketFunctions');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())
app.use(bodyParser.json());

require('./routes/messageRoutes')(app);
require('./routes/userRoutes')(app);

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('Connection established');

  socket.on('join', ({ username, room }) => {
    userJoin(socket, io, username, room);
  });

  socket.on('sendMessage', messageData => {
    sendMessage(socket, messageData);
  });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
    socket.disconnect();

    console.log('User disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
