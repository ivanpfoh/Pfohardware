// @ts-check
import { defineConfig } from "astro/config";
import buscadores from "./integraciones/buscadores.mjs";

// GitHub Pages publica el repo en https://ivanpfoh.github.io/Pfohardware/
// Las páginas salen como archivos .html (servicios.html, descarga.html...) porque el Optimizador
// abre descarga.html y lee version.json en esas mismas direcciones.
export default defineConfig({
  site: "https://ivanpfoh.github.io",
  base: "/Pfohardware",
  trailingSlash: "ignore",
  build: {
    format: "file",
    assets: "_astro",
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [buscadores({ sitio: "https://ivanpfoh.github.io/Pfohardware/" })],
  vite: {
    build: { cssMinify: "lightningcss" },
  },
});
