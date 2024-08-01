const signup = document.querySelector(".signup");
let url = localStorage.getItem("url")

signup.addEventListener("click", (e) => {
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const celular = document.querySelector("#celular").value;
    const cedula = document.querySelector("#cedula").value;
    const direccion = document.querySelector("#direccion").value;
    const correo = document.querySelector("#correo").value;
    const contrasena = document.querySelector("#contrasena").value;

    if (nombre.length <= 0) {
        alertify.error("Debes poner un nombre");
        return;
    }
    // Validación del número de celular
    if (celular.length !== 10 || isNaN(celular)) {
        alertify.error("El número de celular debe tener exactamente 10 dígitos");
        return;
    }

    // Validación de la cédula
    if (cedula.length < 8 || cedula.length > 10 || isNaN(cedula)) {
        alertify.error("La cédula debe tener entre 8 y 10 dígitos");
        return;
    }

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alertify.error("El correo electrónico no es válido");
        return;
    }

    // Validación de la contraseña
    if (contrasena.length < 8) {
        alertify.error("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    localStorage.setItem("nombre", nombre);

    fetch(url +"/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            Nombre: nombre,
            Celular: celular,
            Cedula: parseInt(cedula),
            Direccion: direccion,
            Correo: correo,
            Contrasena: contrasena,
            ID_Rol: 1
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alertify.success("Registro Exitoso");
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);
    })
    .catch(err => {
        alertify.error("Ocurrió un error al registrar");
        console.error(err);
    });
});
