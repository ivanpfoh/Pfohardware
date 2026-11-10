// Datos que se repiten en toda la web. Los links de compra y recuperación son los de Apps Script:
// no cambian. El link de descarga del Optimizador (Dropbox) es solo para compradores y nunca va acá.
// El Organizador de Materias sí se descarga directo desde la web: su link público es este.
export const DESCARGA_ORGANIZADOR =
  "https://www.dropbox.com/scl/fi/72s8ax5et3aolqlng1pur/PfoHardware-Organizador-3.0.0.zip?rlkey=691n5kh5enq1dx5rc6q0ik6gs&st=xocukyn8&e=1&dl=1";
export const APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyr9_yR_DE78hONf0mHfDxOg-oL7I5zdVxnt41NdRxakUYWLjaT5GJ92_GQ05ACSTOt/exec";
export const COMPRAR = `${APPS_SCRIPT}?accion=comprar`;
export const RECUPERAR = `${APPS_SCRIPT}?accion=recuperar`;
export const ARREPENTIMIENTO =
  "https://wa.me/5492974299737?text=Hola!%20Quiero%20ejercer%20el%20bot%C3%B3n%20de%20arrepentimiento%20de%20mi%20compra%20del%20optimizador.%20Mi%20n%C3%BAmero%20de%20operaci%C3%B3n%20es%3A%20";
export const EMAIL = "ivanpfohh85@gmail.com";
export const INSTAGRAM = "https://instagram.com/pfohardware";
export const GITHUB = "https://github.com/ivanpfoh";
export const PRECIO = "$10.000";
export const SITIO = "https://ivanpfoh.github.io/Pfohardware/";

// Mail con una guía para la consulta del servicio técnico
export const MAIL_CONSULTA = `mailto:${EMAIL}?subject=${encodeURIComponent("Consulta desde la web")}&body=${encodeURIComponent(
  "Hola Iván,\n\nEquipo (PC, notebook o consola) y modelo:\nQué le pasa y desde cuándo:\n\nGracias.",
)}`;
