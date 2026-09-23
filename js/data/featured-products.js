/**
 * featured-products.js — Productos destacados que aparecen en la galería staggered del home.
 *
 * Modificadores disponibles en "mods" (controlan el layout de la grilla):
 *   'tall'      → la tarjeta ocupa 2 filas (énfasis vertical)
 *   'wide'      → la tarjeta ocupa 2 columnas (posición superior)
 *   'featured'  → la tarjeta ocupa 2 columnas (posición inferior)
 */

export const featuredProducts = [
    { name: 'Muffins de Chocolate', type: 'Pan Dulce', image: 'gallery/nuestra-produccion-01.webp', mods: ['tall'] },
    { name: 'Pan Integral', type: 'Con Semillas', image: 'gallery/nuestra-produccion-02.webp', mods: [] },
    { name: 'Donas Glaseadas', type: 'Artesanal', image: 'gallery/nuestra-produccion-03.webp', mods: [] },
    { name: 'Galletas de Avena', type: 'Con Granola', image: 'gallery/nuestra-produccion-04.webp', mods: ['wide'] },
    { name: 'Roles de Azúcar', type: 'Pan Dulce', image: 'gallery/nuestra-produccion-05.webp', mods: [] },
    { name: 'Cuernitos', type: 'Hojaldrado', image: 'gallery/nuestra-produccion-06.webp', mods: ['featured'] },
];
