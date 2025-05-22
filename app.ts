const compraInput = document.getElementById("precioCompra") as HTMLInputElement;
const ventaInput = document.getElementById("precioVenta") as HTMLInputElement;
const envioInput = document.getElementById("precioEnvio") as HTMLInputElement;
const adicionalesInput = document.getElementById("costosAdicionales") as HTMLInputElement;
const adicionalesPorcentajeInput = document.getElementById("costosAdicionalesPorcentaje") as HTMLInputElement;
const porcentajeVentaDeseadoInput = document.getElementById("porcentajeVentaDeseado") as HTMLInputElement;

let actualizandoDesdePorcentaje = false;

compraInput.addEventListener("input", calcularGanancia);
ventaInput.addEventListener("input", () => {
  if (!actualizandoDesdePorcentaje) calcularGanancia();
});
envioInput.addEventListener("input", calcularGanancia);
adicionalesInput.addEventListener("input", calcularGanancia);
adicionalesPorcentajeInput.addEventListener("input", calcularGanancia);
porcentajeVentaDeseadoInput.addEventListener("input", () => {
  actualizandoDesdePorcentaje = true;
  calcularGanancia();
  actualizandoDesdePorcentaje = false;
});

function calcularGanancia(): void {
  const compra = parseFloat(compraInput.value) || 0;
  const venta = parseFloat(ventaInput.value) || 0;
  const envio = parseFloat(envioInput.value) || 0;
  const adicionales = parseFloat(adicionalesInput.value) || 0;
  const adicionalesPorcentaje = parseFloat(adicionalesPorcentajeInput.value) || 0;
  const porcentajeVentaDeseado = parseFloat(porcentajeVentaDeseadoInput.value) || 0;

  const gastoEnvio = envio > 0 ? envio - 0 : 0;
  const costoPorcentual = (adicionalesPorcentaje / 100) * compra;

  const precioFinal = compra + gastoEnvio + adicionales + costoPorcentual;

  let precioVentaPorPorcentaje = 0;

  if (actualizandoDesdePorcentaje && porcentajeVentaDeseado > 0 && porcentajeVentaDeseado < 100) {
    precioVentaPorPorcentaje = precioFinal / (1 - porcentajeVentaDeseado / 100);
    ventaInput.value = precioVentaPorPorcentaje.toFixed(2);
  }

  const ventaReal = parseFloat(ventaInput.value) || 0;
  const gananciaBruta = ventaReal - compra;
  const gananciaNeta = gananciaBruta - gastoEnvio - adicionales - costoPorcentual;

  const margenGanancia = ventaReal > 0 ? (gananciaNeta / ventaReal) * 100 : 0;
  const markup = compra > 0 ? (gananciaNeta / compra) * 100 : 0;

  const precioVentaFinal = ventaReal - gastoEnvio - adicionales - costoPorcentual;

  

  (document.getElementById("gananciaPesos") as HTMLElement).textContent = gananciaNeta.toFixed(2);
  (document.getElementById("gananciaPorcentaje") as HTMLElement).textContent = margenGanancia.toFixed(2) + "%";
  (document.getElementById("markupPorcentaje") as HTMLElement).textContent = markup.toFixed(2) + "%";
  (document.getElementById("precioFinal") as HTMLElement).textContent = precioFinal.toFixed(2);
  (document.getElementById("precioVentaFinal") as HTMLElement).textContent = precioVentaFinal.toFixed(2);
  (document.getElementById("precioVentaPorPorcentaje") as HTMLElement).textContent = precioVentaPorPorcentaje.toFixed(2);
}

//BOTONES CSS

const btnCotizador = document.querySelector('.btn-cotizador') as HTMLButtonElement | null;
if (btnCotizador) {
  btnCotizador.addEventListener('click', mostrarSeccion);
}

function mostrarSeccion(): void {
  const seccion = document.querySelector('.cotizador-precios') as HTMLElement | null;
  if (seccion) {
    seccion.style.display = 'block';
  }
}
