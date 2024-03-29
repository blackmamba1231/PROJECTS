const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Sudhanshu:KiTMF6SBvlMk5Tjn@cluster0.p6pm8.mongodb.net/");

const todoSchema = new mongoose.Schema({
title: String,
description: String,
completed: Boolean
})
const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}