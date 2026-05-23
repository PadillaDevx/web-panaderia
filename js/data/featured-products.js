/**
 * featured-products.js — Productos destacados que aparecen en la galería staggered del home.
 *
 * Modificadores disponibles en "mods" (controlan el layout de la grilla):
 *   'tall'      → la tarjeta ocupa 2 filas (énfasis vertical)
 *   'wide'      → la tarjeta ocupa 2 columnas (posición superior)
 *   'featured'  → la tarjeta ocupa 2 columnas (posición inferior)
 */

export const featuredProducts = [
    { name: 'Muffins de Chocolate', type: 'Pan Dulce', image: 'gallery/Foto 9.webp', mods: ['tall'] },
    { name: 'Pan Integral', type: 'Con Semillas', image: 'gallery/Foto 3.webp', mods: [] },
    { name: 'Donas Glaseadas', type: 'Artesanal', image: 'gallery/Foto 13.webp', mods: [] },
    { name: 'Galletas de Avena', type: 'Con Granola', image: 'gallery/Foto 6.webp', mods: ['wide'] },
    { name: 'Roles de Azúcar', type: 'Pan Dulce', image: 'gallery/Foto 8.webp', mods: [] },
    { name: 'Cuernitos', type: 'Hojaldrado', image: 'gallery/Foto 10.webp', mods: ['featured'] },
];
