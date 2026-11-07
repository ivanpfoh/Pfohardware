# Motion graphics de la web (HyperFrames)

Estos son los proyectos de [HyperFrames](https://hyperframes.heygen.com/) (HTML que se renderiza a video) que generan los videos de `public/img/motion/`.
La web se compila con Astro y solo publica lo que está en `public/` y `src/`, así que esta carpeta no sale a internet.

| Proyecto | En la web | Qué muestra |
| --- | --- | --- |
| `campo-portada` | Portada, dentro del campo del anillo | El logo PH grande que se achica hasta convertirse en el anillo del programa con su rayo. Su último cuadro es igual a la portada en reposo: ahí la web cambia el video por el anillo que se toca. Mide 3:1 y el anillo ocupa el 70 % del alto, igual que en la web. |
| `hero-optimizador` | Cuadros sueltos en Deshacer, Así funciona y Descarga | El logo PH que se convierte en el Optimizador, toca "Optimizar ahora", el anillo llega al 100 % y queda "Optimización completada". El video entero no está en la web (sirve, por ejemplo, para Instagram). |
| `hero-diagnostico` | Servicio técnico (portada de servicios y sección del inicio) | Un diagnóstico sobre una PC real: barrido, una etiqueta en cada componente ("CPU · OK", sin lecturas inventadas) y "Listo". Se reproduce una vez y queda en el último cuadro. |
| `demo-optimizador` | Así funciona | La grabación de las pantallas reales del programa: clic en "Optimizar ahora", el anillo hasta 100 % y "Deshacer cambios". Se repite sin salto. |

La letra de los videos es la del programa. Como en Windows es Segoe UI, acá se usa Selawik, su versión libre (`assets/fonts`).

## Editar y volver a generar

Requiere Node.js 22 o más nuevo y FFmpeg. La telemetría de HyperFrames se apaga con la variable `HYPERFRAMES_NO_TELEMETRY=1`.

```bash
cd _motion/hero-diagnostico
npx hyperframes preview          # vista previa con recarga
npx hyperframes check            # revisión de la composición
npx hyperframes render --output renders/hero-diagnostico.mp4 --quality delivery
```

Después se comprime para la web (calidad pareja y arranque rápido):

```bash
ffmpeg -i renders/hero-diagnostico.mp4 -an -c:v libx264 -preset veryslow -crf 27 -pix_fmt yuv420p -movflags +faststart ../../public/img/motion/hero-diagnostico.mp4
```

`demo-optimizador` y `hero-optimizador` usan `-crf 28`, y `campo-portada` usa `-crf 30`. Los pósters de `campo-portada` y `hero-diagnostico` (`*-inicio.webp` y `*-final.webp`) son el primer y el último cuadro del video.

Desde la v2.10, el material de `demo-optimizador` y `hero-optimizador` sale de capturas reales del programa: en la carpeta del Optimizador, `py -3.13 scratch/capturas_video_v210.py 1.5` (quedan en `scratch/capturas/video_v210/`). Los pósters del Optimizador salen de esas mismas capturas, no de cuadros del video:

- `hero-optimizador-programa.webp` (también `demo-optimizador-poster.webp`): la pantalla en reposo;
- `hero-optimizador-optimizando.webp`: `anillo/050.png` (61 %);
- `hero-optimizador-final.webp`: la pantalla final;
- `hero-optimizador-inicio.webp` es solo el logo y no cambia.
