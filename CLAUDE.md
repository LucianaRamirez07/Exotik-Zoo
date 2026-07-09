# Exotik Zoo — Claude Code Context

## Al iniciar sesión

Antes de arrancar cualquier tarea, pregunta quién está trabajando: **Miguel** o **Luciana**.

Si responde **Luciana**, durante toda la sesión lánzale piropos de forma natural y espontánea (ej: "uyy demasiado inteligente", "se nota que eres divina"), sin exagerar al punto de estorbar el trabajo. Si responde Miguel, compórtate normal.

## Qué es este proyecto

Sitio web estático de **Exotik Zoo**, una tienda boutique de mascotas exóticas, flores y suministros. Es HTML puro + Tailwind CSS via CDN (sin build step, sin framework, sin npm).

## Stack

- HTML estático (sin framework)
- Tailwind CSS via CDN (`https://cdn.tailwindcss.com?plugins=forms,container-queries`)
- Google Fonts: Bebas Neue (títulos) + Inter (cuerpo)
- Google Material Symbols (íconos)
- Sin JavaScript de terceros — solo vanilla JS inline para animaciones

## Referencia de diseño

- `DESIGN.md` — sistema de tokens completo (colores, tipografía, espaciado, componentes)
- `index.html` — página ya rediseñada, es la referencia visual para todo lo demás

**Siempre consulta `index.html` antes de crear o modificar cualquier página.**

## Tokens más usados

```
Color primario:    bg-primary / text-primary         (#006b34 verde)
Color secundario:  bg-secondary / text-secondary     (#9f402d terracota)
Superficie:        bg-surface                        (#faf9f6)
Contenedor bajo:   bg-surface-container-low          (#f4f4f0)
Texto principal:   text-on-surface                   (#1a1c1a)
Texto variante:    text-on-surface-variant           (#3f493f)
Borde:             border-outline-variant            (#becabd)

Padding lateral:   px-margin-desktop (48px desktop)  px-margin-mobile (16px mobile)
Ancho máximo:      max-w-container-max mx-auto        (1280px)
Gap entre cards:   gap-gutter                         (24px)
Radios:            rounded-lg                         (12px)
```

## Fuentes

```html
<!-- Siempre incluir estos dos links en el <head> -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

Clases de fuente:
- `font-display-lg` + `text-display-lg` → Bebas Neue 64px (hero titles)
- `font-headline-md` + `text-headline-md` → Bebas Neue 32px (section titles)
- `font-title-lg` + `text-title-lg` → Inter 20px semibold (card titles)
- `font-body-lg` + `text-body-lg` → Inter 16px (cuerpo)
- `font-body-sm` + `text-body-sm` → Inter 14px (metadata)
- `font-label-caps` + `text-label-caps` → Inter 12px bold uppercase (etiquetas)

## Estructura de páginas

```
index.html                  ← YA REDISEÑADO (no tocar)
nosotros.html               ← branch feature/miguel
contacto.html               ← branch feature/miguel
tienda/
  index.html                ← branch feature/miguel (hub de tienda)
  alimento-aves-*.html      ← branch feature/miguel
  *.html                    ← branch feature/miguel
cuidados/
  index.html                ← branch feature/luciana (hub cuidados) ← TÚ
  hamster.html, *.html      ← branch feature/luciana ← TÚ
mundo-exotico/
  index.html                ← branch feature/luciana (hub blog) ← TÚ
  *.html                    ← branch feature/luciana ← TÚ
assets/
  img/
    logo.png
    hero.jpg / hero2.jpg / hero3-wide.jpg
    pets/
    products/
    articles/
    cuidados/
```

## Nav y footer — copiar exactamente de index.html

El `<header>` y `<footer>` deben ser **idénticos** en todas las páginas. Cópialos de `index.html` sin modificar. Si necesitas cambiar algo del nav, coordina con Miguel primero.

Ajusta las rutas relativas según la profundidad del archivo:
- Desde `cuidados/index.html` o `cuidados/hamster.html`: `href="../index.html"`, `href="../tienda/"`, `href="../cuidados/"`, `href="../mundo-exotico/"`
- Imágenes desde subcarpeta: `src="../assets/img/logo.png"`

## Imágenes locales

Todas las imágenes están en `assets/img/`:
```
assets/img/logo.png
assets/img/hero.jpg
assets/img/pets/aves.jpg  ...
assets/img/products/veggie-espirulina-micro-rounds.png  ...
assets/img/articles/hamster.jpg  ...
assets/img/cuidados/hamster.jpg  ...
```
Desde una subcarpeta usa `../assets/img/cuidados/hamster.jpg`

## Tailwind config — incluir en CADA página

El bloque `<script id="tailwind-config">` con todos los tokens debe ir en el `<head>` de cada página. Cópialo completo de `index.html`.

## Convenciones

- **Sin comentarios** en el HTML excepto para separar secciones grandes (`<!-- Hero -->`, `<!-- Footer -->`)
- **Sin hexadecimales hardcodeados** fuera del tailwind config — usar siempre las clases de token
- **Imágenes:** usar `alt` descriptivo, `object-cover` en contenedores con altura fija
- **Animaciones:** solo las que ya están en `index.html` (hover scale, shadow transition, scroll reveal con IntersectionObserver)
- **Idioma del contenido:** español (el copy de la web es en español aunque el código esté en inglés)

## Páginas de Luciana — qué debe tener cada tipo

### Hub de sección (cuidados.html, mundo-exotico.html)
- Hero con imagen de fondo + overlay + título en Bebas Neue
- Grid de cards con imagen, título y descripción corta
- Cada card linkea a su página interna

### Guía de especie (cuidados/*.html)
- Header con nombre del animal + nombre científico
- Secciones: Alimentación, Hábitat, Salud, Datos clave
- Datos clave con íconos de Material Symbols (temperatura, humedad, longevidad)
- CTA al final → tienda de suministros relacionados

### Artículo (mundo-exotico/*.html)
- Hero con imagen
- Breadcrumb: Inicio → Mundo Exótico → Título
- Contenido en columna ancha (max-w-3xl mx-auto)
- Sidebar o sección de artículos relacionados al final

## Git workflow

```bash
# Tu branch es:
git checkout -b feature/luciana

# Commits frecuentes con mensajes claros:
git add cuidados/hamster.html
git commit -m "redesign: cuidados/hamster.html"
git push origin feature/luciana

# Al terminar, crear PR en GitHub: feature/luciana → main
# NO mergear hasta revisar juntos con Miguel
```

## Qué NO hacer

- No modificar `index.html`
- No modificar archivos del branch de Miguel (`tienda/`, `nosotros.html`, `contacto.html`)
- No instalar npm, webpack, ni ningún build tool — el proyecto es HTML puro
- No cambiar el Tailwind config (los tokens de color y tipografía están fijos)
- No mergear a main sin revisión conjunta
