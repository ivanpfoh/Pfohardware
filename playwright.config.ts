import { defineConfig, devices } from "@playwright/test";

// Pruebas de la web compilada (astro build + astro preview), con el Chrome instalado en la PC.
// npm test            → corre todo
// npm run test:ui     → modo visual de Playwright
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4321/Pfohardware/",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "escritorio", use: { viewport: { width: 1440, height: 900 } } },
    { name: "celular", use: { ...devices["Pixel 7"], channel: "chrome" } },
    { name: "sin-movimiento", use: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } },
  ],
  webServer: {
    command: "npx astro build && npx astro preview --port 4321",
    url: "http://localhost:4321/Pfohardware/",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
