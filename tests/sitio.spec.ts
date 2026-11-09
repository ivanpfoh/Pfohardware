import { expect, test, type Page } from "@playwright/test";

const PAGINAS = ["index.html", "programas.html", "servicios.html", "quiensoy.html", "contacto.html", "descarga.html", "privacidad.html"];
const COMPRAR = "https://script.google.com/macros/s/AKfycbyr9_yR_DE78hONf0mHfDxOg-oL7I5zdVxnt41NdRxakUYWLjaT5GJ92_GQ05ACSTOt/exec?accion=comprar";
const RECUPERAR = "https://script.google.com/macros/s/AKfycbyr9_yR_DE78hONf0mHfDxOg-oL7I5zdVxnt41NdRxakUYWLjaT5GJ92_GQ05ACSTOt/exec?accion=recuperar";

// Abre la página juntando todo lo que salga mal: errores y avisos de consola, recursos que fallan o dan 4xx/5xx
async function abrir(page: Page, ruta: string): Promise<string[]> {
  const problemas: string[] = [];
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") problemas.push(`consola ${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => problemas.push(`error JS: ${e.message}`));
  page.on("requestfailed", (r) => {
    // Un video que el navegador corta a propósito (se pausa o se reemplaza) no es un error
    if (!/\.mp4/.test(r.url())) problemas.push(`falló: ${r.url()} ${r.failure()?.errorText ?? ""}`);
  });
  page.on("response", (r) => { if (r.status() >= 400) problemas.push(`HTTP ${r.status()}: ${r.url()}`); });
  await page.goto(ruta, { waitUntil: "networkidle" });
  return problemas;
}

async function recorrer(page: Page): Promise<void> {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < alto; y += 600) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(800);
}

for (const ruta of PAGINAS) {
  test(`${ruta}: sin errores, sin recursos faltantes y sin desplazamiento de costado`, async ({ page }) => {
    const problemas = await abrir(page, ruta);
    await recorrer(page);
    await page.evaluate(() => window.scrollTo(600, window.scrollY));
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => window.scrollX), "la página se desplaza de costado").toBe(0);
    expect(problemas, problemas.join("\n")).toEqual([]);
  });

  test(`${ruta}: todo el contenido queda visible`, async ({ page }) => {
    await abrir(page, ruta);
    await recorrer(page);
    const ocultos = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("[data-entra], [data-titulo] .linea > span")]
        .filter((el) => getComputedStyle(el).opacity === "0")
        .map((el) => el.textContent?.trim().slice(0, 40)));
    expect(ocultos).toEqual([]);
  });
}

test("los links de compra y de recuperación son los de siempre", async ({ page }) => {
  await page.goto("index.html");
  expect(await page.locator(`a[href="${COMPRAR}"]`).count()).toBeGreaterThan(0);
  await page.goto("descarga.html");
  await expect(page.locator(`main a[href="${RECUPERAR}"]`).first()).toBeVisible();
  await expect(page.locator(`main a[href="${COMPRAR}"]`).first()).toBeVisible();
  const html = await page.content();
  expect(html.toLowerCase()).not.toContain("dropbox");
});

test("Más herramientas: cada herramienta muestra su pantalla del programa", async ({ page }) => {
  await page.goto("index.html#herramientas");
  const activa = page.locator("#herramientas [data-pantalla].activa");
  await expect(activa).toHaveAttribute("data-pantalla", "lista");
  for (const id of ["discos", "salud", "bateria", "mejorar"]) {
    const boton = page.locator(`[data-herramienta="${id}"]`);
    await boton.click();
    await expect(activa).toHaveAttribute("data-pantalla", id);
    await expect(boton).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#herramientas [data-pantalla].activa")).toHaveCount(1);
  }
});

test("descarga muestra el hash del zip y version.json responde", async ({ page, request }) => {
  await page.goto("descarga.html");
  await expect(page.locator("[data-hash]")).toHaveText(/^[0-9A-F]{64}$/);
  const r = await request.get("version.json");
  expect(r.ok()).toBe(true);
  expect(await r.json()).toHaveProperty("version");
});

test("los enlaces internos llevan a páginas que existen", async ({ page, request }) => {
  const vistos = new Set<string>();
  for (const ruta of PAGINAS) {
    await page.goto(ruta);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const h of hrefs) {
      const url = new URL(h);
      if (url.host !== "localhost:4321") continue;
      const sinHash = url.origin + url.pathname;
      if (vistos.has(sinHash)) continue;
      vistos.add(sinHash);
      const r = await request.get(sinHash);
      expect(r.status(), sinHash).toBeLessThan(400);
    }
  }
});

test("el menú del celular ocupa la pantalla y se cierra con Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo en celular");
  await page.goto("index.html");
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(300);
  await page.mouse.wheel(0, -200);
  await page.waitForTimeout(500);
  await page.locator("[data-menu-boton]").click();
  await page.waitForTimeout(800);
  const caja = await page.locator("[data-menu]").boundingBox();
  const vista = page.viewportSize()!;
  expect(caja?.width).toBe(vista.width);
  expect(caja?.height).toBe(vista.height);
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-menu-boton]")).toHaveAttribute("aria-expanded", "false");
});
