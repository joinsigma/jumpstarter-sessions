const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let counter = 0

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
    console.log('a user connected');
    // io.emit('chat message',"A wild Pokemon has appeared")
    socket.broadcast.emit('chat message', `hii ${counter}`);
    
    // --- The event listener for chat msg ---
    // Chat message event listener to print message. This chat message is recieved from HTML side
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // io.emit('chat message',msg)
        socket.broadcast.emit('chat message2',`broadcast ${msg}`);
      });

    // socket listener for disconnect event
    socket.on('disconnect',()=>{
        console.log('user disconnected')
        io.emit('chat message',`Person ${counter} disconnected`)
        counter++
    })

  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
