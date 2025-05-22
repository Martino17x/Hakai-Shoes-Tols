var compraInput = document.getElementById("precioCompra");
var ventaInput = document.getElementById("precioVenta");
var envioInput = document.getElementById("precioEnvio");
var adicionalesInput = document.getElementById("costosAdicionales");
var adicionalesPorcentajeInput = document.getElementById("costosAdicionalesPorcentaje");
var porcentajeVentaDeseadoInput = document.getElementById("porcentajeVentaDeseado");
var actualizandoDesdePorcentaje = false;
compraInput.addEventListener("input", calcularGanancia);
ventaInput.addEventListener("input", function () {
    if (!actualizandoDesdePorcentaje)
        calcularGanancia();
});
envioInput.addEventListener("input", calcularGanancia);
adicionalesInput.addEventListener("input", calcularGanancia);
adicionalesPorcentajeInput.addEventListener("input", calcularGanancia);
porcentajeVentaDeseadoInput.addEventListener("input", function () {
    actualizandoDesdePorcentaje = true;
    calcularGanancia();
    actualizandoDesdePorcentaje = false;
});
function calcularGanancia() {
    var compra = parseFloat(compraInput.value) || 0;
    var venta = parseFloat(ventaInput.value) || 0;
    var envio = parseFloat(envioInput.value) || 0;
    var adicionales = parseFloat(adicionalesInput.value) || 0;
    var adicionalesPorcentaje = parseFloat(adicionalesPorcentajeInput.value) || 0;
    var porcentajeVentaDeseado = parseFloat(porcentajeVentaDeseadoInput.value) || 0;
    var gastoEnvio = envio > 0 ? envio - 0 : 0;
    var costoPorcentual = (adicionalesPorcentaje / 100) * compra;
    var precioFinal = compra + gastoEnvio + adicionales + costoPorcentual;
    var precioVentaPorPorcentaje = 0;
    if (actualizandoDesdePorcentaje && porcentajeVentaDeseado > 0 && porcentajeVentaDeseado < 100) {
        precioVentaPorPorcentaje = precioFinal / (1 - porcentajeVentaDeseado / 100);
        ventaInput.value = precioVentaPorPorcentaje.toFixed(2);
    }
    var ventaReal = parseFloat(ventaInput.value) || 0;
    var gananciaBruta = ventaReal - compra;
    var gananciaNeta = gananciaBruta - gastoEnvio - adicionales - costoPorcentual;
    var margenGanancia = ventaReal > 0 ? (gananciaNeta / ventaReal) * 100 : 0;
    var markup = compra > 0 ? (gananciaNeta / compra) * 100 : 0;
    var precioVentaFinal = ventaReal - gastoEnvio - adicionales - costoPorcentual;
    document.getElementById("gananciaPesos").textContent = gananciaNeta.toFixed(2);
    document.getElementById("gananciaPorcentaje").textContent = margenGanancia.toFixed(2) + "%";
    document.getElementById("markupPorcentaje").textContent = markup.toFixed(2) + "%";
    document.getElementById("precioFinal").textContent = precioFinal.toFixed(2);
    document.getElementById("precioVentaFinal").textContent = precioVentaFinal.toFixed(2);
    document.getElementById("precioVentaPorPorcentaje").textContent = precioVentaPorPorcentaje.toFixed(2);
}
//BOTONES CSS
var btnCotizador = document.querySelector('.btn-cotizador');
if (btnCotizador) {
    btnCotizador.addEventListener('click', mostrarSeccion);
}
function mostrarSeccion() {
    var seccion = document.querySelector('.cotizador-precios');
    if (seccion) {
        seccion.style.display = 'block';
    }
}
