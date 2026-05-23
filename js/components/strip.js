/**
 * strip.js — Renderiza la franja animada (marquee) de palabras clave.
 * Los items se duplican para lograr un loop infinito sin saltos.
 */

import { el, clear } from '../utils/dom.js';

/**
 * @param {HTMLElement} container - elemento .strip__track vacío
 * @param {string[]}    items
 */
export function renderStrip(container, items) {
    clear(container);
    /* Duplicado para animación continua: el CSS traslada -50% */
    const list = [...items, ...items];
    list.forEach(text => {
        container.appendChild(el('span', { class: 'strip__item' }, [text]));
    });
}
