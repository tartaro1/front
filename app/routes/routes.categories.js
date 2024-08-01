import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller.js";

const routesCategories = Router();

routesCategories.get("/", CategoriesController.getAll);

export default routesCategories;