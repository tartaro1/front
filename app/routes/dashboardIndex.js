import routesUsers from "./routes.users.js";
import routesProducts from "./routes.products.js";
import routesDetails from "./routes.details.js";
import { Router } from "express";
import routesOrders from "./routes.orders.js";
import routesDelivers from "./routes.dealers.js";
import routesBackup from "./routes.backup.js";
import routesCategories from "./routes.categories.js";
import routesProviders from "./routes.providers.js";

const dashboardRouter = Router();

dashboardRouter.use("/users", routesUsers);
dashboardRouter.use("/products", routesProducts);
dashboardRouter.use("/detailsOrders", routesDetails)
dashboardRouter.use("/orders", routesOrders)
dashboardRouter.use("/dealers", routesDelivers)
dashboardRouter.use("/backup", routesBackup)
dashboardRouter.use("/categories", routesCategories)
dashboardRouter.use("/providers", routesProviders)
dashboardRouter.use("/gestion", (req, res) => {
    res.render("views.gestion.ejs")
})
dashboardRouter.use("/", (req, res) => {
    res.render('views.dashboard.ejs');
});

export default dashboardRouter;
