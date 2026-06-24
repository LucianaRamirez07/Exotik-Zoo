---
name: Exotic Botanical Boutique
colors:
  surface: '#faf9f6'
  surface-dim: '#dadad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#eeeeea'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#3f493f'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ed'
  outline: '#6f7a6f'
  outline-variant: '#becabd'
  surface-tint: '#006d35'
  primary: '#006b34'
  on-primary: '#ffffff'
  primary-container: '#258549'
  on-primary-container: '#f6fff3'
  inverse-primary: '#7eda94'
  secondary: '#9f402d'
  on-secondary: '#ffffff'
  secondary-container: '#fd876f'
  on-secondary-container: '#732010'
  tertiary: '#765700'
  on-tertiary: '#ffffff'
  tertiary-container: '#956e00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#99f7ae'
  primary-fixed-dim: '#7eda94'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a5'
  on-secondary-fixed: '#3e0500'
  on-secondary-fixed-variant: '#802918'
  tertiary-fixed: '#ffdfa0'
  tertiary-fixed-dim: '#fbbc00'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3df'
typography:
  display-lg:
    fontFamily: Bebas Neue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.03em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system reflects a premium, high-end specialty boutique that bridges the gap between scientific animal husbandry and lush, organic aesthetics. The brand personality is authoritative yet vibrant, evoking a sense of discovery and meticulous care. 

The visual style is **Corporate Modern with a Biophilic edge**. It utilizes expansive white space to denote cleanliness and professionalism, punctuated by high-saturation nature photography and bold, structured typography. The UI should feel intentional and trustworthy, ensuring that the specialized nature of exotic pet care is presented with clarity and elegance.

## Colors
The palette is rooted in the natural world. **Deep Emerald (#2D8B4E)** serves as the primary anchor, representing vitality and expertise in flora and fauna. **Terracotta (#E2725B)** is used as a secondary accent for floral categories and organic elements, providing a warm, earthy contrast. **Soft Amber (#FFBF00)** is reserved for high-priority calls to action and "scientific" highlights (e.g., specialized supplements). 

Neutrals are slightly warmed to avoid a sterile feel; the primary text uses a near-black "Jungle Shade" (#1A1C1A) to maintain high legibility against clean, off-white backgrounds.

## Typography
This design system employs a high-contrast typographic pairing. **Bebas Neue** is used for impactful headlines and category titles, providing a vertical, commanding presence that feels like a modern editorial magazine. 

**Inter** is the workhorse for all functional data. It is used for product descriptions, pricing, and navigation to ensure maximum readability. Use `label-caps` for technical specifications (e.g., "HUMIDITY REQUIREMENTS" or "ORIGIN") to provide a structured, scientific look.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a maximum container width of 1280px for desktop. It uses an 8px spatial rhythm for all padding and margins. 

On desktop, use a 12-column grid. For product galleries, a 3 or 4-column span is preferred to allow the high-quality animal and plant photography to breathe. On mobile, transition to a 2-column "masonry-lite" or single-column stack with increased vertical padding (32px minimum between sections) to maintain the premium, unhurried shopping experience.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and extremely subtle **Ambient Shadows**. This design system avoids heavy shadows to maintain a clean, boutique aesthetic. 

- **Level 0 (Base):** Off-white or very light grey surfaces.
- **Level 1 (Cards/Containers):** Pure white background with a 1px border (#E0E4E0) or a soft shadow (0px 4px 20px rgba(0,0,0,0.04)).
- **Level 2 (Interactive):** When hovering over product cards, the shadow should deepen slightly and the border should transition to the Primary Green.
- **Overlays:** Use a 40% opacity blur for modals to maintain the lush background colors while focusing the user.

## Shapes
The shape language is defined by **12px (0.75rem) radii** on all primary containers, buttons, and input fields. This specific degree of roundness strikes a balance between the organic curves of nature and the precision of a professional laboratory. 

Icons should use a medium stroke weight (2px) with rounded caps to match the UI’s geometry. Product images should always carry the `rounded-lg` (1rem) treatment to feel integrated into the design.

## Components

### Buttons
- **Primary:** Solid Deep Emerald background with White Inter Medium text. High-contrast and impactful.
- **Secondary (Floral/Organic):** Solid Terracotta background with White text, used specifically for "Add to Cart" on plant-life or lifestyle items.
- **Outline:** 2px Emerald border with Emerald text for "View Details" or secondary actions.

### Cards
Product cards should have a fixed aspect ratio for images (usually 4:5 or 1:1) to keep the grid orderly. Use a subtle tag in the top-right corner using `label-caps` to indicate category (e.g., "LIVE ANIMAL", "ORGANIC", "REPTILE CARE").

### Input Fields
Inputs use a 12px corner radius and a light grey background. On focus, the border transitions to a 2px Deep Emerald stroke. Labels are consistently placed above the field in `body-sm` bold.

### Chips & Badges
Use for attributes like "Eco-Friendly," "Low Maintenance," or "Beginner Friendly." These should have a light tinted background of the primary color with dark green text, keeping them legible but secondary to the main content.

### Lists
Scientific data lists (e.g., feeding schedules or habitat requirements) should use alternating row tints and clear "Jungle Shade" icons for bullet points to ensure information is scannable and professional.