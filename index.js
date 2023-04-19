const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const taskRoutes = require("./Routes/TaskRoutes");

//middleware
app.use(express.json());

//Task management Routes
app.use("/api/task", taskRoutes);

//Authentication page
app.get("/", (req, res) => {
  res.json({ msg: "Authentication Page" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected mongoDB");
  })
  .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("Listing on port 3000");
});
