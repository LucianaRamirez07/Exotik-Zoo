# 002 — Replicar el scroll-reveal de index.html en las páginas de Luciana

- **Status**: DONE
- **Commit**: 8971a12
- **Severity**: MEDIUM
- **Category**: Cohesión / Missed opportunity (AUDIT.md §7, §8)
- **Estimated scope**: 23 files, 1 `<script>` block insertado por archivo (ningún archivo tiene `<script>` propio hoy, solo el CDN de Tailwind en el `<head>`)

## Problem

`index.html` (la página de referencia del sitio, ya terminada — no editable) tiene un patrón de entrada por scroll en cada `<section>`: fade + subida sutil, activado por `IntersectionObserver`. Código de referencia en `index.html:373-396`:

```html
<!-- index.html:373-396 — referencia, no tocar -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          const video = entry.target.querySelector('video[autoplay]');
          if (video && video.paused) { video.play().catch(() => {}); }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-8');
      observer.observe(section);
    });

    setTimeout(() => {
      const first = document.querySelector('main section');
      if (first) { first.classList.add('opacity-100', 'translate-y-0'); first.classList.remove('opacity-0', 'translate-y-8'); }
    }, 100);
  });
</script>
```

Ninguna de las 23 páginas de `cuidados/` ni `mundo-exotico/` tiene este script — sus secciones aparecen de golpe al cargar, sin la firma visual del sitio de referencia. Es un hallazgo de cohesión: la página de referencia establece el lenguaje de movimiento del sitio y estas páginas no lo heredan.

Dos complicaciones frente a copiar el script literal:

1. **Estructura distinta.** `index.html` y las páginas hub (`cuidados/cuidados.html`, `mundo-exotico/mundo-exotico.html`) envuelven su contenido en `<section>` directos hijos de `<main>`. Las 21 páginas de ficha/artículo (especies y artículos) NO usan `<section>` — su contenido son `<div>` directos hijos de `<main>` (confirmado: `cuidados/hamster.html` tiene exactamente 5: hero, datos clave, secciones de contenido, CTA tienda, otras fichas). El selector debe cubrir ambos casos.
2. **`transition-all` en el script de referencia.** La línea `section.classList.add('transition-all', ...)` en `index.html:387` tiene el mismo problema que el Hallazgo #1 de esta auditoría (`transition-all` en vez de propiedades específicas). Como este plan escribe código nuevo (no edita `index.html`), no hay razón para copiar ese defecto: se usa `transition-opacity transition-transform` de forma correcta desde el inicio combinándolas vía una sola clase de propiedad múltiple con valor arbitrario (ver Target).

## Target

Insertar este bloque `<script>` justo antes de `</body>` en cada uno de los 23 archivos, en la misma posición donde hoy termina el archivo (después del botón flotante de WhatsApp, antes de `</body></html>`):

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('main > section, main > div').forEach(block => {
      block.classList.add('transition', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-8');
      observer.observe(block);
    });

    setTimeout(() => {
      const first = document.querySelector('main > section, main > div');
      if (first) { first.classList.add('opacity-100', 'translate-y-0'); first.classList.remove('opacity-0', 'translate-y-8'); }
    }, 100);
  });
