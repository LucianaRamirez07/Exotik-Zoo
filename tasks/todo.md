# Quitar la dependencia de cdn.tailwindcss.com

## Problema

Todo el CSS del sitio se genera en el navegador con `cdn.tailwindcss.com`.
El DNS del ISP colombiano (190.240.112.146) no resuelve ese dominio, así que
la web se ve sin estilos para cualquiera en esa red. Verificado: ese mismo DNS
resuelve `exotikzoo.co`, `fonts.googleapis.com` y `fonts.gstatic.com` sin
problema. El fallo está aislado en un solo host.

Efectos secundarios que se arreglan de paso: el parpadeo sin estilos en cada
carga, y el peso de compilar Tailwind en el navegador.

## Hallazgos de la investigación

- 43 páginas, no 26. Reparto: 4 raíz, 10 cuidados, 13 mundo-exotico, 16 tienda.
- Las 43 cargan el CDN.
- Las configs NO son idénticas: 4 variantes distintas.
- Unión de las 4: **73 tokens**, de los cuales solo **4 en conflicto**.
- Los 4 conflictos son el mismo valor con y sin `fontWeight: "400"`:
  `fontSize.display-lg`, `body-sm`, `headline-md`, `body-lg`.
  20 páginas los definen (3 con fontWeight, 17 sin).
- `assets/js/carrito.js` y `lead-popup.js` añaden clases en runtime
  (`hidden`, `translate-x-full`, `opacity-50`, `pointer-events-none`...).
  Hay que incluir el JS en el escaneo o Tailwind las purga.

## Decisiones

1. **Conflictos de fontWeight**: usar la variante SIN `fontWeight`.
   Añadirlo podría pisar `font-semibold` en las 17 páginas que combinan
   `text-body-sm font-semibold`. Quitarlo es inerte, porque 400 ya es el
   valor heredado. Se verifica con captura en index.html y nosotros.html.
2. **Sin build tool en el repo**: el binario del CLI y el `tailwind.config.js`
   viven en el scratchpad. Al repo solo entra el `.css` generado.
3. **Ruta**: `assets/css/tailwind.css`, con profundidad relativa según la página.

## Tareas

- [x] Verificar que el CDN es el único dominio que falla
- [x] Confirmar que el CLI standalone es alcanzable y funciona (v3.4.17)
- [x] Extraer las 4 configs y detectar conflictos
- [x] Construir `tailwind.config.js` con la unión de los 73 tokens
- [x] Generar `assets/css/tailwind.css` (36 KB)
- [x] **Probar equivalencia** en las 43 páginas, elemento por elemento
- [x] Sustituir en las 43 páginas
- [x] Verificar las 43: 0 referencias al CDN, 440/440 clases cubiertas
- [ ] Publicar y comprobar en vivo

## Riesgos

- Clases que solo existen en JS: mitigado incluyendo `assets/js/*.js` en content.
- Clases construidas por concatenación de strings en JS: Tailwind no las ve.
  Hay que buscarlas a mano antes de dar por bueno el resultado.
- 43 páginas es mucha superficie: la verificación es por captura comparada,
  no por inspección visual a ojo.

## Revisión

### Resultado

43 páginas convertidas. 0 referencias a `cdn.tailwindcss.com`.
440 de 440 clases usadas tienen regla en el CSS (las 3 restantes
—`filtro-btn`, `prod-item`, `seccion`— son ganchos de JS sin estilo).

Comparación contra el CDN, elemento por elemento:

| Resultado | Páginas |
|---|---|
| Idénticas | 24 |
| 1 px de redondeo | 2 |
| Bug corregido: h1 de contacto 16px -> 48px | 1 |
| Bug corregido: logo en Bebas Neue en vez de Inter | 16 |
| **Regresiones** | **0** |

### Dos bugs latentes que se corrigen

1. `contacto.html` usa `text-display-lg-mobile`, token que su config no
   definía: el titular "Hablemos" salía a 16 px. Verificado en producción.
2. Las 16 páginas de `tienda/` usan `font-display`, pero su config define
   `display-lg`, no `display`: el logo de la cabecera caía a Inter.
   Verificado en producción.

Los dos existían porque cada página llevaba su propia config recortada.
Al unificar, cada página recibe el juego completo de tokens.

### Un fallo de diseño mío que costó tiempo

El CDN de Tailwind inyecta su `<style>` como ULTIMO hijo del `<head>`,
por detrás de la hoja de Google Fonts y de los `<style>` de la página.
Al principio puse el `<link>` donde estaba el script, es decir antes de
Material Symbols, cuya hoja declara `.material-symbols-outlined{font-size:24px}`.
Misma especificidad que `.text-lg`, así que ganaba la última: los iconos
de las 9 fichas de cuidados pasaban de 18 a 24 px. Se corrige colocando
el `<link>` justo antes de `</head>`.

### Lecciones de medición

Tres mediciones dieron falsos resultados antes de dar con un método fiable:

1. Esperar por tiempo fijo: medía la versión CDN antes de que Tailwind
   terminara de aplicarse. Resultados distintos en cada pasada.
2. Volcar los datos en `document.title`: Chrome lo trunca, y devolvía
   "0 diferencias" habiendo leído 2 elementos de 194.
3. Servir por `file://`: el navegador no deja leer `cssRules` de una hoja
   externa, así que nunca detectaba que el CSS local había cargado.

Método que sí funciona: servir por HTTP, quitar `lead-popup.js` (inyecta
DOM de forma asíncrona y descuadra el recuento), esperar a que exista una
hoja con más de 100 reglas, y volcar por un `<div>` del DOM.
