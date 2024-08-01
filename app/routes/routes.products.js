import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";

const routesProducts = Router();

routesProducts.use("/", ProductController.getAll)

export default routesProducts;