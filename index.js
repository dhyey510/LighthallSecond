const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const taskRoutes = require("./Routes/TaskRoutes");

//middleware
// app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//Authentication page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Task management Routes
app.use(taskRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected mongoDB");
  })
  .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log("Listing on port 3000");
});
