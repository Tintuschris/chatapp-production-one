const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Listen for connections from clients
io.on("connection", (socket) => {
  console.log("A user has connected.");

  // Listen for "message" events from this client
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
