//Room Model:
const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: false
    }
});
const Room = mongoose.model('Room', RoomSchema, 'rooms');
module.exports = Room;


