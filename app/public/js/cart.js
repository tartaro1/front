function renderCart() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const quantity = item.quantity || 1;
      total += item.PrecioVenta * quantity;
      cartItems.innerHTML += `
        <div class="cart-item rounded-lg mb-4 border-2 shadow-lg h-48">
          <img src="${item.imagen}" alt="${item.NombreProducto}">
          <div class="cart-item-info">
            <h2 class="text-3xl font-bold">${item.NombreProducto}</h2>
            <p class="text-lg text-black">$${item.PrecioVenta}</p>
            <p class="text-lg text-black">${item.Calificacion} <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
            
          </div>
          <div class="cart-item-actions">
              <div class="flex">  
                  <button class="bg-yellow-500 text-white px-2 py-1 rounded bg-red" onclick="decreaseQuantity(${index})">-</button>
                  <p class="text-black bg-gray w-55p text-ctr">${quantity} </p>
                  <button class="bg-green-500 text-white px-2 py-1 rounded bg-orange-600" onclick="increaseQuantity(${index})">+</button>
                  </div>  
                  <button class="bg-orange-600 text-white px-4 py-2 rounded mt-4"onclick="removeFromCart(${index})">Eliminar</button>
              </div>
        </div>
      `;
    });

    document.getElementById('total-amount').innerText = `Total: $${total}`;
  }

  function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    cart.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderCart();
  }

  function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderCart();
  }

  function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      localStorage.setItem('carrito', JSON.stringify(cart));
    } else {
      removeFromCart(index);
    }
    renderCart();
  }
  
  document.getElementById('buyButton').addEventListener('click', () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        realizarPedido();
    } else {
        window.location.href = '/login';
    }
});
  document.addEventListener('DOMContentLoaded', renderCart);

  function realizarPedido() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }

    const pedido = {
        EstadoPedido: 'Pendiente', // Ajusta el estado según sea necesario
        Direccion: 'Dirección de prueba', // Puedes permitir al usuario ingresar la dirección
        cliente: 1, // Ajusta con el ID del cliente, posiblemente obtenido del token
        PrecioVenta: cart.reduce((total, item) => total + (parseInt(item.PrecioVenta.replace(/\./g, '')) * (item.quantity || 1)), 0),
        ID_Repartidor: 1 // Ajusta con el ID del repartidor, si se requiere
    };
    let url = localStorage.getItem("url")
    fetch(url +"/orders", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(pedido)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Error en la creación del pedido");
        }
        return res.json();
    })
    .then(response => {
        const { PedidoID } = response.data; // Asegúrate de que esta línea obtiene correctamente el PedidoID
        console.log('PedidoID:', PedidoID); // Verifica que se está recibiendo correctamente el PedidoID

        const detallePromises = cart.map(item => {
            const detalle = {
                ID_Pedido: PedidoID,
                ID_Producto: item.id,
                cantidad: item.quantity || 1,
                PrecioVenta: parseInt(item.PrecioVenta.replace(/\./g, '')), // Elimina puntos si el precio contiene miles
                Descuento: 0 // Ajusta la lógica para obtener el descuento si aplica
            };
            console.log('Detalle del pedido:', detalle);

            return fetch(url +"/detailsOrders", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(detalle)
            });
        });

        return Promise.all(detallePromises);
    })
    .then(() => {
        alert("Pedido realizado con éxito.");
        localStorage.removeItem('carrito');
        window.location.href = `/formulario`; // Redirige a una página de confirmación de pedido
    })
    .catch(err => console.log('Error en los detalles del pedido:', err));
}


