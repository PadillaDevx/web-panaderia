/* home.js — Landing principal. Orquesta la inyección desde site-config. */

import { $, $$, el, picture, observeAnimations } from '../utils/dom.js';
import { whatsappUrl, currentYear, titleWithEm } from '../utils/helpers.js';
import { siteConfig } from '../data/site-config.js';
import { featuredProducts } from '../data/featured-products.js';
import { renderOrbit } from '../components/orbit.js';
import { renderStrip } from '../components/strip.js';
import { renderGallery } from '../components/gallery.js';
import * as icons from '../utils/icons.js';

/* Branding en el hero (reemplaza navbar) */
function renderBrand() {
    const brand = $('[data-hero-brand]');
    if (!brand) return;
    if (siteConfig.logo) {
        brand.appendChild(el('img', { src: siteConfig.logo, alt: siteConfig.name, class: 'hero__brand-logo' }));
        brand.appendChild(el('span', { class: 'hero__brand-name' }, [siteConfig.name]));
    } else {
        brand.textContent = siteConfig.name;
    }
}

/* Hero */
function renderHero() {
    const h = siteConfig.hero;
    const wa = whatsappUrl(siteConfig.whatsapp.phone, siteConfig.whatsapp.message);

    $('[data-hero-badge]').textContent = h.badge;
    $('[data-hero-title]').innerHTML = titleWithEm(h.title);
    $('[data-hero-subtitle]').textContent = h.subtitle;

    const btnPri = $('[data-hero-cta-primary]');
    btnPri.href = wa;
    btnPri.querySelector('[data-label]').textContent = h.ctaPrimary;

    const btnSec = $('[data-hero-cta-secondary]');
    btnSec.href = h.ctaSecondary.href;
    btnSec.textContent = h.ctaSecondary.label;

    renderOrbit($('[data-hero-orbit]'), h.collage);
}

/* Nosotros */
function renderAbout() {
    const a = siteConfig.about;
    const media = $('[data-about-media]');
    media.insertBefore(
        picture(a.image.src, {
            alt: a.image.alt,
            loading: 'lazy',
            width: a.image.width || 900,
            height: a.image.height || 700,
        }),
        media.firstChild,
    );
    a.phrases.forEach(p => $('[data-about-phrases]').appendChild(el('p', { class: 'about__phrase' }, [p])));
    $('[data-about-eyebrow]').textContent = a.eyebrow;
    $('[data-about-title]').innerHTML = titleWithEm(a.title);
    $('[data-about-quote]').textContent = a.quote;
    $('[data-about-text]').textContent = a.text;
    $('[data-about-signature]').textContent = a.signature;
}

/* Contacto */
function renderContact() {
    const c = siteConfig.contact;
    const wa = whatsappUrl(siteConfig.whatsapp.phone, siteConfig.whatsapp.message);

    $('[data-contact-eyebrow]').textContent = c.eyebrow;
    $('[data-contact-title]').innerHTML = titleWithEm(c.title);
    $('[data-contact-subtitle]').textContent = c.subtitle;

    const cta = $('[data-contact-cta]');
    cta.href = wa;
    cta.innerHTML = `${icons.whatsapp} ${c.cta}`;

    const rows = [
        { icon: icons.pin,   label: 'Dirección', value: siteConfig.address },
        { icon: icons.clock, label: 'Horario',   value: siteConfig.schedule },
        { icon: icons.phone, label: 'WhatsApp',  value: `+${siteConfig.whatsapp.phone}` },
    ];
    const rowsEl = $('[data-contact-rows]');
    rows.forEach(row => {
        rowsEl.appendChild(el('div', { class: 'contact-row' }, [
            el('span', { class: 'contact-row__icon', html: row.icon }),
            el('div', {}, [
                el('p', { class: 'contact-row__label' }, [row.label]),
                el('p', { class: 'contact-row__value' }, [row.value]),
            ]),
        ]));
    });
}

/* Footer */
function renderFooter() {
    $('[data-footer-brand]').textContent = siteConfig.name;
    $('[data-footer-meta]').textContent =
        `© ${currentYear()} ${siteConfig.name} · Todos los derechos reservados`;

    // Render social media icons
    if (!siteConfig.social) return;

    const { instagram, facebook, tiktok } = siteConfig.social;
    const socials = [
        { key: instagram, url: `https://www.instagram.com/${instagram}`, label: 'Instagram', icon: icons.instagram, ariaLabel: 'Visita nuestra página de Instagram' },
        { key: facebook, url: `https://www.facebook.com/${facebook}`, label: 'Facebook', icon: icons.facebook, ariaLabel: 'Visita nuestra página de Facebook' },
        { key: tiktok, url: `https://www.tiktok.com/@${tiktok}`, label: 'TikTok', icon: icons.tiktok, ariaLabel: 'Visita nuestra página de TikTok' },
    ].filter(s => s.key);

    const socialsContainer = $('[data-footer-socials]');
    if (socials.length > 0) {
        socials.forEach(social => {
            socialsContainer.appendChild(el('a', {
                href: social.url,
                class: 'footer__social-link',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: social.label,
                'aria-label': social.ariaLabel,
                html: social.icon,
            }));
        });
    }
}

/* Init */
function init() {
    renderBrand();
    renderHero();
    renderStrip($('[data-strip-track]'), siteConfig.strip);
    renderGallery($('[data-gallery]'), featuredProducts);
    $('[data-gallery-eyebrow]').textContent = siteConfig.gallery.eyebrow;
    $('[data-gallery-title]').innerHTML = titleWithEm(siteConfig.gallery.title, false);
    renderAbout();
    renderContact();
    renderFooter();
    observeAnimations();
}

document.addEventListener('DOMContentLoaded', init);
