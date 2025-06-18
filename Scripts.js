// Función para abrir y cerrar menú hamburguesa
function toggleMenu(button) {
  const nav = document.getElementById('navMenu');
  const expanded = button.getAttribute('aria-expanded') === 'true' || false;
  button.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('active');
}

// Validación y envío de pedido por WhatsApp
document.getElementById('pedidoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const errorMensaje = document.getElementById('errorMensaje');
  errorMensaje.textContent = '';

  // Obtener valores
  const grandesCantidad = parseInt(document.getElementById('grandesCantidad').value) || 0;
  const chicasCantidad = parseInt(document.getElementById('chicasCantidad').value) || 0;
  const rosquitasCantidad = parseInt(document.getElementById('rosquitasCantidad').value) || 0;
  const panEspanolCantidad = parseInt(document.getElementById('panEspanolCantidad').value) || 0;

  const grandesSabor = document.getElementById('grandesSabor').value;
  const chicasSabor = document.getElementById('chicasSabor').value;

  // Validar mínimos
  if (grandesCantidad > 0 && grandesCantidad < 5) {
    errorMensaje.textContent = 'El mínimo para empanadas grandes es 5 piezas.';
    return;
  }
  if (chicasCantidad > 0 && chicasCantidad < 10) {
    errorMensaje.textContent = 'El mínimo para empanadas chicas es 10 piezas.';
    return;
  }
  if (rosquitasCantidad > 0 && rosquitasCantidad < 10) {
    errorMensaje.textContent = 'El mínimo para rosquitas es 10 piezas.';
    return;
  }
  if (panEspanolCantidad > 0 && panEspanolCantidad < 5) {
    errorMensaje.textContent = 'El mínimo para pan español es 5 piezas.';
    return;
  }

  // Validar que al menos haya pedido
  if (grandesCantidad === 0 && chicasCantidad === 0 && rosquitasCantidad === 0 && panEspanolCantidad === 0) {
    errorMensaje.textContent = 'Por favor, selecciona al menos un producto para pedir.';
    return;
  }

  // Construir mensaje para WhatsApp
  let mensaje = 'Hola! Quiero hacer un pedido:%0A';

  if (grandesCantidad > 0) {
    mensaje += `- ${grandesCantidad} empanadas grandes sabor ${grandesSabor}%0A`;
  }
  if (chicasCantidad > 0) {
    mensaje += `- ${chicasCantidad} empanadas chicas sabor ${chicasSabor}%0A`;
  }
  if (rosquitasCantidad > 0) {
    mensaje += `- ${rosquitasCantidad} rosquitas%0A`;
  }
  if (panEspanolCantidad > 0) {
    mensaje += `- ${panEspanolCantidad} pan español%0A`;
  }

  const urlWhatsApp = `https://wa.me/524445481177?text=${mensaje}`;

  // Abrir WhatsApp en nueva pestaña
  window.open(urlWhatsApp, '_blank');
});
