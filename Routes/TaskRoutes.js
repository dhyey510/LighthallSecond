const express = require("express");
const {
  getAllTask,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
} = require("../Controller/TaskController");

const router = express.Router();

//GET /:name  ->  for home page
router.get("/:name", getAllTask);

//GET /:id/task -> Get single task for edit
router.get("/:id/task", getSingleTask);

//GET /:name/form  -> for task create/edit web page
// router.get("/:name/form", (req, res) => {
//   res.json({ "new Task": req.params.name });
// });

//POST /:name/task ->  for creating task
router.post("/:name/task", createTask);

//PATCH /:id/edit  -> for edit task
router.put("/:name/:id/edit", editTask);

//DELETE /:id/delete  ->  for delete task
router.delete("/:name/:id/delete", deleteTask);

module.exports = router;
