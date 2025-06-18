// Función para abrir/cerrar menú hamburguesa
function toggleMenu(button) {
  const nav = document.getElementById('navMenu');
  const expanded = button.getAttribute('aria-expanded') === 'true' || false;
  button.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('active');
}

// Manejo del formulario de pedido por WhatsApp
document.getElementById('pedidoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const errorMensaje = document.getElementById('errorMensaje');
  errorMensaje.textContent = '';

  // Obtener valores
  const grandesCantidad = parseInt(document.getElementById('grandesCantidad').value) || 0;
  const grandesSabor = document.getElementById('grandesSabor').value;

  const chicasCantidad = parseInt(document.getElementById('chicasCantidad').value) || 0;
  const chicasSabor = document.getElementById('chicasSabor').value;

  const rosquitasCantidad = parseInt(document.getElementById('rosquitasCantidad').value) || 0;
  const panEspanolCantidad = parseInt(document.getElementById('panEspanolCantidad').value) || 0;

  // Validar mínimos
  if (grandesCantidad > 0 && grandesCantidad < 5) {
    errorMensaje.textContent = 'Para empanadas grandes, el mínimo es 5 piezas.';
    return;
  }
  if (chicasCantidad > 0 && chicasCantidad < 10) {
    errorMensaje.textContent = 'Para empanadas chicas, el mínimo es 10 piezas.';
    return;
  }
  if (rosquitasCantidad > 0 && rosquitasCantidad < 10) {
    errorMensaje.textContent = 'Para rosquitas, el mínimo es 10 piezas.';
    return;
  }
  if (panEspanolCantidad > 0 && panEspanolCantidad < 5) {
    errorMensaje.textContent = 'Para pan español, el mínimo es 5 piezas.';
    return;
  }

  // Al menos un producto debe pedirse
  if (grandesCantidad + chicasCantidad + rosquitasCantidad + panEspanolCantidad === 0) {
    errorMensaje.textContent = 'Por favor, selecciona al menos una cantidad para hacer tu pedido.';
    return;
  }

  // Crear mensaje WhatsApp
  let mensaje = 'Hola! Quiero hacer un pedido:%0A';

  if (grandesCantidad > 0) {
    mensaje += `- Empanadas grandes: ${grandesCantidad} pieza(s) de sabor ${grandesSabor}%0A`;
  }
  if (chicasCantidad > 0) {
    mensaje += `- Empanadas chicas: ${chicasCantidad} pieza(s) de sabor ${chicasSabor}%0A`;
  }
  if (rosquitasCantidad > 0) {
    mensaje += `- Rosquitas: ${rosquitasCantidad} pieza(s)%0A`;
  }
  if (panEspanolCantidad > 0) {
    mensaje += `- Pan español: ${panEspanolCantidad} pieza(s)%0A`;
  }

  // URL WhatsApp con mensaje
  const url = `https://wa.me/524445481177?text=${mensaje}`;

  // Abrir WhatsApp en nueva pestaña
  window.open(url, '_blank');
});
