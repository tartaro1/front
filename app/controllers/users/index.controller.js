
export const login = (req, res) => {
    res.render("views.login.ejs");
}
export const signup = (req, res) => {
    res.render("views.signup.ejs");
}
export const index = (req, res) => {
    let url = process.env.BACKEND_URL;
    fetch(process.env.BACKEND_URL +"/products/top")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                res.render("views.index.ejs", { products: data, url: url });
            } else {
                res.render("views.index.ejs", { products: [] });  // Enviar un arreglo vacío si no es un arreglo
            }
        })
        .catch(err => {
            console.error('Error al obtener productos:', err);
            res.render("views.index.ejs", { products: [] });  // Enviar un arreglo vacío en caso de error
        });
};

export const inicio = (req, res) => {
    let url = process.env.BACKEND_URL;
    let datos = {}
    fetch(process.env.BACKEND_URL +"/products/top")
    .then(res => res.json())
    .then(data => {
        datos = data;
        res.render("views.inicio.ejs", {products: datos, url:url});
    })
}
export const search = (req, res) => {
    res.render("views.search.ejs");
}

export const categorias = (req, res) => {
    res.render("views.categories.ejs");
}

export const formulario = (req, res) => {
    res.render("views.payment.ejs");
}
export const producto = (req, res) => {
    const {id} = req.params;
    let datos = {}
    fetch(process.env.BACKEND_URL+`/products/${id}`)
    .then(res => res.json())
    .then(data => {
        datos = data;
        res.render("views.product.ejs", {products: datos});
    })
    .catch(err => console.error(err))
}
export const carrito = (req, res) => {
    res.render("views.cart.ejs")
}
export const check = async (req, res) => {
    try {
        const response = await fetch(process.env.BACKEND_URL +`/orders?user=1`);
        if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
        }
        const data = await response.json();
        // Ordena los pedidos por fecha descendente para obtener el último
        const ultimoPedido = data.sort((a, b) => new Date(b.FechaPedido) - new Date(a.FechaPedido))[0];
        res.render('views.check.ejs', { pedido: ultimoPedido });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el estado del último pedido');
    }
};

