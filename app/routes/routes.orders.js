import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller.js";

const routesOrders = Router();
routesOrders.get("/", OrdersController.getAll);
export default routesOrders;