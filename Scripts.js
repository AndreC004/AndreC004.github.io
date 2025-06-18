// Función para alternar menú hamburguesa
function toggleMenu(button) {
  const nav = document.getElementById('navMenu');
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('active');
}

// Validación y envío del formulario por WhatsApp
document.getElementById('pedidoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const errorMensaje = document.getElementById('errorMensaje');
  errorMensaje.textContent = '';

  // Obtener valores del formulario
  const grandesCantidad = parseInt(document.getElementById('grandesCantidad').value) || 0;
  const grandesSabor = document.getElementById('grandesSabor').value;

  const chicasCantidad = parseInt(document.getElementById('chicasCantidad').value) || 0;
  const chicasSabor = document.getElementById('chicasSabor').value;

  const rosquitasCantidad = parseInt(document.getElementById('rosquitasCantidad').value) || 0;
  const panEspanolCantidad = parseInt(document.getElementById('panEspanolCantidad').value) || 0;

  // Validar mínimos
  let errores = [];

  if (grandesCantidad > 0 && grandesCantidad < 5) errores.push('Empanadas grandes mínimo 5 piezas.');
  if (chicasCantidad > 0 && chicasCantidad < 10) errores.push('Empanadas chicas mínimo 10 piezas.');
  if (rosquitasCantidad > 0 && rosquitasCantidad < 10) errores.push('Rosquitas mínimo 10 piezas.');
  if (panEspanolCantidad > 0 && panEspanolCantidad < 5) errores.push('Pan español mínimo 5 piezas.');

  // Validar que haya pedido mínimo en total
  if (
    grandesCantidad === 0 &&
    chicasCantidad === 0 &&
    rosquitasCantidad === 0 &&
    panEspanolCantidad === 0
  ) {
    errores.push('Por favor, selecciona al menos una cantidad para hacer un pedido.');
  }

  if (errores.length > 0) {
    errorMensaje.textContent = errores.join(' ');
    return;
  }

  // Crear mensaje para WhatsApp
  let mensaje = 'Hola! Quiero hacer un pedido:%0A';

  if (grandesCantidad > 0)
    mensaje += `- Empanadas grandes: ${grandesCantidad} (Sabor: ${grandesSabor})%0A`;
  if (chicasCantidad > 0)
    mensaje += `- Empanadas chicas: ${chicasCantidad} (Sabor: ${chicasSabor})%0A`;
  if (rosquitasCantidad > 0)
    mensaje += `- Rosquitas: ${rosquitasCantidad}%0A`;
  if (panEspanolCantidad > 0)
    mensaje += `- Pan español: ${panEspanolCantidad}%0A`;

  // Abrir WhatsApp con mensaje
  const telefono = '524445481177'; // Cambia si es necesario
  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(url, '_blank');
});
