document.addEventListener('DOMContentLoaded', () => {
    let url = localStorage.getItem("url")
    let generar = document.querySelectorAll(".generar");
    generar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const container = e.target.closest(".user-list-item");
            const id = parseInt(container.querySelector(".id").textContent);

            fetch(url +`/bills/${id}`)
                .then(res => res.json())
                .then(data => {
                    // Datos de la factura y productos obtenidos
                    const { facturaInfo, productosInfo } = data;

                    // Crear documento PDF
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();

                    // Definir posición inicial para escribir
                    let y = 10;

                    // Agregar título de la factura
                    doc.setFontSize(16);
                    doc.text(`Factura - ID ${id}`, 10, y);
                    y += 10;

                    // Agregar información de la factura
                    doc.setFontSize(12);
                    Object.keys(facturaInfo).forEach(key => {
                        doc.text(`${key}: ${facturaInfo[key]}`, 10, y);
                        y += 10;
                    });

                    // Agregar detalles de los productos
                    y += 10; // Espacio entre secciones
                    doc.setFontSize(14);
                    doc.text('Detalles de Productos', 10, y);
                    y += 10;
                    doc.setFontSize(12);
                    productosInfo.forEach((producto, index) => {
                        doc.text(`Producto ${index + 1}: ${producto.NombreProducto}, Precio: ${producto.PrecioVenta} Cantidad: ${producto.Cantidad}`, 10, y);
                        y += 10;
                    });

                    // Descargar el PDF con el nombre basado en la ID de la factura
                    doc.save(`tartaro_pedido_${id}.pdf`);
                })
                .catch(err => console.error(err));
        });
    });
});
