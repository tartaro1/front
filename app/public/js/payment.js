document.addEventListener('DOMContentLoaded', () => {
  const tarjetaCheckbox = document.getElementById('Tarjeta');
  const contraEntregaCheckbox = document.getElementById('ContraEntrega');
  const cardDataDiv = document.querySelector('.card-data');
  const finishButton = document.querySelector('.finish');

  tarjetaCheckbox.addEventListener('change', () => {
    if (tarjetaCheckbox.checked) {
      cardDataDiv.classList.remove('hidden');
      finishButton.textContent = 'Finalizar compra';
      contraEntregaCheckbox.checked = false;
      window.location.href = "/check?user=1"
    } else {
      cardDataDiv.classList.add('hidden');
      finishButton.textContent = 'Siguiente';
    }
  });

  contraEntregaCheckbox.addEventListener('change', () => {
    if (contraEntregaCheckbox.checked) {
      cardDataDiv.classList.add('hidden');
      finishButton.textContent = 'Finalizar compra';
      tarjetaCheckbox.checked = false;
    } else {
      finishButton.textContent = 'Siguiente';
    }
  });

  finishButton.addEventListener('click', (e) => {
    if (!tarjetaCheckbox.checked && !contraEntregaCheckbox.checked) {
      e.preventDefault(); // Previene cualquier comportamiento por defecto del botón
      alert('Debes seleccionar un método de pago para continuar');
      return;
    }
  });
});
