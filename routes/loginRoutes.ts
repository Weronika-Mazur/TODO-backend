import express from "express";
import { loginController } from "../controllers/loginController";

const loginRoutes = express.Router();

loginRoutes.post("/login", loginController.login);
loginRoutes.post("/register", loginController.register);

export { loginRoutes };
