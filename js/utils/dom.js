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
 * Crea un elemento `<picture>` con fuente WebP y fallback JPEG.
 *
 * Si `src` termina en `.webp`, se añade un `<source type="image/webp">`
 * con esa ruta y el `<img>` usa la ruta `.jpeg` equivalente como fallback
 * (los navegadores con soporte WebP usarán el `<source>`; los demás, el `<img>`).
 *
 * **Requisito**: cada imagen `.webp` en `gallery/` debe tener su `.jpeg`
 * homólogo con el mismo nombre base para que el fallback funcione.
 *
 * @param {string} src          - Ruta a la imagen WebP (u otro formato si no es WebP)
 * @param {object} [attrs={}]   - Atributos para el `<img>` interior (alt, loading, width, height…)
 * @returns {HTMLPictureElement}
 */
export function picture(src, attrs = {}) {
    const picEl = document.createElement('picture');

    if (src.endsWith('.webp')) {
        const source = document.createElement('source');
        source.srcset = src;
        source.type = 'image/webp';
        picEl.appendChild(source);
    }

    const fallbackSrc = src.endsWith('.webp') ? src.replace(/\.webp$/, '.jpeg') : src;
    picEl.appendChild(el('img', { src: fallbackSrc, ...attrs }));

    return picEl;
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
