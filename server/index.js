//Configure an express server:
const express = require('express');
const app = express();

//Configure a port from dotenv:
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

//Connect to db using connection.js file:
const connection = require('./Configuration/connection');
const { default: mongoose } = require('mongoose');
mongoose.set('strictQuery', true);
connection();

//Configure a middleware:
app.use(express.json());

//Configure a cors:
const cors = require('cors');

//Configure a CORS origin:
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.1.109:3000'],
  optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT' , 'DELETE'],
    allowedHeaders: ['Content-Type']
    
};
app.use(cors(corsOptions));

//Create an HTTP server:
const server = require('http').createServer(app);

//Configure a socket.io:
const io = require('socket.io')(server, {
    cors: {

      origin: ['http://localhost:3000','http://192.168.1.109:3000' ],
      methods: ['GET', 'POST', 'PUT' , 'DELETE'],
      allowedHeaders: ['Content-Type']
    }
  });
  
//Configure a socket.io connection:
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Attach the socket.io instance to the HTTP server:
app.io = io;

//Start the server:
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//configure routes:
const RoomRoute = require('./Routes/RoomRoute');
app.use('/rooms', RoomRoute);
