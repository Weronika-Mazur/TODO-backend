const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todosRoutes");
const loginRoutes = require("./routes/loginRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const dbURL = process.env.DB_URL;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(dbURL)
  .then((result) => {
    console.log("connected to DB");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/todos", todosRoutes);
app.use("/user", loginRoutes);
