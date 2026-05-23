/**
 * menu-renderer.js — Renderiza el menú completo en /menu/ a partir de menu.json.
 * Soporta tres layouts declarados en el JSON:
 *   - double-group  → dos grupos lado a lado (p.ej. Bebidas calientes)
 *   - two-column    → ítems divididos en dos columnas (p.ej. Frapes)
 *   - single-column → lista única (p.ej. Toppings)
 */

import { el, clear } from '../utils/dom.js';
import { slugify } from '../utils/helpers.js';

/**
 * @param {object}      refs          - referencias DOM
 * @param {HTMLElement} refs.tabs     - contenedor .menu__tabs
 * @param {HTMLElement} refs.content  - donde se inyectan las categorías
 * @param {object}      menu          - estructura {categories: [...]}
 */
export function renderMenu(refs, menu) {
    clear(refs.tabs);
    clear(refs.content);

    if (!menu?.categories?.length) {
        refs.content.appendChild(
            el('p', { class: 'menu__error' }, ['No hay productos disponibles por ahora.']),
        );
        return;
    }

    /* ── Tabs sticky de categorías ── */
    menu.categories.forEach((cat, idx) => {
        const id = `cat-${slugify(cat.name)}`;
        const tab = el('a', {
            class: `menu__tab${idx === 0 ? ' is-active' : ''}`,
            href: `#${id}`,
            dataset: { category: id },
        }, [cat.name]);
        refs.tabs.appendChild(tab);
    });

    /* ── Contenido de cada categoría ── */
    menu.categories.forEach(cat => {
        const id = `cat-${slugify(cat.name)}`;

        const header = el('header', { class: 'menu-category__header' }, [
            el('h2', { class: 'menu-category__title' }, [cat.name]),
            cat.subtitle
                ? el('p', { class: 'menu-category__subtitle' }, [cat.subtitle])
                : null,
            el('div', { class: 'menu-category__bar', 'aria-hidden': 'true' }),
        ]);

        refs.content.appendChild(
            el('section', { class: 'menu-category', id }, [header, buildLayout(cat)]),
        );
    });

    enableActiveTabOnScroll(refs.tabs);
}


/* ════════════════════════════════════════════════════════════════
   DISPATCHER DE LAYOUTS
   ════════════════════════════════════════════════════════════════ */

function buildLayout(cat) {
    switch (cat.layout) {
        case 'double-group': return buildDoubleGroup(cat.groups);
        case 'two-column': return buildTwoColumn(cat.items);
        case 'single-column':
        default: return buildSingleColumn(cat.items);
    }
}


/* ════════════════════════════════════════════════════════════════
   LAYOUT: DOBLE GRUPO
   Dos grupos uno al lado del otro, cada uno con su propio header.
   Usado en "Bebidas calientes".
   ════════════════════════════════════════════════════════════════ */

function buildDoubleGroup(groups) {
    const wrapper = el('div', { class: 'menu-double-group' });

    groups.forEach(group => {
        const groupEl = el('div', { class: 'menu-group' });

        /* Nombre del sub-grupo */
        groupEl.appendChild(el('p', { class: 'menu-group__name' }, [group.name]));

        /* Nota opcional (ej. "Con adición de:") */
        if (group.note) {
            groupEl.appendChild(el('p', { class: 'menu-group__note' }, [group.note]));
        }

        /* Cabeceras de tallas (ej. Chico / Grande) */
        if (group.sizes) {
            const sizesEl = el('div', { class: 'menu-group__sizes' });
            group.sizes.forEach(s => sizesEl.appendChild(el('span', {}, [s])));
            groupEl.appendChild(sizesEl);
        }

        /* Ítems */
        const list = el('ul', { class: 'menu-list' });
        group.items.forEach(item => {
            const row = el('li', { class: 'menu-list__item' });
            row.appendChild(el('span', { class: 'menu-list__name' }, [item.name]));

            if (Array.isArray(item.prices)) {
                /* Dos precios (chico / grande) */
                const pricesEl = el('span', { class: 'menu-list__prices' });
                item.prices.forEach(p =>
                    pricesEl.appendChild(el('span', { class: 'menu-list__price' }, [`$${p}`])),
                );
                row.appendChild(pricesEl);
            } else {
                /* Precio único; el prefijo "+" indica que es adición */
                const prefix = item.addon ? '+' : '';
                row.appendChild(
                    el('span', { class: 'menu-list__price' }, [`${prefix}$${item.price}`]),
                );
            }

            list.appendChild(row);
        });

        groupEl.appendChild(list);
        wrapper.appendChild(groupEl);
    });

    return wrapper;
}


/* ════════════════════════════════════════════════════════════════
   LAYOUT: DOS COLUMNAS
   Los ítems se dividen en dos mitades iguales.
   Usado en "Frapes" y "Bebidas endulzadas".
   ════════════════════════════════════════════════════════════════ */

function buildTwoColumn(items) {
    const half = Math.ceil(items.length / 2);
    const cols = [items.slice(0, half), items.slice(half)];
    const wrapper = el('div', { class: 'menu-two-col' });

    cols.forEach(col => {
        const list = el('ul', { class: 'menu-list' });
        col.forEach(item => {
            /* Nombre con badge ESPECIAL opcional */
            const nameEl = el('span', { class: 'menu-list__name' });
            nameEl.appendChild(document.createTextNode(item.name));
            if (item.tag) {
                nameEl.appendChild(el('span', { class: 'menu-list__tag' }, [item.tag]));
            }

            const row = el('li', { class: 'menu-list__item' });
            row.appendChild(nameEl);
            row.appendChild(el('span', { class: 'menu-list__price' }, [`$${item.price}`]));
            list.appendChild(row);
        });
        wrapper.appendChild(list);
    });

    return wrapper;
}


/* ════════════════════════════════════════════════════════════════
   LAYOUT: COLUMNA ÚNICA
   Lista simple de nombre + precio.
   Usado en "Toppings".
   ════════════════════════════════════════════════════════════════ */

function buildSingleColumn(items) {
    const list = el('ul', { class: 'menu-list' });
    items.forEach(item => {
        const row = el('li', { class: 'menu-list__item' });
        row.appendChild(el('span', { class: 'menu-list__name' }, [item.name]));
        row.appendChild(el('span', { class: 'menu-list__price' }, [`$${item.price}`]));
        list.appendChild(row);
    });
    return list;
}


/* ════════════════════════════════════════════════════════════════
   SCROLL SPY — marca como activa la tab de la categoría visible
   ════════════════════════════════════════════════════════════════ */

function enableActiveTabOnScroll(tabsContainer) {
    const tabs = Array.from(tabsContainer.children);
    const setActive = id =>
        tabs.forEach(t => t.classList.toggle('is-active', t.dataset.category === id));

    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
    }, { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] });

    document.querySelectorAll('.menu-category').forEach(s => observer.observe(s));
}
