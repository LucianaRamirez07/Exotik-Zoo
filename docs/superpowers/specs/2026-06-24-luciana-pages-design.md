# Spec: Rediseño páginas Luciana — Exotik Zoo
**Fecha:** 2026-06-24
**Branch:** `feature/luciana`
**Páginas:** 23 en total (2 hubs + 9 guías + 1 hub blog + 13 artículos)

---

## Sistema de diseño

| Token | Valor |
|-------|-------|
| Fondo | `#faf9f6` |
| Texto | `#1a1c1a` |
| Primario | `#006b34` |
| Secundario | `#9f402d` |
| Título | Bebas Neue |
| Cuerpo | Inter |
| Radio cards | 12px |
| Contenedor | max-w 1280px |
| Padding desktop | 48px |
| Padding móvil | 16px |

Framework: **Tailwind CSS CDN** (igual que `index.html`)

---

## Nav y Footer

Copiados exactamente de `index.html`. Rutas relativas ajustadas según profundidad:
- Páginas en `/cuidados/` y `/mundo-exotico/` usan `../` como prefijo
- El hub `cuidados/index.html` y `mundo-exotico/index.html` usan `./`

---

## Tipo 1 — Hub Cuidados (`cuidados/index.html`)

**Secciones:**
1. Hero: eyebrow "GUÍAS DE CUIDADO" + H1 Bebas Neue + descripción
2. Filtros: chips (Todos / Aves / Peces / Roedores) — JS para filtrar
3. Grid 3-2-1 de cards

**Card de guía:**
- Imagen `object-cover` con altura fija 200px
- Badge dificultad top-left (verde = Fácil, amarillo = Intermedio)
- Nombre en Bebas Neue
- Datos: Vida + Tamaño (separados por divisor)
- Link "Ver guía completa →" en verde primario

---

## Tipo 2 — Guías individuales (9 páginas)

Animales: agapornis, betta, canario, cobaya, conejo, hamster, periquito, pez-dorado, tetra-neon

**Secciones:**
1. Hero: imagen de fondo + overlay oscuro + nombre en Bebas Neue grande + badge dificultad
2. Barra de stats: Vida / Tamaño / Origen / Temperamento (grid 4 col)
3. Secciones de contenido con icono + título + párrafo:
   - Alimentación
   - Hábitat y espacio
   - Salud y cuidados
   - Dato curioso
4. CTA final: "Ver productos para [animal] →" → link relativo a `../tienda/`

**Rutas de imágenes:** `../assets/img/cuidados/[animal].jpg`

---

## Tipo 3 — Hub Blog (`mundo-exotico/index.html`)

**Secciones:**
1. Hero: eyebrow "EL MUNDO EXÓTICO" + H1 + descripción
2. Grid 3-2-1 de cards de artículos

**Card de artículo:**
- Imagen `object-cover` 200px
- Categoría en `label-caps` (color secundario)
- Título en Inter semibold
- Extracto 2 líneas
- "Leer artículo →" en verde

---

## Tipo 4 — Artículos individuales (13 páginas)

Artículos (12): acuario-principiantes, agua-acuario-quimica, canarios-canto-salud, cobaya-habitat-ideal, conejos-exoticos-cuidados-basicos, guia-cuidado-periquitos, hamster-alimentacion-ejercicio, pez-betta-cuidados, pinzones-alimentacion-perfecta, plantas-nativas-animales-exoticos, suculentas-facil-cuidado, terrario-plantas-reptiles

**Secciones:**
1. Hero: imagen + título Bebas Neue + categoría + fecha
2. Cuerpo del artículo: párrafos Inter, subtítulos Bebas Neue, listas con bullet verde
3. Sección final: 3 artículos relacionados (mini cards)

**Rutas de imágenes:** `../assets/img/articles/[nombre].jpg`

---

## Orden de implementación

1. Crear branch `feature/luciana`
2. `cuidados/index.html` (hub — establece el patrón visual)
3. `cuidados/hamster.html` (primera guía — plantilla para las 8 restantes)
4. Replicar guías: agapornis, betta, canario, cobaya, conejo, periquito, pez-dorado, tetra-neon
5. `mundo-exotico/index.html` (hub blog)
6. `mundo-exotico/acuario-principiantes.html` (primer artículo — plantilla)
7. Replicar los 12 artículos restantes
8. Push y PR `feature/luciana → main`
