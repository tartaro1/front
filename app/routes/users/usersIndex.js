import { Router } from "express";
import routesIndex from "./routes.index.js";

const usersIndex = Router();

usersIndex.use("/", routesIndex);

export default usersIndex;