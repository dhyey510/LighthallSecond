const express = require("express");
const {
  getAllTask,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
} = require("../Controller/TaskController");

const router = express.Router();

//GET /:name  ->  to get all task on home page
router.get("/:name", getAllTask);

//GET /:id/task -> get single task
router.get("/:id/task", getSingleTask);

//GET /:name/form  -> for task create/edit web page
// router.get("/:name/form", (req, res) => {
//   res.json({ "new Task": req.params.name });
// });

//POST /:name/task ->  for creating task
router.post("/:name/task", createTask);

//PUT /:name/:id/edit  -> for edit task
router.put("/:name/:id/edit", editTask);

//DELETE /:name/:id/delete  ->  for delete task
router.delete("/:name/:id/delete", deleteTask);

module.exports = router;
