import { Router } from "express";
import { DetailsController } from "../controllers/details.controller.js";
const routesDetails = Router();

routesDetails.get("/", DetailsController.getAll);

export default routesDetails;

