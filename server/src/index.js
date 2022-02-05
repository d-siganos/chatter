const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser  = require('body-parser');
const cors = require('cors');

const { sendMessage, userJoin } = require('./socketFunctions');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/roomRoutes')(app);
require('./routes/userRoutes')(app);

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('Connection established');

  socket.on('join', async ({ user, room }, callback) => {
    const key = await userJoin(socket, io, user, room);
    if (callback) callback(key);
  });

  socket.on('sendMessage', ({ room, messageData }) => {
    sendMessage(io, room, messageData);
  });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
    socket.disconnect();

    console.log('User disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
