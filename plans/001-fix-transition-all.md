# 001 — Reemplazar `transition-all` por propiedades específicas

- **Status**: DONE
- **Commit**: 8971a12
- **Severity**: MEDIUM
- **Category**: Performance (AUDIT.md §5)
- **Estimated scope**: 23 files, ~95 class-attribute edits (find/replace, no markup changes)

## Problem

`transition-all` transiciona todas las propiedades del elemento (incluyendo las que disparan layout/paint), cuando en realidad solo cambian 1-2 propiedades conocidas. AUDIT.md §5 lo marca como hallazgo automático: *"`transition: all` animates unintended properties off-GPU — always a finding."*

Dos patrones repetidos en los 23 archivos de `cuidados/` y `mundo-exotico/`:

**Patrón A — cards de "ficha relacionada"** (solo cambia `border-color` en hover; el zoom de la imagen ya tiene su propia clase `transition-transform` separada). Ejemplo en `cuidados/hamster.html:216`:

```html
<!-- cuidados/hamster.html:216 — actual -->
<a href="./periquito.html" class="group bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/30 hover:border-primary transition-all block">
```

**Patrón B — botón flotante de WhatsApp** (cambian `background-color` Y `transform` a la vez). Ejemplo en `cuidados/hamster.html:263`:

```html
<!-- cuidados/hamster.html:263 — actual -->
<a href="https://wa.me/573245478625?text=..." target="_blank"
   class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110"
   aria-label="WhatsApp">
```

## Target

**Patrón A** — solo cambia color de borde → `transition-colors`:

```html
<a href="./periquito.html" class="group bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/30 hover:border-primary transition-colors block">
```

**Patrón B** — cambian color Y transform → usar la utilidad `transition` (sin sufijo) de Tailwind, NO `transition-all`. `transition` (bare) trae una lista curada de propiedades (`color, background-color, border-color, ..., opacity, box-shadow, transform, filter, backdrop-filter`) que cubre ambos cambios sin incluir propiedades de layout:

```html
<a href="https://wa.me/573245478625?text=..." target="_blank"
   class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition hover:scale-110"
   aria-label="WhatsApp">
```

## Repo conventions to follow

- El propio código ya usa `transition-colors` y `transition-opacity` correctamente en otros lugares (ej. `cuidados/hamster.html:50` `hover:text-primary transition-colors`, `cuidados/hamster.html:60` `hover:opacity-80 transition-opacity`) — este fix simplemente extiende esa misma convención a los dos sitios que se quedaron con `transition-all`.
- No se toca la clase `transition-transform duration-300` de las imágenes dentro de las cards (Patrón A) — esa ya es correcta y queda igual.

## Steps

1. En los 21 archivos con Patrón A (lista abajo), reemplazar la subcadena exacta `hover:border-primary transition-all` por `hover:border-primary transition-colors`. Aparece 3-4 veces por archivo (una por cada card de "ficha relacionada"); reemplazar TODAS las ocurrencias en cada archivo.

   Archivos con Patrón A:
   - `cuidados/canario.html` (4 ocurrencias)
   - `cuidados/cobaya.html` (4)
   - `cuidados/pez-dorado.html` (4)
   - `cuidados/agapornis.html` (4)
   - `cuidados/tetra-neon.html` (4)
   - `cuidados/periquito.html` (4)
   - `cuidados/conejo.html` (4)
   - `cuidados/betta.html` (4)
   - `cuidados/hamster.html` (4)
   - `mundo-exotico/agua-acuario-quimica.html` (3)
   - `mundo-exotico/suculentas-facil-cuidado.html` (3)
   - `mundo-exotico/hamster-alimentacion-ejercicio.html` (3)
   - `mundo-exotico/plantas-nativas-animales-exoticos.html` (3)
   - `mundo-exotico/cobaya-habitat-ideal.html` (3)
   - `mundo-exotico/canarios-canto-salud.html` (3)
   - `mundo-exotico/terrario-plantas-reptiles.html` (3)
   - `mundo-exotico/pez-betta-cuidados.html` (3)
   - `mundo-exotico/pinzones-alimentacion-perfecta.html` (3)
   - `mundo-exotico/guia-cuidado-periquitos.html` (3)
   - `mundo-exotico/conejos-exoticos-cuidados-basicos.html` (3)
   - `mundo-exotico/acuario-principiantes.html` (3)

2. En TODOS los 23 archivos de `cuidados/` y `mundo-exotico/` (los 21 de arriba + `cuidados/cuidados.html` + `mundo-exotico/mundo-exotico.html`), reemplazar la subcadena exacta `shadow-lg transition-all hover:scale-110` por `shadow-lg transition hover:scale-110` (botón flotante de WhatsApp, 1 ocurrencia por archivo).

3. Verificar que no queda ningún `transition-all` en `cuidados/` ni `mundo-exotico/`:
   ```bash
   grep -rn "transition-all" cuidados/ mundo-exotico/
   ```
   Debe devolver vacío.

## Boundaries

- Do NOT touch `index.html`, `tienda/`, `tienda.html`, `nosotros.html`, `contacto.html` — son del branch de Miguel.
- Do NOT cambiar el atributo `class` en ningún otro aspecto — solo la palabra `transition-all` → `transition-colors` o `transition`.
- Do NOT tocar la clase `transition-transform duration-300` de las imágenes (ya es correcta, es un elemento hijo distinto del que lleva `transition-all`).
- Si algún archivo de la lista no contiene la subcadena exacta esperada (drift desde el commit `8971a12`), STOP y reportar en vez de improvisar un reemplazo distinto.

## Verification

- **Mecánica**:
  ```bash
  grep -rn "transition-all" cuidados/ mundo-exotico/   # debe estar vacío
  grep -rc "hover:border-primary transition-colors" cuidados/*.html mundo-exotico/*.html   # confirma conteos por archivo
  grep -rc "shadow-lg transition hover:scale-110" cuidados/*.html mundo-exotico/*.html   # debe dar 1 por archivo (23 archivos)
  ```
- **Feel check**: abrir `cuidados/hamster.html` en el navegador.
  - Pasar el mouse sobre una card de "ficha relacionada" (sección "Otras fichas"): el borde debe cambiar de color suavemente, igual que antes del cambio (no debe verse ningún salto ni pérdida de la transición).
  - Pasar el mouse sobre el botón flotante de WhatsApp: debe seguir agrandándose (`scale-110`) Y cambiando de verde a verde oscuro, ambos suavemente, igual que antes.
  - En DevTools → Rendering → "Paint flashing", confirmar que el hover de las cards ya no repinta áreas fuera del borde de la card.
- **Done when**: `grep -rn "transition-all" cuidados/ mundo-exotico/` no devuelve resultados y el hover visual de cards + botón WhatsApp se siente idéntico al original.
