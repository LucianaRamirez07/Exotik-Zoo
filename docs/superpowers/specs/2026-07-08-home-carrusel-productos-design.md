# Spec: Carrusel de productos en index.html
**Fecha:** 2026-07-08
**Branch:** `feature/luciana`
**Página:** `index.html`

---

## Objetivo

Agregar un carrusel infinito de productos (marquee) en `index.html`, ubicado inmediatamente debajo de la sección "Editorial + Betta" (video del pez Betta) y antes de la sección "Categorías", para que el visitante vea todos los productos al hacer scroll justo después del video.

## Alcance

- Reutilizar el componente de carrusel ya implementado en `nosotros.html` (líneas ~146-173): animación CSS `marquee` infinita, pausa al hover, mismo markup y clases (`carousel-section`, `carousel-track`).
- Reutilizar el mismo set de 9 productos, mismo orden, mismas rutas de imagen:
  1. Veggie Espirulina Micro Rounds
  2. Veggies Espirulina Rounds
  3. Fish Flakes
  4. Tropical Food
  5. Carnivorous Shrimp
  6. Comida Flotante Multi Food
  7. Vitaheno Caléndula
  8. Vitaheno Manzanilla
  9. Vitaheno Romero
- Título de sección: "Nuestros Productos" (`font-headline-md text-headline-md`), igual que en `nosotros.html`.
- Fondo `bg-white` con `border-t border-b border-outline-variant/30` para separarlo visualmente del fondo `#faf9f6` de la sección del Betta.
- La sección "Selección Natural" (grid estático de 3 productos, más abajo en `index.html`) se mantiene sin cambios — el carrusel la complementa, no la reemplaza.
- Los estilos `@keyframes marquee`, `.carousel-track`, `.carousel-section` ya existen en `nosotros.html` dentro de un bloque `<style>`; en `index.html` hay que agregarlos también (no hay `<style>` compartido entre páginas al ser HTML estático sin build step).

## Fuera de alcance

- No se toca `nosotros.html`.
- No se cambia el set de productos ni se agregan nuevas fotos.
- No se modifica la sección "Selección Natural".

## Ubicación exacta en index.html

Nueva sección `<!-- Carrusel Productos -->` entre:
- línea 191 (`</section>` de cierre de "Editorial + Betta")
- línea 193 (`<!-- Categorías -->`)
