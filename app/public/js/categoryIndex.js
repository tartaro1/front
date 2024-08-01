let menu = document.querySelectorAll(".menu");
let ad = document.querySelector(".anuncio");
let recommended = document.querySelector(".produ_recomendados");
let backBtn = document.querySelector(".back");
let url = localStorage.getItem("url")
// Evento de clic para el menú
menu.forEach(item => {
    item.addEventListener("click", (e) => {
        const clickedButton = e.target;
        let text = clickedButton.textContent.trim();

        // Guardar el estado del botón seleccionado en localStorage
        localStorage.setItem('selectedCategory', text);

        // Cambiar la URL
        window.location.href = url +`/products?category=${text}`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
        menu.forEach(item => {
            if (item.textContent.trim() === selectedCategory) {
                item.classList.add("clicked");
                item.classList.remove("menu");
            } else {
                item.classList.add("menu");
                item.classList.remove("clicked");
            }
        });
    }
    let card = document.querySelectorAll(".card");
    card.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const cardContent = e.currentTarget.querySelector(".card-body");
            mostrarVentanaEmergente(cardContent);
            e.stopPropagation();
        })
    });
    let plus = document.querySelectorAll('.mas');
    plus.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let card = e.target.closest(".card")
            e.stopPropagation();
            incrementarCantidad(card)
        })
    })
    let minus = document.querySelectorAll(".menos");
    minus.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let card = e.target.closest(".card")
            decrementarCantidad(card)
        })
    })
    let addButtons = document.querySelectorAll(".agregar");
    let carritoIcon = document.querySelector(".carrito");
    let carritoDisplay = document.querySelector(".car");
    let container = document.querySelector(".container-car")
    container.style.display = "none";
    carritoDisplay.addEventListener("click", (e) => {
        if (e.target.classList.contains("mas")) {
            incrementarCantidad(e.target.closest('.producto'));
        }
    });
    // Evento para decrementar la cantidad de productos
    carritoDisplay.addEventListener("click", (e) => {
        if (e.target.classList.contains("menos")) {
            decrementarCantidad(e.target.closest('.producto'));
        }
    });
    carritoDisplay.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar")) {
            eliminarProducto(e.target.closest('.producto'));
        }
    });
    function eliminarProducto(card) {
        const title = card.querySelector('.title').textContent.trim();
        let productosEnCarrito = getCarritoFromLocalStorage();
        productosEnCarrito = productosEnCarrito.filter(producto => producto.title !== title);
        guardarCarritoEnLocalStorage(productosEnCarrito);
        actualizarCarritoVisual();
    }
    // Función para obtener los productos guardados en localStorage
    function getCarritoFromLocalStorage() {
        let carrito = localStorage.getItem("carrito");
        return carrito ? JSON.parse(carrito) : [];
    }

    // Función para guardar los productos en localStorage
    function guardarCarritoEnLocalStorage(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para actualizar la visualización del carrito
    function actualizarCarritoVisual() {
        let productosEnCarrito = getCarritoFromLocalStorage();

        if (productosEnCarrito.length === 0) {
            carritoDisplay.innerHTML = `<p class="text-center">No hay productos en el carrito</p>`;
        } else {
            let carritoHTML = productosEnCarrito.map(producto => {
                return `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 col-md-12">
                            <div class="producto card mb-3 ms-md-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-md-4 ms-5 ms-md-0">
                                            <img src="${producto.imgSrc}" alt="" class="card-img-top img-fluid" style="border-radius: 20px;">
                                        </div>
                                        <div class="col-12 col-md-4 mt-4">
                                            <p class="card-text fs-5 fb-5 title">${producto.title}</p>
                                            <p class="card-text fs-5 price">$${producto.price}</p>
                                            <p class="card-text mb-3 rating">${producto.rating} ★★★★★</p>
                                        </div>
                                        <div class="col-12 col-md-4 align-items-center justify-content-center mt-md-5 ms-5 ms-md-0">
                                            <button type="button" class="menos btn btn-secondary ms-md-4">-</button>
                                            <span class="cantidad">${producto.cantidad}</span>
                                            <button type="button" class="mas btn btn-secondary">+</button>
                                            <button type="button" class="eliminar btn btn-primary d-block ms-md-4 mt-1">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join("");
            carritoDisplay.innerHTML = carritoHTML;
        }
    }
    actualizarCarritoVisual();
    // Evento para agregar productos al carrito
    addButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let card = e.currentTarget.closest('.card');
            let imgSrc = card.querySelector('.card-img-top').src;
            let title = card.querySelector('.title').textContent.trim();
            let price = card.querySelector('.price').textContent.trim();
            let rating = card.querySelector('.rating').textContent.trim();
            let cantidad = card.querySelector('.cantidad').textContent.trim()

            // Obtener productos actuales del carrito desde localStorage
            let productosEnCarrito = getCarritoFromLocalStorage();

            // Agregar nuevo producto al carrito
            productosEnCarrito.push({
                imgSrc: imgSrc,
                title: title,
                price: price,
                rating: rating,
                cantidad: cantidad
            });

            // Guardar productos actualizados en localStorage
            guardarCarritoEnLocalStorage(productosEnCarrito);

            // Actualizar visualización del carrito
            actualizarCarritoVisual();
        });
    });

    // Mostrar carrito al hacer clic en el icono de carrito
    carritoIcon.addEventListener("click", () => {
        let results = document.querySelector(".results");
        let aside = document.querySelector(".aside");
        aside.style.display = "none";
        results.style.display = "none";
        container.style.display = "flex";
        carritoDisplay.style.display = "flex";
    });
});

// Evento de clic para el botón "back"
backBtn.addEventListener("click", () => {
    localStorage.removeItem("selectedCategory");
});

function getSiblings(elem) {
    const nodes = Array.from(elem.parentNode.childNodes);
    const siblings = {
        previous: null,
        next: null
    };
    for (const node of nodes) {
        if (node === elem) {
            const index = nodes.indexOf(node);
            if (index > 0) {
                siblings.previous = nodes[index - 1];
            }
            if (index < nodes.length - 1) {
                siblings.next = nodes[index + 1];
            }
            break;
        }
    }
    return siblings;
}
function mostrarVentanaEmergente(content) {
    const modalContainer = document.querySelector(".modal-container");
    const ventanaEmergente = document.createElement("div");
    ventanaEmergente.classList.add("modal-content");

    let img = content.querySelector(".card-img-top");
    const imgUrl = img ? img.getAttribute("src") : '';

    let title = content.querySelector(".title");
    const titleText = title ? title.textContent : '';

    let price = content.querySelector(".price");
    let priceText = price ? price.textContent : '';

    let id = content.querySelector(".id") ? content.querySelector(".id").textContent : '';

    fetch(`https://localhost:9200/index/products/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data[0].Descripcion) {
                ventanaEmergente.innerHTML = `
              <div class="container-fluid">
                  <button class="close-btn">X</button>
                  <div class="row ms-md-5 me-md-5">
                      <div class="col-12">
                          <div class="card">
                              <div class="card-body">
                                  <div class="row">
                                      <div class="col-12 col-md-5 d-flex justify-content-center align-items-center">
                                          <img src="${imgUrl}" alt="" class="card-img-top img-fluid" style="border-radius: 20px;">     
                                      </div>
                                      <div class="col-12 col-md-4">
                                          <p class="card-text fs-5 fb-5">${titleText}</p>
                                          <p class="card-text mb-3 fs-5">${data[0].Calificacion} ★★★★★</p>
                                          <p class="card-text">Descripcion</p>
                                          <p class="card-text">${data[0].Descripcion}</p>
                                      </div>
                                      <div class="col-12 col-md-2">
                                          <p class="card-text fs-5 ms-md-5 mt-5">${priceText}</p>
                                          <div class="botones mt-5 ms-5 ms-md-0">
                                              <button type="button" class="menos btn btn-secondary ms-md-4">-</button>
                                              <span>1 unidad</span>
                                              <button type="button" class="mas btn btn-secondary">+</button>
                                              <a href="carrito.html" style="text-decoration: none;">
                                                  <button type="button" class="agregar btn btn-primary d-block ms-md-4">🛒Agregar</button>
                                              </a>
                                              <a href="formulario-envio.html" style="text-decoration: none;">
                                                  <button type="button" class="agregar btn btn-primary d-block ms-md-4">Comprar</button>
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-12">
                          <p class="text-start m-5 fw-bold fs-5">Productos Recomendados.</p>
                          <div class="row">
                              <div class="row pt-2">
                                  <div class="col-md-4">
                                  <div class="card ms-md-5">
                                    <div class="d-flex justify-content-center align-items-center">
                                      <img src="httpss://https2.mlstatic.com/D_NQ_NP_702767-MLA52414944351_112022-O.webp" alt="" class=" producto card-img-top">
                                    </div>
                                    <div class="card-body">
                                      <p class="card-text">Papas pringles</p>
                                      <p class="card-text">$13000</p>
                                      <p class="card-text">★★★★★</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card ">
                                    <div class="d-flex justify-content-center align-items-center">
                                      <img src="httpss://https2.mlstatic.com/D_NQ_NP_702767-MLA52414944351_112022-O.webp" alt="" class=" producto card-img-top">
                                    </div>
                                    <div class="card-body">
                                      <p class="card-text">Papas pringles</p>
                                      <p class="card-text">$13000</p>
                                      <p class="card-text">★★★★★</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card me-md-5">
                                    <div class="d-flex justify-content-center align-items-center">
                                      <img src="httpss://https2.mlstatic.com/D_NQ_NP_702767-MLA52414944351_112022-O.webp" alt="" class="producto card-img-top">
                                    </div>
                                    <div class="card-body">
                                      <p class="card-text">Papas pringles</p>
                                      <p class="card-text">$13000</p>
                                      <p class="card-text">★★★★★</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card ms-md-5 mt-1">
                                    <div class="d-flex justify-content-center align-items-center">
                                      <img src="httpss://https2.mlstatic.com/D_NQ_NP_702767-MLA52414944351_112022-O.webp" alt="" class="producto card-img-top">
                                    </div>
                                    <div class="card-body">
                                      <p class="card-text">Papas pringles</p>
                                      <p class="card-text">$13000</p>
                                      <p class="card-text">★★★★★</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card mt-1">
                                    <div class="d-flex justify-content-center align-items-center">
                                      <img src="httpss://https2.mlstatic.com/D_NQ_NP_702767-MLA52414944351_112022-O.webp" alt="" class="producto card-img-top">
                                    </div>
                                    <div class="card-body">
                                      <p class="card-text">Papas pringles</p>
                                      <p class="card-text">$13000</p>
                                      <p class="card-text">★★★★★</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="card me-md-5 mt-1">
                                    <div class="d-flex justify-content-center align-items-center">
                                      <img src="httpss://https2.mlstatic.com/D_NQ_NP_702767-MLA52414944351_112022-O.webp" alt="" class="producto card-img-top">
                                    </div>
                                    <div class="card-body">
                                      <p class="card-text">Papas pringles</p>
                                      <p class="card-text">$13000</p>
                                      <p class="card-text">★★★★★</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `;

                const closeBtn = ventanaEmergente.querySelector(".close-btn");
                if (closeBtn) {
                    closeBtn.addEventListener("click", ocultarVentanaEmergente);
                }

                // Add event listeners to increment and decrement buttons
                const incrementBtn = ventanaEmergente.querySelector(".mas");
                const decrementBtn = ventanaEmergente.querySelector(".menos");
                if (incrementBtn) {
                    incrementBtn.addEventListener("click", () => incrementarCantidad(ventanaEmergente));
                }
                if (decrementBtn) {
                    decrementBtn.addEventListener("click", () => decrementarCantidad(ventanaEmergente));
                }

                modalContainer.innerHTML = "";
                modalContainer.appendChild(ventanaEmergente);
                modalContainer.style.display = "flex";
            }
        })
}

function ocultarVentanaEmergente() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.style.display = "none";
}
// Funciones para incrementar y decrementar la cantidad
function incrementarCantidad(card) {
    const cantidadSpan = card.querySelector("span");
    if (cantidadSpan) {
        let cantidad = parseInt(cantidadSpan.textContent);
        cantidad++;
        cantidadSpan.textContent = cantidad + " unidades";
    } else {
        console.error('cantidadSpan not found');
    }
}

function decrementarCantidad(card) {
    const cantidadSpan = card.querySelector("span");
    if (cantidadSpan) {
        let cantidad = parseInt(cantidadSpan.textContent);
        if (cantidad === 1) {
            cantidadSpan.textContent = cantidad + " unidad";
        } else if (cantidad >= 2) {
            cantidad--;
            cantidadSpan.textContent = cantidad + " unidades";
        }
    } else {
        console.error('cantidadSpan not found');
    }
}
