/**
 * menu.js — Punto de entrada de la página /menu/.
 * Carga menu.json y delega el renderizado al componente menu-renderer.
 */

import { $ } from '../utils/dom.js';
import { whatsappUrl } from '../utils/helpers.js';
import { siteConfig } from '../data/site-config.js';
import { renderMenu } from '../components/menu-renderer.js';
import * as icons from '../utils/icons.js';

/* La ruta del JSON es relativa al HTML de /menu/ */
const MENU_JSON_URL = '../js/data/menu.json';


function renderHeader() {
    $('[data-menu-brand]').textContent = siteConfig.name;
    $('[data-menu-title]').innerHTML = 'Nuestro <em>menú</em>';
    $('[data-menu-subtitle]').textContent =
        'Todos nuestros productos artesanales, horneados frescos cada mañana.';
    $('[data-menu-back]').href = '../';

    /* CTA flotante de WhatsApp */
    const fab = $('[data-menu-fab]');
    fab.href = whatsappUrl(siteConfig.whatsapp.phone, siteConfig.whatsapp.message);
    fab.innerHTML = `${icons.whatsapp} Ordenar`;
}


async function loadMenu() {
    const content = $('[data-menu-content]');
    try {
        const res = await fetch(MENU_JSON_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        renderMenu({ tabs: $('[data-menu-tabs]'), content }, data);
    } catch (err) {
        console.error('[menu] error cargando menu.json:', err);
        content.innerHTML =
            '<p class="menu__error">No se pudo cargar el menú. Intenta de nuevo más tarde.</p>';
    }
}


function init() {
    renderHeader();
    loadMenu();
}

document.addEventListener('DOMContentLoaded', init);
