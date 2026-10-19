# Animation plans — Exotik Zoo (cuidados/ + mundo-exotico/)

Generados por `improve-animations` a partir de la auditoría del 2026-07-12, sobre el commit `8971a12` (branch `feature/luciana`). Alcance: las 23 páginas de `cuidados/` y `mundo-exotico/`. `index.html`, `tienda/`, `nosotros.html`, `contacto.html` son del branch de Miguel — fuera de alcance.

| # | Título | Severidad | Categoría | Status |
| --- | --- | --- | --- | --- |
| [001](001-fix-transition-all.md) | Reemplazar `transition-all` por propiedades específicas | MEDIUM | Performance | DONE |
| [002](002-add-scroll-reveal.md) | Replicar el scroll-reveal de `index.html` | MEDIUM | Cohesión / Missed opportunity | DONE |
| [003](003-consolidate-hover-zoom-duration.md) | Consolidar duración del zoom de imagen a 300ms | LOW-MEDIUM | Cohesión / tokens | DONE |
| [004](004-reduced-motion-support.md) | Soportar `prefers-reduced-motion` | MEDIUM | Accesibilidad | DONE |

## Orden de ejecución recomendado

1. **001** y **003** son independientes entre sí y de los demás — pueden ejecutarse en cualquier momento, incluso en paralelo.
2. **002** es independiente de 001 y 003 (no toca las mismas líneas), pero **debe ejecutarse antes que 004** — el plan 004 edita el `<script>` de reveal que 002 crea.
3. **004** depende de 002. No ejecutar 004 en un archivo donde 002 no haya corrido todavía.

Orden sugerido: **001 → 003 → 002 → 004** (o 001/003 en paralelo, luego 002, luego 004).

## Notas

- Los 4 planes son puramente aditivos/correctivos sobre clases de Tailwind y un `<script>` nuevo — ninguno cambia estructura visual, copy, ni imágenes.
- Ningún plan toca `index.html` ni archivos del branch de Miguel, aunque algunos hallazgos (falta de `prefers-reduced-motion`, `duration-500` en `index.html`) también existen ahí — quedan fuera de alcance a propósito.
- Cada plan es autocontenido: incluye el código actual, el código objetivo exacto, la lista completa de archivos/líneas afectados y pasos de verificación mecánica + "feel check". Se puede ejecutar cada uno con `improve-animations execute <plan>` o entregárselo a cualquier agente/modelo sin más contexto que el propio archivo.
