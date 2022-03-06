const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todosRoutes");
require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

const dbURL = process.env.DB_URL;

mongoose
  .connect(dbURL)
  .then((result) => {
    console.log("connected to DB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/todos", todosRoutes);
