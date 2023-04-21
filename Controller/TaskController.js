const Task = require("../Models/TaskModel");
const mongoose = require("mongoose");

/**
 * get all task
 */

const getAllTask = async (req, res) => {
  try {
    const allTasks = await Task.find({ User: req.params.name });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(404).json({ error: "No Task!!" });
  }
};

/**
 * get single task
 */

const getSingleTask = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Not valid id" });
  }
  await Task.findById(req.params.id)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((e) => {
      res.status(404).json({ error: e });
    });
};

/**
 * create new task
 */

const createTask = async (req, res) => {
  const { Description, DueDate, Title, Status } = req.body;
  const newTask = new Task({
    User: req.params.name,
    Description: Description,
    DueDate: DueDate,
    Title: Title,
    Status: Status,
  });

  await newTask
    .save()
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((e) => {
      res.status(404).json({ error: e });
    });
};

/**
 * edit task
 */

const editTask = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Not valid id" });
  }
  const { Description, DueDate, Title, Status } = req.body;

  const oldTask = await Task.findById(req.params.id);

  oldTask.Description = Description;
  oldTask.DueDate = DueDate;
  oldTask.Title = Title;
  oldTask.Status = Status;
  oldTask.User = req.params.name;

  await oldTask
    .save()
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((e) => {
      res.status(404).json({ error: e });
    });
};

/**
 * delete task
 */

const deleteTask = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Not valid id" });
  }

  await Task.findByIdAndDelete(req.params.id)
    .then((deletedTask) => {
      res.status(200).json(deletedTask);
    })
    .catch((e) => {
      res.status(404).json({ error: "No such task" });
    });
};

module.exports = {
  getAllTask,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
};
