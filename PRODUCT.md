# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (chosen by Iván on 2026-10-30), static output deployed to GitHub Pages through GitHub Actions. The published URLs keep their `.html` names (`index.html`, `servicios.html`, `quiensoy.html`, `contacto.html`, `descarga.html`) because the Optimizer program and old links point at them.

## Users

- **Primary:** people in Argentina with a Windows 11 PC that feels slow, or who want more performance in games, and who would rather fix it themselves with one click than take the PC to a technician. They pay once, with Mercado Pago.
- **Secondary:** people in Capital Federal (Recoleta and around) with a PC, notebook or console that needs a diagnosis, cleaning, upgrade, repair, formatting or remote support. They want a clear diagnosis and a quote before paying for anything.
- **Returning buyers:** they need their key or the download again. The Optimizer itself opens `descarga.html` from its "new version" notice.

## Product Purpose

The site's first job is to sell the **Optimizador de Sistema PfoHardware** ($10.000 ARS, single payment). Its second job is to get quote requests for Iván's technical service. Its third job is to let buyers recover their key and download. Success means a visitor understands what the Optimizer does and that it is safe, then buys it. Service visitors should find out how to ask for a quote.

## Positioning

The Optimizer is made, used and personally supported by the same technician who repairs PCs: Iván Pfoh, PfoHardware. It is reversible: before optimizing it saves the configuration and, when Windows allows it, creates a restore point, and "Deshacer cambios" puts everything back. It never empties the Recycle Bin without asking and never turns off the antivirus, the firewall or Windows Update. It costs one payment, with no subscription. The technical service is one person who explains the problem and the cost before touching anything.

## Operating Context

- Buying and key recovery go through the Apps Script URL (`.../exec?accion=comprar` and `?accion=recuperar`), which hands off to Mercado Pago. After payment, the key and the download appear on screen and arrive by email.
- One licence per computer, linked to it, recoverable with the Mercado Pago operation number.
- Right of withdrawal: 10 calendar days (Ley 24.240), through the "Botón de arrepentimiento" (WhatsApp link). If a refund is requested, the licence is deactivated.
- Contact for the service: email (ivanpfohh85@gmail.com) and Instagram (@pfohardware). WhatsApp is used only for the withdrawal button (Iván's decision, 2026-10-30).
- Two modes in the program: "Optimización completa" and "Solo juegos". The second one also sets an NVIDIA or Intel graphics card to maximum performance, without touching startup programs or privacy.
- Requirements: Windows 11 (64-bit), any Intel or AMD processor, 2 GB of RAM or more, administrator permission.
- Windows SmartScreen may warn on first run because the program has no commercial code signature; the FAQ explains "Más información" → "Ejecutar de todas formas".

## Capabilities and Constraints

- `version.json` (`{"version": "vX.Y.Z"}`) must stay at the site root: the Optimizer reads it to show the "new version" notice. It is bumped only when the new zip is already published.
- `descarga.html` must stay at that URL. It shows the SHA-256 of the official zip, updated on every build.
- The Dropbox download link is for buyers only and never appears on the site.
- No invented data: no performance numbers, benchmarks, customer counts, reviews or testimonials.
- The site never reveals which concrete settings the Optimizer changes.
- "Reducir movimiento" (prefers-reduced-motion) is respected, and the site stays light on phones.
- HyperFrames motion graphics are part of the site. Their sources live in `_motion/` and the compressed videos in `img/motion/`.

## Brand Commitments

- Name: PfoHardware. Founder: Iván Pfoh, Técnico Superior en Análisis de Sistemas, studying Ciencia de Datos e IA at UADE.
- Logo: "PH" in slanted tiles. Iván loves it, and it stays the protagonist of the home page's opening (the HyperFrames video starts with it big).
- Palette, the same as the program: gradient #00F5A0 → #1FDDF5, ground #05080A, panel #0B1114, border #17262A.
- Voice: Rioplatense Spanish, first person (Iván speaking), direct and plain, honest about when a repair is not worth it.
- Typeface: the program's own, Segoe UI Variable, with self-hosted Selawik where Windows fonts are missing (decided 2026-10-31, because Iván wants the site to look like the program). Before that, the site used Manrope and Space Grotesk.

## Evidence on Hand

- Real photos of jobs: `img/trabajos/` (9 photos, including a before/after cleaning pair).
- Certificates: Google Cybersecurity (2025), Google IT Support (2025), Informatic Training Center hardware diagnosis (2018) in `img/certificados/`.
- Real screens of the Optimizer: `img/optimizador-app.webp` and the UI captures in `_motion/demo-optimizador/assets/`.
- HyperFrames videos: `img/motion/hero-diagnostico.mp4` (a diagnosis on a real PC that opens with the PH logo) and `img/motion/demo-optimizador.mp4` (the real program: "Optimizar ahora", the ring to 100 %, "Deshacer cambios").
- Iván's own quote about why he made the Optimizer, and Instagram @pfohardware.
- Absent: testimonials, reviews, customer numbers, benchmarks, a photo of Iván and a street address (only "Recoleta, Capital Federal"). None of these may be invented.

## Product Principles

1. Show, don't promise: real screens of the program and real photos of real work instead of claims and numbers.
2. Safety is the selling point: reversible, nothing turned off behind your back, a person who answers.
3. Buying and recovering are always one tap away, and the terms are written plainly.
4. Say what the program does in everyday words, never which settings it changes.
5. One person, in first person: Iván is the brand's voice and its support.

## Accessibility & Inclusion

Respect prefers-reduced-motion (motion becomes still, videos show their final frame or controls). Stay light and smooth on mid-range Android phones. Keyboard access and visible focus throughout.
