import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import { todosRoutes } from "./routes/todosRoutes";
import { loginRoutes } from "./routes/loginRoutes";

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const dbURL: string = process.env.DB_URL;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/todos", todosRoutes);
app.use("/user", loginRoutes);
