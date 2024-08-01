import { Router } from "express";
import { carrito, categorias, check, formulario, index, inicio, login, producto, search, signup } from "../../controllers/users/index.controller.js";

const routesIndex = Router();

routesIndex.get("/", index)
routesIndex.get("/login", login)
routesIndex.get("/registro", signup)
routesIndex.get("/inicio", inicio)
routesIndex.get("/search", search)
routesIndex.get("/categorias", categorias)
routesIndex.get("/formulario", formulario)
routesIndex.get("/producto/:id", producto)
routesIndex.get("/carrito", carrito)
routesIndex.get("/check", check)

export default routesIndex;