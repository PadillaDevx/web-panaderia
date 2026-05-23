/**
 * dom.js — Utilidades mínimas de manipulación del DOM.
 */

/** Selector único. Lanza error si no existe (útil en desarrollo). */
export function $(selector, scope = document) {
    const node = scope.querySelector(selector);
    if (!node) throw new Error(`[dom] No se encontró el selector: ${selector}`);
    return node;
}

/** Selector múltiple devuelto como array. */
export function $$(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

/**
 * Crea un elemento HTML con atributos e hijos.
 * @param {string} tag
 * @param {object} [attrs]   - atributos: {class, id, src, alt, dataset, ...}
 * @param {(Node|string)[]} [children]
 * @returns {HTMLElement}
 */
export function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);

    for (const [key, value] of Object.entries(attrs)) {
        if (value == null || value === false) continue;
        if (key === 'class') node.className = value;
        else if (key === 'dataset') Object.assign(node.dataset, value);
        else if (key === 'html') node.innerHTML = value;
        else if (key in node) node[key] = value;
        else node.setAttribute(key, value);
    }

    children.forEach(child => {
        if (child == null) return;
        node.append(child instanceof Node ? child : document.createTextNode(child));
    });

    return node;
}

/** Vacía completamente un nodo (más rápido que innerHTML = ''). */
export function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
}

/**
 * Activa animaciones de entrada para todos los elementos con [data-animate].
 * Cada elemento se anima una sola vez al entrar en pantalla.
 */
export function observeAnimations(scope = document) {
    const targets = $$('[data-animate]', scope);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    targets.forEach(t => observer.observe(t));
}
