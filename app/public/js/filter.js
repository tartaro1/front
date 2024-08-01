document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.getElementById('lista-productos');

    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectCat = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
                .map(cb => cb.dataset.category);

            if (selectCat.length > 0) {
                fetchProducts(selectCat);
            } else {
                resetProductList();
            }
        });
    });

    // Añadir event listener a las subcategorías de "Tendencias"
    document.querySelectorAll('.subcategory-trend').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectCat = Array.from(document.querySelectorAll('.subcategory-trend:checked'))
                .map(cb => cb.dataset.category);

            if (selectCat.length > 0) {
                fetchProductsMost();
            } else {
                resetProductList();
            }
        });
    });

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dropdownContent = toggle.nextElementSibling;
            dropdownContent.classList.toggle('hidden');
            const icon = toggle.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    function fetchProducts(categories) {
        const query = categories.map(cat => `category=${cat}`).join('&');
        const url = `http://localhost:9200/products?${query}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => updateProductList(data))
            .catch(error => console.error('Error fetching products:', error));
    }

    function fetchProductsMost() {
        const url = `http://localhost:9200/products/most`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => updateProductList(data))
            .catch(error => console.error('Error fetching products:', error));
    }

    function updateProductList(products) {
        listaProductos.innerHTML = ''; // Limpiar la lista actual de productos

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white p-4 rounded-lg shadow-lg';
            productCard.setAttribute('data-id', product.id);
            productCard.innerHTML = `
                <p style="display:none;" class="id">${product.id}</p>
                <img src="${product.imagen}" alt="${product.NombreProducto}" class="w-full h-48 object-cover rounded-lg mb-4">
                <h3 class="text-lg font-bold mb-2">${product.NombreProducto}</h3>
                <p class="text-gray-700 mb-2">${product.Descripcion}</p>
                <p class="text-orange-600 font-bold mb-4">$${product.PrecioVenta}</p>
                <div class="flex space-x-2">
                    <a class="ver bg-orange-600 text-white py-2 px-4 rounded-lg">Ver</a>
                    <a class="bg-green-600 text-white py-2 px-4 rounded-lg">Agregar al carrito</a>
                </div>
            `;
            listaProductos.appendChild(productCard);

            // Añadir evento click al botón "Ver"
            const btnVer = productCard.querySelector(".ver"); // Usar querySelector en lugar de querySelectorAll
            btnVer.addEventListener("click", (event) => {
                event.preventDefault(); // Evitar que el enlace siga la URL

                const productId = productCard.querySelector(".id").innerHTML;
                window.location.href = `http://localhost:3000/producto/${productId}`;
            });
        });
    }

    function resetProductList() {
        const url = `http://localhost:9200/products`;

        fetch(url)
            .then(response => response.json())
            .then(data => updateProductList(data))
            .catch(error => console.error('Error fetching products:', error));
    }

});
