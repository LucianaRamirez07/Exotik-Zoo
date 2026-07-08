# Spec: Carrusel de productos en index.html
**Fecha:** 2026-07-08
**Branch:** `feature/luciana`
**Página:** `index.html`

---

## Objetivo

Mover el carrusel infinito de productos (marquee) que hoy vive en `nosotros.html` hacia `index.html`, ubicado inmediatamente debajo de la sección "Editorial + Betta" (video del pez Betta) y antes de la sección "Categorías", para que el visitante vea todos los productos al hacer scroll justo después del video.

## Alcance

- **Mover**, no duplicar: sacar la sección `<!-- Carousel Productos -->` completa (markup + estilos `@keyframes marquee`, `.carousel-track`, `.carousel-section`) de `nosotros.html` y colocarla en `index.html`, entre "Editorial + Betta" y "Categorías".
- `nosotros.html` pierde la sección del carrusel — vuelve a su flujo original (Historia → Valores → CTA final) sin ese bloque.
- Mismo set de 9 productos, mismo orden, mismas rutas de imagen, mismo markup y animación (sin cambios de diseño, solo de ubicación):
  1. Veggie Espirulina Micro Rounds
  2. Veggies Espirulina Rounds
  3. Fish Flakes
  4. Tropical Food
  5. Carnivorous Shrimp
  6. Comida Flotante Multi Food
  7. Vitaheno Caléndula
  8. Vitaheno Manzanilla
  9. Vitaheno Romero
- Título de sección: "Nuestros Productos" (`font-headline-md text-headline-md`), igual que estaba en `nosotros.html`.
- Fondo `bg-white` con `border-t border-b border-outline-variant/30` para separarlo visualmente del fondo `#faf9f6` de la sección del Betta.
- La sección "Selección Natural" (grid estático de 3 productos, más abajo en `index.html`) se mantiene sin cambios — el carrusel la complementa, no la reemplaza.
- Los estilos del carrusel se agregan al bloque `<style>` de `index.html` (no hay `<style>` compartido entre páginas al ser HTML estático sin build step); se eliminan del `<style>` de `nosotros.html` si no se usan en ningún otro lugar de esa página.

## Fuera de alcance

- No se cambia el set de productos ni se agregan nuevas fotos.
- No se modifica la sección "Selección Natural".
- No se agrega ningún otro bloque nuevo a `nosotros.html` para compensar el espacio que deja el carrusel.

## Ubicación exacta en index.html

Nueva sección `<!-- Carrusel Productos -->` entre:
- línea 191 (`</section>` de cierre de "Editorial + Betta")
- línea 193 (`<!-- Categorías -->`)
