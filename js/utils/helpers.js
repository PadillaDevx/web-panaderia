/**
 * helpers.js — Funciones puras de soporte (urls, texto, etc.).
 */

/** Construye una URL de WhatsApp clickable. */
export function whatsappUrl(phone, message = '') {
    const clean = String(phone).replace(/[^\d]/g, '');
    const text = encodeURIComponent(message);
    return `https://wa.me/${clean}${text ? `?text=${text}` : ''}`;
}

/** Año actual (usado en el pie de página y cálculos de antigüedad). */
export function currentYear() {
    return new Date().getFullYear();
}

/** Convierte un array de dos partes en título HTML con cursiva. */
export function titleWithEm(parts, br = true) {
    return `${parts[0]}${br ? '<br>' : ' '}<em>${parts[1]}</em>`;
}

/** "Pan Dulce" → "pan-dulce" */
export function slugify(str) {
    return String(str)
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
