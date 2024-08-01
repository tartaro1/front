document.addEventListener("DOMContentLoaded", () => {
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
          fetch(`http://backend:9200/categories/${id}`, {
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
        const descripcionElement = document.querySelector(".descripcion");
        const estadoElement = document.querySelector(".estado");
  
      if (nombreElement && descripcionElement && estadoElement) {
        const nombre = nombreElement.value;
        const direccion = descripcionElement.value;
        const estado = estadoElement.value;
  
        fetch("http://backend:9200/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Nombre: nombre,
            Descripcion: direccion,
            EstadoCategoria: estado
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
        const descripcionElement = document.querySelector(".descripcionEdit");
        const estadoElement = document.querySelector(".estadoEdit");
        fetch(`http://backend:9200/categories/${id}`)
          .then(res => res.json())
          .then(userArray => {
            if (userArray && userArray.length > 0) {
              const user = userArray[0];
              if (nombreElement && descripcionElement && estadoElement) {
                nombreElement.value = user.Nombre;
                descripcionElement.value = user.Descripcion;
                estadoElement.value = user.EstadoCategoria;
                const saveEditButton = document.querySelector(".btn-save-edit");
                saveEditButton.addEventListener("click", () => {
                  if (nombreElement && descripcionElement && estadoElement) {
                    const nombre = nombreElement.value;
                    const direccion = descripcionElement.value;
                    const estado = estadoElement.value;
                    fetch(`http://backend:9200/categories/${id}`, {
                      method: 'PUT',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        Nombre: nombre,
                        Descripcion: direccion,
                        EstadoCategoria: estado
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
    // const infoBtn = document.querySelectorAll(".info-user-btn");
    // infoBtn.forEach(btn => {
    //   btn.addEventListener("click", (e) => {
    //     const container = e.target.closest(".user-list-item");
    //     const tbody = document.querySelector(".info")
    //     tbody.innerHTML = ""
    //     const userId = container.querySelector(".id").innerText;
    //     fetch(`https://ms-backend-tartaro.onrender.com/orders?dealerID=${userId}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         data.forEach((order) => {
    //           tbody.innerHTML +=
    //             `
    //         <tr class="user-list-item">
    //           <td class="idPedido">
    //           ${order.ID_Pedido}
    //           </td>
    //           <td class="estadoPedido">
    //           ${order.EstadoPedido}
    //           </td>
    //           <td class="direccionPedido">
    //           ${order.Direccion}
    //           </td>
    //           <td class="ventaPedido">
    //           ${order.PrecioVenta}
    //           </td>
    //           <td class="repartidorPedido">
    //           ${order.ID_Repartidor}
    //           </td>
    //           <td class="fechaPedido">
    //           ${order.FechaPedido}
    //           </td>
    //         </tr>
    //         `
    //         })
    //       })
    //   })
    // })
  });
  