const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  User: String,
  Description: String,
  DueDate: Date,
  Title: String,
  Status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
