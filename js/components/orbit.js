/**
 * orbit.js — Renderiza el collage circular del hero.
 */

import { el, clear } from '../utils/dom.js';

/**
 * @param {HTMLElement} container - elemento .orbit vacío
 * @param {{center, satellites}} data
 */
export function renderOrbit(container, data) {
    clear(container);

    /* Anillo decorativo punteado */
    container.appendChild(el('div', { class: 'orbit__ring', 'aria-hidden': 'true' }));

    /* Imagen central */
    container.appendChild(
        el('div', { class: 'orbit__center' }, [
            el('img', { src: data.center.src, alt: data.center.alt, loading: 'lazy' }),
        ]),
    );

    /* Satélites — posición numerada 1..N */
    data.satellites.forEach((sat, i) => {
        container.appendChild(
            el('div', { class: `orbit__satellite orbit__satellite--${i + 1}` }, [
                el('img', { src: sat.src, alt: sat.alt, loading: 'lazy' }),
            ]),
        );
    });
}
