# Plan de Rediseño — Exotik Zoo
> Objetivo: rediseñar todas las páginas al nuevo sistema de diseño antes de final del día.
> Referencia visual: `index.html` (ya rediseñado) + `DESIGN.md`

---

## Paso 0 — Antes de empezar (los dos, 10 min)

Acuerden el snippet de **nav y footer** que usarán en TODAS las páginas.
Copien el de `index.html` y péguenlo tal cual. Si uno lo cambia después, el otro tendrá conflicto.

**Checkpoint:** Los dos deben tener el mismo bloque `<header>` y `<footer>` antes de separarse.

---

## División de trabajo

### 🔵 Miguel — branch: `feature/miguel`
**Páginas comerciales y de conversión (12 páginas)**

| Página | Sección | Tipo |
|--------|---------|------|
| `tienda.html` | Tienda | Hub de productos (grid de tarjetas) |
| `tienda/alimento-aves-pico-grande.html` | Tienda | Detalle producto |
| `tienda/alimento-aves-pico-pequeno.html` | Tienda | Detalle producto |
| `tienda/alimento-roedores.html` | Tienda | Detalle producto |
| `tienda/larvas-liofilizadas.html` | Tienda | Detalle producto |
| `tienda/veggie-espirulina-micro-rounds.html` | Tienda | Detalle producto |
| `tienda/veggies-espirulina-rounds.html` | Tienda | Detalle producto |
| `tienda/vitaheno-calendula.html` | Tienda | Detalle producto |
| `tienda/vitaheno-manzanilla.html` | Tienda | Detalle producto |
| `tienda/vitaheno-romero.html` | Tienda | Detalle producto |
| `nosotros.html` | Info | Página de marca |
| `contacto.html` | Info | Formulario de contacto |

**Estrategia:** Diseña primero `tienda.html` (el grid). Luego haz UNA página detalle (`veggie-espirulina-micro-rounds.html`) como plantilla y replica a las demás cambiando solo el contenido.

---

### 🟢 Luciana — branch: `feature/luciana`
**Páginas de contenido y comunidad (23 páginas)**

| Página | Sección | Tipo |
|--------|---------|------|
| `cuidados.html` | Cuidados | Hub de guías |
| `cuidados/agapornis.html` | Cuidados | Guía de especie |
| `cuidados/betta.html` | Cuidados | Guía de especie |
| `cuidados/canario.html` | Cuidados | Guía de especie |
| `cuidados/cobaya.html` | Cuidados | Guía de especie |
| `cuidados/conejo.html` | Cuidados | Guía de especie |
| `cuidados/hamster.html` | Cuidados | Guía de especie |
| `cuidados/periquito.html` | Cuidados | Guía de especie |
| `cuidados/pez-dorado.html` | Cuidados | Guía de especie |
| `cuidados/tetra-neon.html` | Cuidados | Guía de especie |
| `mundo-exotico.html` | Blog | Hub de artículos |
| `mundo-exotico/acuario-principiantes.html` | Blog | Artículo |
| `mundo-exotico/agua-acuario-quimica.html` | Blog | Artículo |
| `mundo-exotico/canarios-canto-salud.html` | Blog | Artículo |
| `mundo-exotico/cobaya-habitat-ideal.html` | Blog | Artículo |
| `mundo-exotico/conejos-exoticos-cuidados-basicos.html` | Blog | Artículo |
| `mundo-exotico/guia-cuidado-periquitos.html` | Blog | Artículo |
| `mundo-exotico/hamster-alimentacion-ejercicio.html` | Blog | Artículo |
| `mundo-exotico/pez-betta-cuidados.html` | Blog | Artículo |
| `mundo-exotico/pinzones-alimentacion-perfecta.html` | Blog | Artículo |
| `mundo-exotico/plantas-nativas-animales-exoticos.html` | Blog | Artículo |
| `mundo-exotico/suculentas-facil-cuidado.html` | Blog | Artículo |
| `mundo-exotico/terrario-plantas-reptiles.html` | Blog | Artículo |

**Estrategia:** Diseña `cuidados.html` (hub). Luego haz UNA guía (`hamster.html`) como plantilla y replica. Haz lo mismo con `mundo-exotico.html` y UN artículo como base.

---

## Flujo Git

```bash
# Los dos hacen esto al iniciar
git checkout main
git pull origin main

# Cada uno crea su branch
git checkout -b feature/miguel       # o feature/luciana
```

```bash
# Durante el trabajo — commits frecuentes
git add nombre-del-archivo.html
git commit -m "redesign: tienda.html grid layout"
git push origin feature/miguel
```

```bash
# Al terminar — crear PR en GitHub
# Ir a github.com/LucianaRamirez07/Exotik-Zoo
# New Pull Request: feature/miguel → main
# New Pull Request: feature/luciana → main
```

```bash
# Revisión conjunta → aprobar cada PR → merge
# Primero uno, luego el otro (para evitar conflictos)
git checkout main
git pull origin main
```

---

## Reglas para evitar conflictos

1. **Nunca tocar `index.html`** — ya está listo, no se toca.
2. **Nunca tocar archivos del otro** — Miguel no toca `cuidados/`, Luciana no toca `tienda/`.
3. **Misma versión del nav/footer** — acordada en el Paso 0.
4. **Un merge a la vez** — primero una PR, luego la otra, nunca los dos al mismo tiempo.

---

## Tokens de diseño clave (de DESIGN.md)

```
Primario:    #006b34  (verde esmeralda)
Secundario:  #9f402d  (terracota)
Superficie:  #faf9f6  (blanco cálido)
Texto:       #1a1c1a

Fuentes:     Bebas Neue (títulos) / Inter (cuerpo)
Radios:      12px en cards y botones
Contenedor:  max-w-container-max (1280px)
Padding:     px-margin-desktop (48px desktop) / px-margin-mobile (16px mobile)
```

---

## Checklist de revisión (antes de mergear)

- [ ] Nav y footer idénticos al de `index.html`
- [ ] Colores del sistema (sin hexadecimales hardcodeados fuera del Tailwind config)
- [ ] Responsive: se ve bien en móvil (320px) y desktop (1280px)
- [ ] Links de navegación apuntan a las páginas correctas (rutas relativas)
- [ ] No hay imágenes rotas
