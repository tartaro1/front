export class DetailsController {
    static getAll = async (req, res) => {
        try {
            const {provider} = req.query;
            if (provider) {
                let datos = {};
                fetch(process.env.BACKEND_URL +`/detailsOrders?provider=${provider}`)
                .then(response => response.json())
                .then(data => {
                    datos = data;
                    res.render("views.detailsOrder.ejs", {detailsOrders: datos})
                })
            }else{
                let datos = {};
                fetch(process.env.BACKEND_URL +"/detailsOrders")
                .then(response => response.json())
                .then(data => {
                    datos = data;
                    res.render("views.detailsOrder.ejs", {detailsOrders: datos})
                })
            }
        } catch (error) {
            console.error("Error fetching detailsOrder:", error.message);
            res.status(500).send(error.message);
        }
    }
}