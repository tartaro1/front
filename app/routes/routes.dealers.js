import { Router } from "express";
import { DealersController } from "../controllers/dealers.controller.js";

const routesDelivers = Router();

routesDelivers.get("/", DealersController.getAll);

export default routesDelivers;