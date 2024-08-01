import { Router } from "express";
import { BackupsController } from "../controllers/backup.controller.js";
const routesBackup = Router();

routesBackup.get("/", BackupsController.getLatest);

export default routesBackup;