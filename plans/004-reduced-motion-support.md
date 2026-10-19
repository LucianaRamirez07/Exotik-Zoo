# 004 — Soportar `prefers-reduced-motion` en hover-zoom, botón WhatsApp y scroll-reveal

- **Status**: DONE
- **Commit**: 8971a12
- **Severity**: MEDIUM
- **Category**: Accesibilidad (AUDIT.md §6)
- **Estimated scope**: 23 files, 1 bloque `<style>` insertado por archivo + 1 edición del `<script>` de reveal (que este plan asume ya insertado por el Plan 002)

## Problem

Ningún archivo de `cuidados/` ni `mundo-exotico/` (ni tampoco `index.html`, la referencia — pero eso está fuera de tu alcance) maneja `prefers-reduced-motion`. Hoy el sitio tiene tres tipos de movimiento, todos sin excepción para usuarios que piden menos movimiento:

1. **Hover-zoom de imágenes** (`group-hover:scale-105`) — en las cards de todas las páginas.
2. **Hover-scale del botón flotante de WhatsApp** (`hover:scale-110`) — en las 23 páginas.
3. **Scroll-reveal** (`translate-y-8` → `translate-y-0`, si el Plan 002 ya se ejecutó) — fade + movimiento vertical al entrar en viewport.

AUDIT.md §6: *"Reduced motion means fewer and gentler animations, not zero — keep transitions that aid comprehension, remove position changes."* Esto significa: mantener el fade de opacidad, quitar el `scale`/`translate`.

Confirmado por grep — cero resultados en todo el sitio:
```
grep -rn "prefers-reduced-motion" cuidados/ mundo-exotico/
```

## Target

**Parte A — CSS override para hover-scale (imágenes y botón WhatsApp).**

Agregar este bloque `<style>` en el `<head>` de cada archivo, inmediatamente después del bloque `<style>` existente de `.material-symbols-outlined` (ver ejemplo de ubicación abajo):

```html
<style>
  @media (prefers-reduced-motion: reduce) {
    .group:hover .group-hover\:scale-105,
    .hover\:scale-110:hover {
      transform: none !important;
    }
  }
</style>
```

`!important` es necesario aquí porque Tailwind CDN inyecta su hoja de estilos en runtime vía JS, y el orden relativo frente a los `<style>` propios de la página no está garantizado — sin `!important` el override podría perder silenciosamente según el orden de inyección.

**Parte B — scroll-reveal sin movimiento (solo si el Plan 002 ya insertó el script).**

Editar el `<script>` insertado por el Plan 002 para que, cuando el usuario pida movimiento reducido, el reveal se haga solo con opacidad (sin `translate-y-8`) y con una transición más corta:

```html
<!-- target: reemplaza el <script> del Plan 002 -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('main > section, main > div').forEach(block => {
      if (reduceMotion) {
        block.classList.add('transition-opacity', 'duration-200', 'ease-out', 'opacity-0');
      } else {
        block.classList.add('transition-[opacity,transform]', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-8');
      }
      observer.observe(block);
    });

    setTimeout(() => {
      const first = document.querySelector('main > section, main > div');
      if (first) { first.classList.add('opacity-100', 'translate-y-0'); first.classList.remove('opacity-0', 'translate-y-8'); }
    }, 100);
  });
</script>
```

Diferencia clave: con `reduceMotion` activo, los bloques nunca reciben `translate-y-8` (no hay movimiento posicional que revertir), solo `opacity-0` → `opacity-100`, y la transición baja de 1000ms a 200ms (valor de ejemplo en AUDIT.md §6: `animation: fade 0.2s ease`).

## Repo conventions to follow

- Cada archivo ya tiene un bloque `<style>` en el `<head>` justo antes de `</head>` (ejemplo en `cuidados/hamster.html:40-42`):
  ```html
  <style>body{font-family:'Inter',sans-serif;background:#faf9f6;color:#1a1c1a}</style>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  <style>.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }</style>
  </head>
  ```
  El nuevo bloque de Parte A va inmediatamente después del `<style>` de `.material-symbols-outlined`, antes de `</head>`.

## Steps

1. En los 23 archivos de `cuidados/` y `mundo-exotico/` (misma lista que el Plan 002), insertar el bloque `<style>` de la Parte A justo antes de `</head>`, después del `<style>.material-symbols-outlined{...}</style>` existente.

2. Confirmar que el Plan 002 ya corrió en cada archivo (buscar `IntersectionObserver`). Si NO corrió todavía en algún archivo, STOP — la Parte B depende de que el script del Plan 002 exista primero. Reportar qué archivos faltan en vez de crear el script desde cero con lógica distinta a la especificada aquí.

3. En los archivos donde el Plan 002 ya insertó el script, reemplazar el bloque `<script>` completo del reveal por la versión de la Parte B (Target) — mismo `<script>`, con el agregado de `reduceMotion` y la rama condicional.

4. Verificar:
   ```bash
   grep -rc "prefers-reduced-motion" cuidados/ mundo-exotico/   # debe dar al menos 1 por archivo (23 archivos)
   grep -rn "reduceMotion" cuidados/ mundo-exotico/   # debe aparecer en los 23 scripts de reveal
   ```

## Boundaries

- Do NOT tocar `index.html`, `tienda/`, `tienda.html`, `nosotros.html`, `contacto.html` — comparten el mismo hueco de accesibilidad pero son del branch de Miguel; no es tu alcance arreglarlo ahí.
- Do NOT ejecutar la Parte B en un archivo donde el Plan 002 no haya corrido todavía — el orden de ejecución es 002 → 004, no al revés.
- Do NOT quitar el movimiento por completo — reduced motion debe conservar el fade de opacidad, solo elimina `scale` y `translate`.
- Si el bloque `<style>` de `.material-symbols-outlined` no está exactamente donde se documenta aquí (drift desde el commit `8971a12`), STOP y reportar.

## Verification

- **Mecánica**:
  ```bash
  grep -rc "prefers-reduced-motion" cuidados/ mundo-exotico/   # >=1 en los 23 archivos
  grep -rL "reduceMotion" cuidados/*.html mundo-exotico/*.html   # debe estar vacío
  ```
- **Feel check**: en Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce", abrir `cuidados/hamster.html`.
  - Pasar el mouse sobre una card de "ficha relacionada": la imagen NO debe hacer zoom, pero el borde sigue cambiando de color (ese es un cambio de color, no de posición/escala — se mantiene).
  - Pasar el mouse sobre el botón de WhatsApp: NO debe agrandarse, pero sí puede seguir cambiando de tono de verde.
  - Hacer scroll: los bloques deben aparecer con un fade rápido (sin subir desde abajo), no deben quedar invisibles ni tardar más de lo esperado en aparecer.
  - Desactivar la emulación y repetir: todo el movimiento original (zoom, scale, translate-y) debe volver exactamente igual que antes de este plan.
- **Done when**: con `prefers-reduced-motion: reduce` activo, ningún elemento se mueve por transform/translate, pero el feedback de color y opacidad se mantiene; sin la preferencia activa, el comportamiento es idéntico al de los Planes 001-003.
