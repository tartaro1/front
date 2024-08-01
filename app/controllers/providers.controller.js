export class ProvidersController {
    static getAll = async (req, res) => {
        try {
                let datos = {};
                fetch(process.env.BACKEND_URL + "/providers")
                .then(response => response.json())
                .then(data => {
                    datos = data;
                    res.render("views.providers.ejs", {providers: datos})
                })
        } catch (error) {
            console.error("Error fetching categories:", error.message);
            res.status(500).send(error.message);
        }
    }
    
}