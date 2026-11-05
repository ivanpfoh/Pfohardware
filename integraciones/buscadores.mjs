// Después de compilar, prepara la web para Google y para los asistentes de IA:
// - arma sitemap.xml con todas las páginas que se pueden indexar (las que no tienen "noindex");
// - suma los datos de preguntas frecuentes (FAQPage) a cada página que tenga preguntas,
//   leídos de las mismas preguntas que se ven en la página, para que nunca queden distintos.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const sinEtiquetas = (html) =>
  html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim();

export default function buscadores({ sitio }) {
  return {
    name: "pfohardware-buscadores",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const carpeta = fileURLToPath(dir);
        const paginas = (await readdir(carpeta)).filter((f) => f.endsWith(".html") && f !== "404.html" && !/^google[0-9a-f]+.html$/.test(f)).sort();
        const urls = [];
        for (const archivo of paginas) {
          const ruta = join(carpeta, archivo);
          let html = await readFile(ruta, "utf8");
          if (/<meta name="robots" content="noindex/.test(html)) continue;
          urls.push(sitio + (archivo === "index.html" ? "" : archivo));

          const preguntas = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>\s*<div class="faq-cuerpo[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/details>/g)]
            .map(([, q, a]) => ({ "@type": "Question", name: sinEtiquetas(q), acceptedAnswer: { "@type": "Answer", text: sinEtiquetas(a) } }));
          if (preguntas.length) {
            const datos = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: preguntas };
            html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(datos).replace(/</g, "\\u003c")}</script></head>`);
            await writeFile(ruta, html);
          }
        }
        const hoy = new Date().toISOString().slice(0, 10);
        const mapa = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u}</loc><lastmod>${hoy}</lastmod></url>`)
          .join("\n")}\n</urlset>\n`;
        await writeFile(join(carpeta, "sitemap.xml"), mapa);
      },
    },
  };
}
