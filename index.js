const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const taskRoutes = require("./Routes/TaskRoutes");

//middleware
// app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/Views"));
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

let port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Listing on port ${port}`);
});
