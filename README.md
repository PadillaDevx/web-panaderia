# Panadería José — Landing + Menú QR

Landing page estática y página de menú accesible por QR para **Panadería José**.
Hecha en **HTML + CSS + JavaScript vanilla**, sin frameworks, sin bundlers,
sin backend. Desplegable directamente en GitHub Pages, Netlify, Vercel, etc.

---

## 📁 Estructura

```
panaderia-jose/
│
├── index.html              ← Landing principal
├── menu/
│   └── index.html          ← Página de menú (QR target)
│
├── assets/
│   ├── images/             ← Imágenes reales en .webp
│   │   ├── hero/           ← Collage del hero y nosotros
│   │   ├── gallery/        ← Galería staggered del home
│   │   ├── products/       ← Productos destacados extra
│   │   ├── menu/           ← Fotos de cada platillo del menú
│   │   └── logo/           ← Logo en distintos formatos
│   ├── icons/              ← Iconos e SVGs decorativos
│   └── qr/                 ← Código QR generado para impresión
│
├── css/
│   ├── main.css            ← Aggregator (importa todo lo demás)
│   ├── base/               ← Reset, variables, tipografía, utilidades
│   ├── layout/             ← Container, sections, grids
│   ├── components/         ← Botones, orbit, gallery, strip, cards, contact
│   └── pages/              ← Estilos específicos de home y menú
│
├── js/
│   ├── pages/              ← Punto de entrada por página (home.js, menu.js)
│   ├── components/         ← Renderers reutilizables (orbit, strip, gallery, menu)
│   ├── data/               ← Configuración y contenido editable
│   │   ├── site-config.js
│   │   ├── featured-products.js
│   │   └── menu.json
│   └── utils/              ← Helpers genéricos (dom, helpers)
│
└── README.md
```

---

## 🚀 Cómo desarrollar

El proyecto usa **ES Modules nativos** (`<script type="module">`) y `fetch()`
para cargar `menu.json`, por lo que **no se puede abrir con `file://`** — necesitas
un servidor estático local.

Cualquiera de estos funciona:

```bash
# Opción 1 — Python
python3 -m http.server 8080

# Opción 2 — Node (sin instalar nada permanente)
npx serve .

# Opción 3 — VS Code: extensión "Live Server"
```

Luego abre:

- Landing: <http://localhost:8080/>
- Menú QR: <http://localhost:8080/menu/>

---

## ✏️ Cómo editar contenido

**Todo el contenido editable está en `js/data/`**. No hace falta tocar HTML/CSS.

| Quieres cambiar…                          | Edita el archivo                  |
|-------------------------------------------|-----------------------------------|
| Nombre, teléfono, dirección, horario      | `js/data/site-config.js`          |
| Textos de hero, nosotros, contacto        | `js/data/site-config.js`          |
| Galería de productos del home             | `js/data/featured-products.js`    |
| Categorías y precios del menú QR          | `js/data/menu.json`               |
| Colores, fuentes, espaciado               | `css/base/variables.css`          |

### Cambiar el número de WhatsApp

En `js/data/site-config.js`:

```js
whatsapp: {
  phone:   '521XXXXXXXXXX',   // sin "+", sin espacios, sin guiones
  message: 'Hola, me gustaría hacer un pedido 🥖',
},
```

### Agregar un producto al menú

En `js/data/menu.json`, dentro de la categoría correspondiente:

```json
{
  "name": "Concha de Fresa",
  "description": "Pan dulce con cubierta de fresa natural.",
  "price": 20,
  "image": "assets/images/menu/concha-fresa.webp"
}
```

Coloca la foto en `assets/images/menu/` y listo.

### Agregar una nueva categoría al menú

```json
{
  "name": "Postres",
  "items": [ ... ]
}
```

---

## 🖼️ Imágenes

- Formato recomendado: **`.webp`** (mejor relación calidad/peso).
- Tamaños sugeridos:
  - Collage hero (centro): **600×600 px**
  - Collage hero (satélites): **300×300 px**
  - Galería staggered: **800×600 px**
  - Productos del menú: **600×450 px**
  - Nosotros: **900×700 px**
- Todas las imágenes referenciadas viven en `assets/images/`. No hay base64
  ni imágenes embebidas en HTML/CSS.

---

## 🧱 Arquitectura

### CSS — Capas

1. **base** — reset, variables, tipografía, utilidades atómicas
2. **layout** — contenedores, secciones, grids
3. **components** — bloques reutilizables (BEM)
4. **pages** — estilos exclusivos de una página

`main.css` importa todo en el orden correcto. Cada página solo carga `main.css`.

### JavaScript — Capas

1. **utils/** — funciones puras (DOM helpers, formato, urls)
2. **data/** — contenido editable, sin lógica
3. **components/** — renderers reutilizables, reciben `(contenedor, datos)`
4. **pages/** — orquestadores: importan datos + componentes y los inyectan en el DOM

### Convenciones

- **CSS**: BEM (`bloque__elemento--modificador`).
- **HTML**: atributos `data-*` para referencias del JS (no se mezclan con clases de estilo).
- **JS**: ES Modules, sin variables globales.
- **A11y**: `aria-label`, `aria-hidden`, soporte de `prefers-reduced-motion`.

---

## 📦 Despliegue

### GitHub Pages

```bash
git init && git add . && git commit -m "first deploy"
git branch -M main
git remote add origin <tu-repo>
git push -u origin main
```

En `Settings → Pages` selecciona `main` / `/ (root)`. Listo.

### Netlify / Vercel

Drag & drop de la carpeta completa — sin configuración.

---

## 🔗 Generar el QR del menú

Cuando esté desplegado, genera el QR que apunte a:

```
https://tu-dominio.com/menu/
```

Usa cualquier generador (qr-code-generator.com, etc.) y guarda el PNG/SVG
final en `assets/qr/` para imprimirlo.
