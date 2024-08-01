document.addEventListener("DOMContentLoaded", () => {
  let url = localStorage.getItem("url")
    const deleteButtons = document.querySelectorAll(".delete-user-btn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const userListItem = e.target.closest('.user-list-item');
        const userName = userListItem.querySelector('.nombre').innerText;
        const modalTitle = document.querySelector("#staticBackdropLabel");
        modalTitle.innerText = `¿Deseas eliminar a "${userName}"?`;
        const id = userListItem.querySelector('.id').innerText;
        const modalAcceptButton = document.querySelector(".accept");
        modalAcceptButton.addEventListener("click", () => {
          fetch(url +`/providers/${id}`, {
            method: 'DELETE'
          })
            .then(res => {
              if (res.ok) {
                userListItem.remove();
              }
            })
            .catch(error => console.error('Error deleting categorie:', error));
        }, { once: true });
      });
    });
    const savebtn = document.querySelector(".btn-save");
    savebtn.addEventListener("click", () => {
        const nombreElement = document.querySelector(".nombre");
        const direccionElement = document.querySelector(".direccionEdit");
        const telefonoElement = document.querySelector(".telefonoEdit");
        const correoElement = document.querySelector(".correoEdit");
      if (nombreElement && direccionElement && telefonoElement && correoElement) {
        const nombre = nombreElement.value;
        const direccion = direccionElement.value;
        const telefono = parseInt(telefonoElement.value);
        const correo = correoElement.value;
  
        fetch(url + "/providers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo
          })
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(data => {
            console.log("Success:", data);
            const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleAddUserModal'));
            modal.hide();
            location.reload();
          })
          .catch(error => {
            console.error("Error:", error);
          });
      } else {
        console.error("One or more input fields are missing");
      }
    });
  
    const editButtons = document.querySelectorAll(".edit-user-btn");
    editButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const userListItem = e.target.closest('.user-list-item');
        const id = userListItem.querySelector('.id').innerText;
        const nombreElement = document.querySelector(".nombreEdit");
        const direccionElement = document.querySelector(".direccionEdit");
        const telefonoElement = document.querySelector(".telefonoEdit");
        const correoElement = document.querySelector(".correoEdit");
        fetch(url +`/providers/${id}`)
          .then(res => res.json())
          .then(userArray => {
            if (userArray && userArray.length > 0) {
              const user = userArray[0];
              if (nombreElement && direccionElement && telefonoElement && correoElement) {
                nombreElement.value = user.Nombre;
                direccionElement.value = user.Direccion;
                telefonoElement.value = user.Telefono;
                correoElement.value = user.Correo;
                const saveEditButton = document.querySelector(".btn-save-edit");
                saveEditButton.addEventListener("click", () => {
                  if (nombreElement && direccionElement && telefonoElement && correoElement) {
                    const nombre = nombreElement.value;
                    const direccion = direccionElement.value;
                    const telefono = parseInt(telefonoElement.value);
                    const correo = correoElement.value;
                    fetch(url +`/providers/${id}`, {
                      method: 'PUT',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        Nombre: nombre,
                        Direccion: direccion,
                        Telefono: telefono,
                        Correo: correo
                    })
                    })
                      .then(res => {
                        if (res.ok) {
                          return res.json();
                        } else {
                          throw new Error('Error updating user');
                        }
                      })
                      .then(data => {
                        console.log("User updated successfully:", data);
                        const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleEditUserModal'));
                        modal.hide();
                        location.reload();
                      })
                      .catch(error => {
                        console.error('Error:', error);
                      });
                  }
                }, { once: true });
              }
            } else {
              console.error("No user data found for the provided ID");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    });
    const infoBtn = document.querySelectorAll(".info-user-btn");
infoBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const container = e.target.closest(".user-list-item");
    const userId = container.querySelector(".id").innerText;
    fetch(url +`/detailsOrders?idProvider=${userId}`)
      .then(response => response.json())
      .then(data => {
        let tableContent = `
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cantidad</th>
                <th>Nombre Producto</th>
              </tr>
            </thead>
            <tbody>
        `;

        data.forEach((order) => {
          tableContent += `
            <tr>
              <td>${order.ID_Pedido}</td>
              <td>${order.Cantidad}</td>
              <td>${order.NombreProducto}</td>
            </tr>
          `;
        });

        tableContent += `</tbody></table>`;

        // Crear un contenedor temporal para la tabla
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = tableContent;
        document.body.appendChild(tempContainer);

        // Generar el PDF
        html2canvas(tempContainer, {
          onrendered: function (canvas) {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jspdf.jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10);
            pdf.save("reporte.pdf");
            document.body.removeChild(tempContainer);
          }
        });
      })
      .catch(err => console.error(err));
  });
});

  });
  