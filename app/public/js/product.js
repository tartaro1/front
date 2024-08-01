document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelector(".options");
    const plus = document.querySelector(".plus");
    const less = document.querySelector(".less");
    plus.addEventListener("click", (e) => {
        incrementarCantidad(options)
        e.stopPropagation();
    })
    less.addEventListener("click", (e) => {
        decrementarCantidad(options)
        e.stopPropagation();
    })
})



function incrementarCantidad(card) {
    const cantidadSpan = card.querySelector(".count");
    let cantidad = parseInt(cantidadSpan.textContent);
    cantidad++;
    cantidadSpan.textContent = cantidad;
}

function decrementarCantidad(card) {
    const cantidadSpan = card.querySelector(".count");
    let cantidad = parseInt(cantidadSpan.textContent);
    if (cantidad >= 2) {
        cantidad--;
        cantidadSpan.textContent = cantidad;
    } 
}
