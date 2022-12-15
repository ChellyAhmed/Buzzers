const dotenv = require("dotenv");
dotenv.config();
const url = process.env.URL;
const mongoose = require("mongoose");
const connection = async () => {
    try {
        mongoose.connect(url);
        console.log("db is suucessfully connected");
    } catch (error) {
        console.log("db failed to connect");
        console.log(error);
    }
};
module.exports = connection;