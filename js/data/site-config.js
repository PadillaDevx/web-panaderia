/**
 * site-config.js — Configuración global del sitio.
 * Único punto de edición para textos, contacto, redes y rutas comunes.
 */

export const siteConfig = {

    /* ── Identidad ── */
    name: 'Panadería José',
    foundedYear: 1985,
    logo: 'gallery/Logo.webp',

    /* ── Contacto (sin símbolos, en formato internacional) ── */
    whatsapp: {
        phone: '521XXXXXXXXXX',
        message: 'Hola, me gustaría hacer un pedido',
    },

    address: 'Calle Principal #123, Col. Centro',
    schedule: 'Lun – Sáb: 7:00 am – 8:00 pm',

    /* ── Rutas internas ── */
    routes: {
        home: '/',
        menu: '/menu/',
    },

    /* ── Redes sociales (vacío = no se renderiza) ── */
    social: {
        instagram: '',
        facebook: '',
        tiktok: '',
    },

    /* ── Navegación principal (sin enlace al menú — acceso solo por QR) ── */
    nav: [
        { label: 'Galería', href: '#galeria' },
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Contacto', href: '#contacto' },
    ],


    /* ── Contenido: Hero ── */
    hero: {
        badge: '✦ Panadería artesanal',
        title: ['El sabor que', 'nunca olvidas'],
        subtitle: 'Cada pieza horneada con amor, ingredientes frescos y las recetas que han pasado de generación en generación.',
        ctaPrimary: 'Ordenar por WhatsApp',
        ctaSecondary: { label: 'Ver nuestro trabajo', href: '#galeria' },
        collage: {
            center: { src: 'gallery/Foto 4.webp', alt: 'Galletas de chocolate con sprinkles', width: 600, height: 600 },
            satellites: [
                { src: 'gallery/Foto 14.webp', alt: 'Concha de chocolate', width: 300, height: 300 },
                { src: 'gallery/Foto 1.webp', alt: 'Conchas de fresa', width: 300, height: 300 },
                { src: 'gallery/Foto 5.webp', alt: 'Orejas de hojaldre recién horneadas', width: 300, height: 300 },
                { src: 'gallery/Foto 2.webp', alt: 'Trenzas de canela y azúcar', width: 300, height: 300 },
                { src: 'gallery/Foto 7.webp', alt: 'Bolillos artesanales', width: 300, height: 300 },
            ],
        },
    },

    /* ── Contenido: Strip animado ── */
    strip: [
        'Pan Artesanal',
        'Horneado Diario',
        'Masa Madre',
        'Sin Conservadores',
        'Recetas Tradicionales',
        'Ingredientes Frescos',
        'Desde 1985',
        'Hecho con Amor',
    ],

    /* ── Contenido: Sección Nosotros ── */
    about: {
        eyebrow: 'Nuestra historia',
        title: ['Tradición que', 'sabe a hogar'],
        quote: '"El pan no es sólo alimento, es el lenguaje universal de la hospitalidad."',
        text: 'Desde 1985, la familia José ha horneado con las mismas manos y el mismo corazón. Cada madrugada encendemos el horno para que tengas el pan más fresco en tu mesa.',
        signature: '— José Martínez, fundador',
        image: { src: 'gallery/Panaderia.webp', alt: 'Interior de Panadería José con sus anaqueles llenos de pan', width: 900, height: 700 },
        phrases: [
            'Más de tres décadas de tradición',
            'Horneado sin conservadores',
            'Familia, no fábrica',
        ],
    },

    /* ── Contenido: Sección Galería ── */
    gallery: {
        eyebrow: 'Nuestra producción',
        title: ['El arte de', 'hornear'],
    },

    /* ── Contenido: Sección Contacto ── */
    contact: {
        eyebrow: 'Encuéntranos',
        title: ['Cuéntanos tu', 'antojo'],
        subtitle: 'Ordenamos para entrega a domicilio o recolección en tienda. Escríbenos y con gusto te atendemos.',
        cta: 'Escribir al WhatsApp',
    },
};
