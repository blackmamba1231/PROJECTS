// db.js

const mongoose = require('mongoose');
const connectDB = () => mongoose.connect("mongodb+srv://Sudhanshu:KiTMF6SBvlMk5Tjn@cluster0.p6pm8.mongodb.net/");

module.exports = connectDB;
