/**
 * gallery.js — Renderiza la galería staggered de productos destacados.
 */

import { el, clear } from '../utils/dom.js';

/**
 * @param {HTMLElement} container - elemento .gallery vacío
 * @param {Array}       items     - colección con {name, type, image, mods}
 */
export function renderGallery(container, items) {
    clear(container);

    items.forEach(item => {
        const classes = ['gallery__item', ...item.mods.map(m => `gallery__item--${m}`)].join(' ');

        const article = el('article', { class: classes }, [
            el('img', { src: item.image, alt: item.name, loading: 'lazy' }),
            el('div', { class: 'gallery__overlay', 'aria-hidden': 'true' }),
            el('div', { class: 'gallery__label' }, [
                el('p', { class: 'gallery__name' }, [item.name]),
                el('p', { class: 'gallery__type' }, [item.type]),
            ]),
        ]);

        container.appendChild(article);
    });
}
