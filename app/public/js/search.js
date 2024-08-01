const generarProductos = async () => {
    try {
        const url = "https://ms-backend-tartaro.onrender.com/products";
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const productos = await response.json();

        const listaContenedor = document.getElementById("lista-productos");
        listaContenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

        productos.forEach(producto => {
            const productoCard = document.createElement("div");
            productoCard.classList.add("product-card", "bg-white", "p-4", "rounded-lg", "shadow-lg");
            productoCard.setAttribute("data-category", `subcategoria${producto.ID_Categoria}`);
            productoCard.setAttribute("data-id", producto.id);
            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = "Producto";
            img.classList.add("w-full", "h-48", "object-cover", "rounded-lg", "mb-4");
            productoCard.appendChild(img);

            const nomProducto = document.createElement("h3");
            nomProducto.classList.add("text-lg", "font-bold", "mb-2");
            nomProducto.textContent = producto.NombreProducto;
            productoCard.appendChild(nomProducto);

            const descProducto = document.createElement("p");
            descProducto.classList.add("text-gray-700", "mb-2");
            descProducto.textContent = producto.Descripcion;
            productoCard.appendChild(descProducto);

            const precioProducto = document.createElement("p");
            precioProducto.classList.add("text-orange-600", "font-bold", "mb-4");
            precioProducto.textContent = `$${producto.PrecioVenta}`;
            productoCard.appendChild(precioProducto);

            const btnContenedor = document.createElement("div");
            btnContenedor.classList.add("flex", "space-x-2");

            const verBtn = createButton("Ver", "bg-orange-600", "text-white");
            verBtn.addEventListener("click", (event) => {
                event.preventDefault();
                const productId = productoCard.getAttribute("data-id");
                console.log(productId);
                window.location.href = `https://ms-backend-tartaro.onrender.com/producto/${productId}`;
            });
            btnContenedor.appendChild(verBtn);

            const comprarBtn = createButton("Agregar al carrito", "bg-green-600", "text-white");
            comprarBtn.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
            btnContenedor.appendChild(comprarBtn);

            productoCard.appendChild(btnContenedor);

            listaContenedor.appendChild(productoCard);
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error.message);
    }
};

function createButton(text, bgColor, textColor) {
    const btn = document.createElement("button");
    btn.type = "button"; // Especificar el tipo de botón
    btn.textContent = text;
    btn.classList.add("py-2", "px-4", "rounded-lg", bgColor, textColor);
    return btn;
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // actualizarNumeroCarrito(carrito.length);
    alert("Producto agregado al carrito");
}

// function actualizarNumeroCarrito(cantidad) {
//     const numCarrito = document.getElementById("numCarrito");
//     numCarrito.textContent = cantidad;
// }

generarProductos();
