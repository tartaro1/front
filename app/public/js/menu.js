document.addEventListener('DOMContentLoaded', (event) => {
    localStorage.clear();
    let url = document.getElementById("url").value
    let link = localStorage.setItem("url", url);
    const menuToggle = document.getElementById('menu-toggle');
    const navCenter = document.getElementById('nav-center');
    const categoriesToggle = document.getElementById('categories-toggle');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    
    menuToggle.addEventListener('click', () => {
        navCenter.classList.toggle('show');
    });
    
    categoriesToggle.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace
        
        // Toggle para mostrar u ocultar el menú desplegable de categorías
        categoriesDropdown.classList.toggle('show-dropdown');
    });
});