</script>
```

**Corrección post-ejecución:** la primera versión de este plan usaba `transition-[opacity,transform]` (valor arbitrario de Tailwind). Tras aplicar el plan, el reveal no era visible en el navegador — la clase arbitraria no generaba ninguna regla `transition-property` reconocible vía el CDN de Tailwind, así que el cambio de opacidad/posición ocurría instantáneo. Se reemplazó por la utilidad `transition` (sin sufijo), que ya cubre `opacity` + `transform` de forma nativa sin sintaxis arbitraria — el mismo patrón usado con éxito en el botón de WhatsApp del Plan 001. Código y verificación abajo ya reflejan la versión corregida.

Notas sobre las diferencias deliberadas frente al script de `index.html`:
- `transition` (bare) en vez de `transition-all`: la utilidad `transition` de Tailwind trae una lista curada de propiedades que incluye `opacity` y `transform` (además de color/shadow/filter), sin incluir propiedades de layout — evita el hallazgo de performance del Plan 001 desde el origen, y evita el bug de combinar dos clases `transition-*` sueltas (en Tailwind solo una de las dos ganaría en la hoja de estilos generada, no se suman).
- Selector `main > section, main > div` en vez de `section`: cubre tanto las páginas hub (que usan `<section>`) como las páginas de ficha/artículo (que usan `<div>` directos de `<main>`).
- Se quitó el bloque de `video[autoplay]` del observer de `index.html` — ninguna página de `cuidados/` ni `mundo-exotico/` tiene `<video autoplay>` dentro de sus bloques de `<main>` (no aplica, no es una omisión).
- Duración y easing idénticos al original (`duration-1000 ease-out`, threshold `0.1`, delay de 100ms para el primer bloque) — se mantiene la firma visual exacta del sitio.

## Repo conventions to follow

- Ningún archivo en `cuidados/` ni `mundo-exotico/` tiene hoy un `<script>` de body (solo el CDN de Tailwind + config en `<head>`, confirmado por `grep -rc "<script"` = 2 en los 23 archivos). Este será el primer `<script>` de body en cada uno — insertarlo inmediatamente antes de `</body>`, después del bloque `<a ... aria-label="WhatsApp">...</a>`.
- Ejemplo de dónde va, usando `cuidados/hamster.html` como exemplar (estructura de cierre):
  ```html
  ...
  </a>
  
  </body>
  </html>
  ```
  pasa a:
  ```html
  ...
  </a>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      ...
    });
  </script>

  </body>
  </html>
  ```

## Steps

1. Para cada uno de los 23 archivos listados abajo, insertar el bloque `<script>` del Target inmediatamente antes de `</body>`.

   Archivos (todos en `cuidados/` y `mundo-exotico/`):
   - `cuidados/cuidados.html`, `cuidados/hamster.html`, `cuidados/betta.html`, `cuidados/periquito.html`, `cuidados/canario.html`, `cuidados/cobaya.html`, `cuidados/conejo.html`, `cuidados/agapornis.html`, `cuidados/pez-dorado.html`, `cuidados/tetra-neon.html`
   - `mundo-exotico/mundo-exotico.html`, `mundo-exotico/acuario-principiantes.html`, `mundo-exotico/agua-acuario-quimica.html`, `mundo-exotico/canarios-canto-salud.html`, `mundo-exotico/cobaya-habitat-ideal.html`, `mundo-exotico/conejos-exoticos-cuidados-basicos.html`, `mundo-exotico/guia-cuidado-periquitos.html`, `mundo-exotico/hamster-alimentacion-ejercicio.html`, `mundo-exotico/pez-betta-cuidados.html`, `mundo-exotico/pinzones-alimentacion-perfecta.html`, `mundo-exotico/plantas-nativas-animales-exoticos.html`, `mundo-exotico/suculentas-facil-cuidado.html`, `mundo-exotico/terrario-plantas-reptiles.html`

2. Confirmar que cada archivo quedó con exactamente 3 `<script>` tags totales (2 preexistentes de Tailwind en `<head>` + 1 nuevo al final):
   ```bash
   grep -rc "<script" cuidados/ mundo-exotico/
   ```
   Debe dar 3 en los 23 archivos.

## Boundaries

- Do NOT tocar `index.html`, `tienda/`, `tienda.html`, `nosotros.html`, `contacto.html`.
- Do NOT modificar el HTML existente de cada página (headers, footers, contenido) — solo se agrega el bloque `<script>` nuevo al final.
- Do NOT usar un selector distinto a `main > section, main > div` sin volver a verificar la estructura del archivo — si algún archivo tiene una estructura de `<main>` distinta a la documentada (por ejemplo `<main>` sin hijos directos `<div>`/`<section>`), STOP y reportar en vez de improvisar.
- Este plan depende de que se ejecute ANTES o DESPUÉS del Plan 001 sin conflicto — no tocan las mismas líneas, pero si el Plan 001 aún no corrió, este script ya nace limpio (usa `transition-[opacity,transform]`, no `transition-all`), así que el orden entre 001 y 002 no importa.

## Verification

- **Mecánica**:
  ```bash
  grep -rc "<script" cuidados/ mundo-exotico/   # debe dar 3 en cada uno de los 23 archivos
  grep -rL "IntersectionObserver" cuidados/*.html mundo-exotico/*.html   # debe estar vacío (todos deben tener el script)
  ```
- **Feel check**: abrir `cuidados/hamster.html` y `mundo-exotico/mundo-exotico.html` en el navegador, recargar con scroll en la parte superior.
  - El primer bloque (hero) debe estar visible de inmediato (sin esperar scroll), igual que en `index.html`.
  - Los siguientes bloques (Datos clave, Secciones de contenido, CTA, Otras fichas) deben aparecer con fade + leve subida al hacer scroll hasta ellos, no de golpe.
  - En DevTools → Animations panel, bajar playback a 10% y confirmar que el movimiento es una subida sutil (no un salto ni un slide agresivo) — debe verse igual de sutil que en `index.html`.
  - Verificar que ningún bloque queda invisible permanentemente (si el observer nunca dispara por algún motivo, el contenido no debe quedar oculto — probar con JS deshabilitado no aplica aquí porque las clases `opacity-0` las agrega el propio script, así que sin JS el contenido es visible por defecto; confirmar esto revisando que `opacity-0`/`translate-y-8` NO están hardcodeadas en el HTML, solo las agrega el script).
- **Done when**: los 23 archivos tienen el script insertado, `grep -rL "IntersectionObserver"` da vacío, y el reveal se siente visualmente idéntico al de `index.html` (misma duración, mismo easing, mismo umbral).
