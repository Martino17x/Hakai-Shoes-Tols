function limpiarNumero(numero) {
    let limpio = numero.replace(/\D/g, ''); // solo números
  
    if (!limpio.startsWith('549')) {
      limpio = '549' + limpio;
    }
  
    return limpio.slice(0, 13); // máximo 13 dígitos
  }
  
  function generarLink() {
    const numeroInput = document.getElementById("numero");
    const mensajeInput = document.getElementById("mensaje");
    const linkInput = document.getElementById("linkInput");
    const linkContainer = document.getElementById("linkContainer");
  
    if (!numeroInput || !mensajeInput || !linkInput || !linkContainer) return;
  
    const numero = limpiarNumero(numeroInput.value);
    numeroInput.value = numero;
  
    const mensaje = encodeURIComponent(mensajeInput.value);
  
    if (numero.length === 13) {
      const url = `https://wa.me/${numero}?text=${mensaje}`;
      linkInput.value = url;
      linkContainer.style.display = "block";
    } else {
      alert("Número inválido. Asegúrate de ingresar un número válido de Argentina.");
    }
  }
  
  function generarLinkWeb() {
    const numeroInput = document.getElementById("numero");
    const mensajeInput = document.getElementById("mensaje");
    const linkWebInput = document.getElementById("linkWebInput");
    const linkWebContainer = document.getElementById("linkWebContainer");
  
    if (!numeroInput || !mensajeInput || !linkWebInput || !linkWebContainer) return;
  
    const numero = limpiarNumero(numeroInput.value);
    numeroInput.value = numero;
  
    const mensaje = encodeURIComponent(mensajeInput.value);
  
    if (numero.length === 13) {
      const url = `https://web.whatsapp.com/send?phone=${numero}&text=${mensaje}`;
      linkWebInput.value = url;
      linkWebContainer.style.display = "block";
    } else {
      alert("Número inválido. Asegúrate de ingresar un número válido de Argentina.");
    }
  }
  
  function copiarLink(id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.select();
    document.execCommand("copy");
    alert("Link copiado al portapapeles.");
  }
  
  // Autocompletar 549 al cargar la página
  window.addEventListener('DOMContentLoaded', function () {
    const numeroInput = document.getElementById("numero");
    if (numeroInput && numeroInput.value.trim() === "") {
      numeroInput.value = "549";
    }
  });
  