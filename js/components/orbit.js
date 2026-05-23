/**
 * orbit.js — Renderiza el collage circular del hero.
 */

import { el, clear, picture } from '../utils/dom.js';

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
            picture(data.center.src, {
                alt: data.center.alt,
                loading: 'eager',
                width: data.center.width || 600,
                height: data.center.height || 600,
            }),
        ]),
    );

    /* Satélites — posición numerada 1..N */
    data.satellites.forEach((sat, i) => {
        container.appendChild(
            el('div', { class: `orbit__satellite orbit__satellite--${i + 1}` }, [
                picture(sat.src, {
                    alt: sat.alt,
                    loading: 'lazy',
                    width: sat.width || 300,
                    height: sat.height || 300,
                }),
            ]),
        );
    });
}
