const Task = require("../Models/TaskModel");
const mongoose = require("mongoose");

/**
 * get all task
 */

const getAllTask = async (req, res) => {
  try {
    await Task.find({ User: req.query.username }).then((allTasks) => {
      res.render("homepage.ejs", { allTasks, user: req.query.username });
    });
  } catch (error) {
    res.status(404).json({ error: "No Task!!" });
  }
};

/**
 * Open new task form
 */

const openNewTask = (req, res) => {
  res.render("newTaskPage.ejs", { user: req.params.name });
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
      res.redirect(`/homepage?username=${req.params.name}`);
    })
    .catch((e) => {
      res.status(404).json({ error: e });
    });
};

/**
 * Open edit task page
 */
const openEditTask = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Not valid id" });
  }
  const oldTask = await Task.findById(req.params.id);
  res.render("editTaskPage.ejs", { oldTask, user: req.params.name });
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
      res.redirect(`/homepage?username=${req.params.name}`);
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
      res.redirect(`/homepage?username=${req.params.name}`);
    })
    .catch((e) => {
      res.status(404).json({ error: "No such task" });
    });
};

const sortStatus = async (req, res) => {
  await Task.find({ User: req.params.name }).then((allTasks) => {
    // console.log(allTasks);
    allTasks.sort(getSortedOrder("Status"));
    // console.log(allTasks);
    res.render("homepage.ejs", { allTasks, user: req.params.name });
    // res.redirect(`/homepage?username=${req.params.name}`);
  });
};

const sortDueDate = async (req, res) => {
  await Task.find({ User: req.params.name }).then((allTasks) => {
    // console.log(allTasks);
    allTasks.sort(getSortedOrder("DueDate"));
    // console.log(allTasks);
    res.render("homepage.ejs", { allTasks, user: req.params.name });
    // res.redirect(`/homepage?username=${req.params.name}`);
  });
};

const sortTitle = async (req, res) => {
  await Task.find({ User: req.params.name }).then((allTasks) => {
    // console.log(allTasks);
    allTasks.sort(getSortedOrder("Title"));
    // console.log(allTasks);
    res.render("homepage.ejs", { allTasks, user: req.params.name });
    // res.redirect(`/homepage?username=${req.params.name}`);
  });
};

const getSortedOrder = (prop) => {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
};

const searchTask = async (req, res) => {
  const searchKey = req.query.search;

  await Task.find({ User: req.params.name }).then((allTasks) => {
    let findTask = [];
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].Title.toLowerCase().includes(searchKey)) {
        findTask.push(allTasks[i]);
      }
    }
    res.render("homepage.ejs", {
      allTasks: findTask,
      user: req.params.name,
    });
  });
};

const logout = (req, res) => {
  // req.logout();
  res.redirect("/");
};

module.exports = {
  getAllTask,
  createTask,
  editTask,
  deleteTask,
  openNewTask,
  openEditTask,
  sortStatus,
  sortDueDate,
  sortTitle,
  searchTask,
  logout,
};
