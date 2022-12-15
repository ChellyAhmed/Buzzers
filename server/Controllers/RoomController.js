// Import Room Model
const Room = require('../Models/RoomModel.js');

//Import Socket.io:
const io = require('socket.io')();

//Create Room Controller:
const createRoom = async (req, res) => {
    const room = req.body;
    const newRoom = new Room(room);
    try {
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//Update Room Controller:
const updateRoomAddUser = async (req, res) => {

    //Get the name of the user from the request parameters
    const name = req.params.name;
    
    let room = (await Room.find())[0];
    //If new user, add to the room.
    if (!room.users.some((user) => user.name === name)) {
        const buzz = false;
        room.users.push({name, buzz});
        Room.updateOne({name: room.name}, {$set: {users: room.users}}   )
        await room.save();
        res.json(room);
    }
    //If user already exists, toggle the value of buzz
    // If the user already exists in the room, toggle the value of their "buzz" property
  else {
    // Update the user object in the array with the specified name
    room.users = room.users.map((user) => {
      if (user.name === name) {
        user.buzz = !user.buzz;
      }
      return user;
    });
    let updatedRoom = room;

    // Update the room in the database and save the updated room object
    room = await Room.findOneAndUpdate(
      { name: room.name },
      { $set: { users: room.users } }
    );

    res.json(updatedRoom);
      // Emit a notification to all connected clients
      req.app.io.emit('roomUpdate');
  }
};


//getRooms Controller:
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({ rooms: rooms });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//export Room Controller:
module.exports = {
    createRoom,
    getRooms,
    updateRoomAddUser
}
