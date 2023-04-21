const express = require("express");
const {
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
} = require("../Controller/TaskController");

const router = express.Router();

//GET /:name  ->  to get all task on home page
router.get("/homepage", getAllTask);

//GET /createTask -> open new form for create task
router.get("/:name/createTask", openNewTask);

//POST /:name/task ->  for creating task
router.post("/:name/task", createTask);

//GET /:name/:id/editTask -> open edit page
router.get("/:name/:id/edit", openEditTask);

//PUT /:name/:id/edit  -> for edit task
router.post("/:name/:id/editTask", editTask);

//DELETE /:name/:id/delete  ->  for delete task
router.get("/:name/:id/delete", deleteTask);

//GET /:name/sort/status -> sort according to status
router.get("/:name/sort/status", sortStatus);

//GET /:name/sort/DueDate -> sort according to due date
router.get("/:name/sort/duedate", sortDueDate);

//GET /:name/sort/title -> sort according to title
router.get("/:name/sort/title", sortTitle);

//GET /:name/search -> sort according to title
router.get("/:name/search", searchTask);

module.exports = router;
