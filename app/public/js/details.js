let options = document.querySelector("#inputState");
let url = localStorage.getItem("url")

options.addEventListener("change", () => {
    window.location.href = `/dashboard/detailsOrders?provider=${options.value}`;
});
document.addEventListener("DOMContentLoaded", () => {
    const vDiarias = document.querySelector(".vDiarias");
    const ganancias = document.querySelector(".ingresos");
    const cantidadV = document.querySelector(".cantidadV");
    fetch(url +"/orders/sales")
    .then(res => res.json())
    .then(data => {
        const p = document.createElement("p");
        p.innerHTML = data[0].ventas
        cantidadV.appendChild(p)
    })
    if (!vDiarias) {
        console.error("No se encontró el elemento con la clase 'vDiarias'");
        return;
    }
    fetch(url+"/orders/suma")
    .then(res => res.json())
    .then(data => {
        const p = document.createElement("p");
        p.innerHTML = "$" + data[0].total
        ganancias.appendChild(p)
    })
    fetch(url +"/orders/daily")
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return res.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('La respuesta no es un array:', data);
                return;
            }
            data.forEach((info, count) => {
                let fecha = new Date(info.Fecha);
                let opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric'};
                let fechaFormateada = fecha.toLocaleDateString('es-CO', opcionesFecha);

                const ventas = document.createElement("p");
                ventas.innerHTML = `Fecha: ${fechaFormateada} Ventas: ${info.TotalVentas}`;
                vDiarias.appendChild(ventas);
            });
        })
        .catch(err => console.error('Error al obtener datos de la API:', err));
});

