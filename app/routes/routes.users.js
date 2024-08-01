import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
const routesUsers = Router();

routesUsers.get("/", UsersController.getAll);

export default routesUsers;