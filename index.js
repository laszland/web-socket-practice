const express = require('express');
const socket = require('socket.io');

// Create Express App
const app = express();

// Create server
const server = app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});

//static files
app.use(express.static('public'));

// socket setup
io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
});