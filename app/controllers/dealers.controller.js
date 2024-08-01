export class DealersController {
    static getAll = async (req, res) => {
        try {
            const {email} = req.query;
            if (email) {
                let datos = {};
                fetch(process.env.BACKEND_URL +`/dealers?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    datos = data;
                    res.render("views.resultDealer.ejs", {dealers: datos})
                })
            }else {
                let datos = {};
                fetch(process.env.BACKEND_URL +"/dealers")
                .then(response => response.json())
                .then(data => {
                    datos = data;
                    res.render("views.dealers.ejs", {dealers: datos})
                })
            }
        } catch (error) {
            console.error("Error fetching detailsOrder:", error.message);
            res.status(500).send(error.message);
        }
    }
    
}