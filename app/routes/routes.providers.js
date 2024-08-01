import { Router } from "express";
import { ProvidersController } from "../controllers/providers.controller.js";

const routesProviders = Router();

routesProviders.get("/", ProvidersController.getAll);

export default routesProviders;