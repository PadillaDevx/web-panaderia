/**
 * promo-video.js — Renderiza el showcase de novedades dentro de la galería.
 *
 * El video se reproduce silenciado en loop dentro del banner (sin controles),
 * dando movimiento al bloque. Al hacer clic se abre un modal con el video
 * completo, controles nativos, cierre por botón / click-fuera / tecla Esc.
 */

import { el, clear } from '../utils/dom.js';
import * as icons from '../utils/icons.js';

let openModal = null;

function buildModal(video) {
    const closeBtn = el('button', {
        class: 'modal__close',
        type: 'button',
        'aria-label': 'Cerrar video',
    }, []);

    const player = el('video', {
        class: 'modal__video',
        controls: true,
        autoplay: true,
        playsinline: true,
    }, [
        el('source', { src: video.src, type: 'video/mp4' }),
    ]);

    const modal = el('div', {
        class: 'modal',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': video.title,
    }, [
        el('div', { class: 'modal__backdrop', 'data-modal-close': '' }),
        el('div', { class: 'modal__dialog' }, [closeBtn, player]),
    ]);

    closeBtn.innerHTML = icons.close;

    return { modal, closeBtn, player };
}

/**
 * @param {HTMLElement} container  - elemento .promo vacío
 * @param {object}     data       - { eyebrow, title, subtitle, ctaLabel, src, poster }
 */
export function renderPromo(container, data) {
    if (!container || !data) return;
    clear(container);

    /* ── Banner con video de fondo ── */
    const bgVideo = el('video', {
        class: 'promo__bg',
        muted: true,
        loop: true,
        autoplay: true,
        playsinline: true,
        'aria-hidden': 'true',
    }, [
        el('source', { src: data.src, type: 'video/mp4' }),
    ]);

    const playIcon = el('span', {
        class: 'promo__play',
        'aria-hidden': 'true',
        html: icons.play,
    });

    const banner = el('div', {
        class: 'promo__banner',
        role: 'button',
        tabindex: '0',
        'aria-label': `${data.ctaLabel} — ${data.title}`,
    }, [
        bgVideo,
        el('span', { class: 'promo__overlay', 'aria-hidden': 'true' }),
        el('div', { class: 'promo__content' }, [
            el('span', { class: 'promo__eyebrow' }, [data.eyebrow]),
            el('h3', { class: 'promo__title' }, [data.title]),
            el('p', { class: 'promo__subtitle' }, [data.subtitle]),
            el('span', { class: 'promo__cta' }, [data.ctaLabel, ' ', el('span', { class: 'promo__arrow', html: '→' })]),
        ]),
        playIcon,
    ]);

    container.appendChild(banner);

    /* ── Modal ── */
    const { modal, closeBtn, player } = buildModal(data);
    document.body.appendChild(modal);

    const close = () => {
        player.pause();
        player.removeAttribute('src');
        player.load();
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 250);
        openModal = null;
    };

    const open = () => {
        document.body.style.overflow = 'hidden';
        modal.classList.add('is-open');
        openModal = close;
        try { player.play(); } catch (_) { /* autoplay bloqueado */ }
    };

    banner.addEventListener('click', open);
    banner.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
        }
    });
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
    modal.querySelector('[data-modal-close]').addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && openModal === close) close();
    });
}