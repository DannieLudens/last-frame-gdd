/* GDD web: loads the Markdown sections listed in content/config.json,
   renders them with the game's visual identity (tokens.css) and adds
   the language switch and downloads. */
(function () {
  'use strict';

  // UI text per language (the GDD content lives in content/<lang>/)
  const UI = {
    es: {
      cargando: 'Cargando el GDD…',
      indice: 'Índice',
      pendientes: n => n === 0 ? 'Sin campos por definir' : `<strong>${n}</strong> campos por definir, marcados <span class="por-definir">así</span>`,
      descargar: 'Descargar',
      pdf: 'PDF con diseño',
      pdfNota: 'En la ventana de impresión elige “Guardar como PDF”',
      pdfArchivo: 'PDF publicado',
      md: 'Markdown',
      mdNota: 'Texto de todas las secciones',
      porDefinir: 'Por definir:',
      nueva: 'Pedida por la rúbrica',
      sinTraducir: 'Traducción pendiente: se muestra en español',
      contenido: 'Contenido',
      etiqueta: 'Game Design Document',
      version: 'Versión',
      fecha: 'Fecha',
      estudio: 'Estudio',
      jugar: 'Jugar en itch.io',
      copiar: 'Copiar',
      copiado: 'Copiado',
      pronto: 'Próximamente en itch.io',
      equipo: 'Equipo',
      antes: 'Antes',
      despues: 'Después',
      imgPendiente: 'Imagen pendiente',
      keyArt: 'Key art pendiente: --portada-imagen en tokens.css',
      diagramaCargando: 'Dibujando diagrama…',
      error: 'No se pudo cargar el GDD. Si lo abriste como archivo, ábrelo con un servidor local (ver README).',
      avisos: { rubrica: 'Rúbrica', nota: 'Nota', ia: 'Uso de IA', alerta: 'Atención' },
      menu: 'Abrir índice',
      pie: (v, f) => `Versión ${v} · ${f} · Hecho por el equipo con su propio sistema de diseño.`
    },
    en: {
      cargando: 'Loading the GDD…',
      indice: 'Contents',
      pendientes: n => n === 0 ? 'No fields left to define' : `<strong>${n}</strong> fields to define, marked <span class="por-definir">like this</span>`,
      descargar: 'Download',
      pdf: 'Designed PDF',
      pdfNota: 'In the print dialog choose “Save as PDF”',
      pdfArchivo: 'Published PDF',
      md: 'Markdown',
      mdNota: 'Text of every section',
      porDefinir: 'To define:',
      nueva: 'Required by the rubric',
      sinTraducir: 'Translation pending: shown in Spanish',
      contenido: 'Contents',
      etiqueta: 'Game Design Document',
      version: 'Version',
      fecha: 'Date',
      estudio: 'Studio',
      jugar: 'Play on itch.io',
      copiar: 'Copy',
      copiado: 'Copied',
      pronto: 'Coming soon to itch.io',
      equipo: 'Team',
      antes: 'Before',
      despues: 'After',
      imgPendiente: 'Image pending',
      keyArt: 'Key art pending: --portada-imagen in tokens.css',
      diagramaCargando: 'Drawing diagram…',
      error: 'The GDD could not be loaded. If you opened it as a file, use a local server (see README).',
      avisos: { rubrica: 'Rubric', nota: 'Note', ia: 'AI use', alerta: 'Warning' },
      menu: 'Open contents',
      pie: (v, f) => `Version ${v} · ${f} · Made by the team with its own design system.`
    }
  };

  // Palette roles shown by the ```paleta block (same roles as the design system)
  const ROLES = [
    ['--color-dominante', 'Dominante', 'Fondos y ambiente (~60%)'],
    ['--color-secundario', 'Secundario', 'Escenario y superficies (~30%)'],
    ['--color-acento', 'Acento', 'Jugador y lo importante (~10%)'],
    ['--color-peligro', 'Peligro', 'Enemigos, daño, trampas'],
    ['--color-interactuable', 'Interactuable', 'Recompensas y botones'],
    ['--color-panel', 'Panel de UI', 'Paneles y menús'],
    ['--color-texto', 'Texto', 'Texto principal'],
    ['--color-texto-2', 'Texto secundario', 'Notas y ayudas']
  ];

  const $ = sel => document.querySelector(sel); // short query helper
  const state = { config: null, lang: 'es', sections: [], mermaidReady: null };

  // Escapes text before putting it into HTML
  function esc(text) {
    return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Reads a value from localStorage without breaking if storage is blocked
  function readStore(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; } // storage may be unavailable
  }

  // Saves a value to localStorage without breaking if storage is blocked
  function writeStore(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } // storage may be unavailable
  }

  // Picks the language: ?lang=, saved choice, then the browser language
  function pickLanguage(available, base) {
    const param = new URLSearchParams(location.search).get('lang'); // shareable link
    const saved = readStore('gdd-lang'); // last choice
    const browser = (navigator.language || base).slice(0, 2).toLowerCase(); // browser language
    for (const option of [param, saved, browser]) {
      if (option && available.includes(option)) return option; // first valid wins
    }
    return base; // fallback to the base language
  }

  // Returns the UI text for the current language
  function t() { return UI[state.lang] || UI.es; }

  // Returns a value that may be a plain string or a {lang: text} object
  function localized(value) {
    if (value && typeof value === 'object') return value[state.lang] || value[state.config.idiomaBase] || '';
    return value || '';
  }

  // Inline Markdown extension: [[text]] becomes a "to define" chip
  const porDefinirExtension = {
    name: 'porDefinir',
    level: 'inline',
    start(src) { return src.indexOf('[['); }, // where a match may begin
    tokenizer(src) {
      const match = /^\[\[([^\]]+?)\]\]/.exec(src); // [[ ... ]]
      if (match) return { type: 'porDefinir', raw: match[0], text: match[1] };
    },
    renderer(token) {
      return `<span class="por-definir" title="${esc(t().porDefinir)}"><span class="sr-only">${esc(t().porDefinir)} </span>${esc(token.text)}</span>`;
    }
  };

  // Splits the lines of a custom block into "a | b | c" parts
  function rows(text) {
    return text.split('\n').map(l => l.trim()).filter(Boolean).map(l => l.split('|').map(p => p.trim()));
  }

  // Builds an image that turns into a styled placeholder if the file is missing
  function figureImage(src, alt) {
    return `<img src="${esc(src)}" alt="${esc(alt || '')}" loading="lazy" data-pendiente="${esc(src)}">`;
  }

  // Renders the custom fenced blocks (pilares, paleta, tipografia, antes-despues, galeria, mermaid)
  function renderCustomBlock(token) {
    const lang = (token.lang || '').trim().toLowerCase(); // block type
    const ui = t();
    if (lang === 'pilares') {
      const cards = rows(token.text).map((p, i) =>
        `<div class="pilar" data-n="${i + 1}"><h4>${marked.parseInline(p[0] || '')}</h4><p>${marked.parseInline(p[1] || '')}</p></div>`);
      return `<div class="pilares">${cards.join('')}</div>`;
    }
    if (lang === 'paleta') {
      const styles = getComputedStyle(document.documentElement); // live token values
      const cards = ROLES.map(([v, name, use]) => {
        const value = styles.getPropertyValue(v).trim(); // e.g. #ffb238
        return `<div class="muestra"><div class="muestra__color" style="background:var(${v})"></div>` +
          `<div class="muestra__info"><strong>${esc(name)}</strong>${copyable(value)}<span>${esc(use)}</span></div></div>`;
      });
      return `<div class="paleta">${cards.join('')}</div>`;
    }
    if (lang === 'colores') { // Name | #hex | use, one color per line
      const cards = rows(token.text).map(([name, hex, use]) =>
        `<div class="muestra"><div class="muestra__color" style="background:${esc(hex)}"></div>` +
        `<div class="muestra__info"><strong>${esc(name)}</strong>${copyable(hex)}<span>${marked.parseInline(use || '')}</span></div></div>`);
      return `<div class="paleta">${cards.join('')}</div>`;
    }
    if (lang === 'marquesina') { // image | caption: the image framed by the ring of lights
      return rows(token.text).map(([src, caption]) =>
        `<figure class="enmarcado"><div class="enmarcado__marco">${figureImage(src, caption)}` +
        `<div class="marquesina marquesina--marco" data-espacio="46" aria-hidden="true"><span class="marquesina__aro"></span><span class="marquesina__focos"></span></div></div>` +
        (caption ? `<figcaption>${marked.parseInline(caption)}</figcaption>` : '') + `</figure>`).join('');
    }
    if (lang === 'tipografia') {
      const styles = getComputedStyle(document.documentElement);
      const name = v => styles.getPropertyValue(v).split(',')[0].replace(/['"]/g, '').trim(); // first family
      const sample = (v, label, weight) =>
        `<div class="especimen"><p class="especimen__muestra" style="font-family:var(${v});font-weight:${weight}">${esc(state.config.titulo)}</p>` +
        `<p class="especimen__abc" style="font-family:var(${v})">AaBbCc 0123456789 ¿¡ÁÉÍÓÚÑ!?</p>` +
        `<p class="especimen__nombre">${esc(label)} · ${esc(name(v))}</p></div>`;
      if (token.text.trim()) { // optional rows: --variable | role | weight
        return `<div class="tipografia">${rows(token.text).map(([v, label, weight]) => sample(v, label, weight || 400)).join('')}</div>`;
      }
      return `<div class="tipografia">${sample('--font-display', 'Display', 400)}${sample('--font-body', 'Texto', 400)}</div>`;
    }
    if (lang === 'antes-despues') {
      return rows(token.text).map(([before, after, caption]) =>
        `<figure class="antes-despues"><div class="ad__marco">` +
        `<div class="ad__capa">${figureImage(before, ui.antes)}</div>` +
        `<div class="ad__capa ad__despues">${figureImage(after, ui.despues)}</div>` +
        `<div class="ad__linea"></div>` +
        `<span class="ad__etiqueta ad__etiqueta--antes">${esc(ui.antes)}</span>` +
        `<span class="ad__etiqueta ad__etiqueta--despues">${esc(ui.despues)}</span></div>` +
        `<input class="ad__rango" type="range" min="0" max="100" value="50" aria-label="${esc(ui.antes)} / ${esc(ui.despues)}">` +
        (caption ? `<figcaption>${marked.parseInline(caption)}</figcaption>` : '') + `</figure>`).join('');
    }
    if (lang === 'galeria') {
      const items = rows(token.text).map(([src, caption]) =>
        `<figure>${figureImage(src, caption)}${caption ? `<figcaption>${marked.parseInline(caption)}</figcaption>` : ''}</figure>`);
      return `<div class="galeria">${items.join('')}</div>`;
    }
    if (lang === 'etapas') {
      const steps = rows(token.text).map(([name, detail, flag], i) =>
        `<li class="etapa${flag ? ' etapa--hito' : ''}"><span class="etapa__n">${String(i + 1).padStart(2, '0')}</span>` +
        `<strong>${marked.parseInline(name || '')}</strong>${detail ? `<span>${marked.parseInline(detail)}</span>` : ''}</li>`);
      return `<ol class="etapas">${steps.join('')}</ol>`;
    }
    if (lang === 'mermaid') {
      return `<div class="diagrama cargando" data-mermaid="${esc(token.text)}">${esc(ui.diagramaCargando)}</div>`;
    }
    return false; // normal code block
  }

  // Configures marked once with our extensions
  function setupMarked() {
    marked.use({
      gfm: true,
      extensions: [porDefinirExtension],
      renderer: { code: renderCustomBlock },
      walkTokens(token) {
        if (token.type === 'heading') token.depth = Math.min(token.depth + 1, 6); // ## in a section becomes h3
      }
    });
  }

  // Downloads one Markdown file, falling back to the base language
  async function fetchSection(entry) {
    const base = state.config.idiomaBase;
    const tryLang = async lang => {
      const res = await fetch(`content/${lang}/${entry.archivo}`, { cache: 'no-cache' }); // section file
      return res.ok ? res.text() : null;
    };
    let text = await tryLang(state.lang);
    let fallback = false;
    if (text === null && state.lang !== base) { text = await tryLang(base); fallback = true; } // not translated yet
    if (text === null) throw new Error(`Falta ${entry.archivo}`);
    const match = /^#\s+(.+)$/m.exec(text); // first H1 is the section title
    const title = match ? match[1].trim() : entry.id;
    const body = match ? text.replace(match[0], '') : text;
    return { ...entry, title, raw: text, body, fallback };
  }

  // Turns > [!tipo] blockquotes into styled notices
  function decorateNotices(root) {
    root.querySelectorAll('blockquote').forEach(q => {
      const first = q.querySelector('p');
      if (!first) return;
      const match = /^\[!(\w+)\]\s*/.exec(first.innerHTML); // [!rubrica] etc.
      if (!match) return;
      const kind = match[1].toLowerCase();
      q.classList.add('aviso', `aviso--${kind}`);
      first.innerHTML = first.innerHTML.slice(match[0].length);
      const label = document.createElement('span');
      label.className = 'aviso__titulo';
      label.textContent = t().avisos[kind] || kind;
      q.prepend(label);
    });
  }

  // Replaces images that failed to load with a placeholder box
  function decorateImages(root) {
    root.querySelectorAll('img[data-pendiente]').forEach(img => {
      const swap = () => {
        const box = document.createElement('div');
        box.className = 'img-pendiente';
        box.innerHTML = `<strong>${esc(t().imgPendiente)}</strong><code>${esc(img.dataset.pendiente)}</code>`;
        img.replaceWith(box);
      };
      if (img.complete && img.naturalWidth === 0) swap(); // already failed
      else img.addEventListener('error', swap, { once: true }); // fails later
    });
  }

  // Wires the before/after sliders
  function decorateSliders(root) {
    root.querySelectorAll('.antes-despues').forEach(fig => {
      const range = fig.querySelector('.ad__rango');
      const frame = fig.querySelector('.ad__marco');
      range.addEventListener('input', () => frame.style.setProperty('--corte', `${range.value}%`)); // move the cut
    });
  }

  // Wraps tables so wide ones scroll instead of breaking the layout
  function wrapTables(root) {
    root.querySelectorAll('table').forEach(table => {
      const box = document.createElement('div');
      box.className = 'tabla';
      table.replaceWith(box);
      box.appendChild(table);
    });
  }

  // A value with a copy button (two overlapping squares); the click is handled once in copyListener
  const COPY_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
  const CHECK_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function copyable(value) {
    const v = esc(value);
    return `<span class="copiable"><code>${v}</code><button type="button" class="copiar no-imprimir" data-copiar="${v}" aria-label="${esc(t().copiar)} ${v}" title="${esc(t().copiar)}">${COPY_ICON}</button></span>`;
  }

  // Copies with the Clipboard API, or with a hidden textarea where the page cannot use it
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    return Promise.resolve(legacyCopy(text));
  }
  function legacyCopy(text) {
    const area = document.createElement('textarea');
    area.value = text; area.setAttribute('readonly', ''); area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); } catch (e) { /* nothing else to try */ }
    area.remove();
  }
  function copyListener() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.copiar');
      if (!btn) return;
      copyText(btn.dataset.copiar).then(() => {
        btn.innerHTML = CHECK_ICON; btn.classList.add('copiado');
        btn.setAttribute('aria-label', `${t().copiado}: ${btn.dataset.copiar}`);
        clearTimeout(btn._t);
        btn._t = setTimeout(() => { btn.innerHTML = COPY_ICON; btn.classList.remove('copiado'); btn.setAttribute('aria-label', `${t().copiar} ${btn.dataset.copiar}`); }, 1400);
      });
    });
  }

  // "Play on itch.io" blot under the cover; shows "coming soon" until config.itch has a URL
  function playButton(c, ui) {
    if (c.itch === undefined) return '';
    return c.itch
      ? `<a class="portada__jugar no-imprimir" href="${esc(c.itch)}" target="_blank" rel="noopener">${esc(ui.jugar)}</a>`
      : `<span class="portada__jugar portada__jugar--pronto no-imprimir" aria-disabled="true">${esc(ui.pronto)}</span>`;
  }

  // Draws the cover from config.json
  function renderCover() {
    const c = state.config;
    const ui = t();
    const pitch = localized(c.pitch) || '[[Elevator pitch: el juego en una frase]]';
    $('#portada').innerHTML =
      marqueeRing() +

      `<p class="portada__etiqueta">${esc(localized(c.tipo) || ui.etiqueta)}, ${esc(ui.version.toLowerCase())} ${esc(c.version)}</p>` +
      (c.logo // the game logo replaces the text title; alt keeps the name for screen readers
        ? `<h1 class="portada__titulo portada__titulo--logo"><img src="${esc(c.logo)}" alt="${esc(c.titulo)}"></h1>`
        : `<h1 class="portada__titulo">${esc(c.titulo)}</h1>`) +
      `<p class="portada__pitch">${marked.parseInline(pitch)}</p>` +
      `<ul class="portada__meta">` +
      `<li>${esc(ui.estudio)}: <strong>${esc(c.estudio)}</strong></li>` +
      `<li>${esc(ui.equipo)}: <strong>${esc((c.equipo || []).join(', '))}</strong></li>` +
      `<li>${esc(ui.fecha)}: <strong>${esc(c.fecha)}</strong></li></ul>` +
      playButton(c, ui);
    const keyArt = getComputedStyle(document.documentElement).getPropertyValue('--portada-imagen').trim();
    if ((!keyArt || keyArt === 'none') && !c.logo) { // with a logo the cover is complete
      $('#portada').insertAdjacentHTML('beforeend', `<p class="portada__pendiente no-imprimir">${esc(ui.keyArt)}</p>`); // reminder for the team
    }
    const short = c.siglas || 'GDD'; // short name next to the title
    $('#marca').innerHTML = `${esc(c.titulo)} <span>${esc(short)}</span>`;
    document.title = `${c.titulo} · ${short}`;
  }

  // Ring of stage lights (marquee) like the game's main menu. Decorative only.
  function marqueeRing() {
    return `<div class="marquesina" aria-hidden="true"><span class="marquesina__aro"></span><span class="marquesina__focos"></span></div>`;
  }

  // Places the bulbs evenly along the ring's ellipse (by arc length, so they don't bunch up)
  function placeBulbs(ring) {
    const lights = ring.querySelector('.marquesina__focos');
    const aro = ring.querySelector('.marquesina__aro');
    if (!lights || !aro) return;
    const w = ring.clientWidth, h = ring.clientHeight;
    if (!w || !h) return;
    const band = parseFloat(getComputedStyle(aro).borderTopWidth) || 0; // ring thickness
    const a = (w - band) / 2, b = (h - band) / 2; // ellipse through the middle of the band
    const steps = 720, pts = [];
    let length = 0, prev = null;
    for (let i = 0; i <= steps; i++) { // sample the ellipse to measure it
      const ang = (i / steps) * Math.PI * 2;
      const p = [w / 2 + a * Math.cos(ang), h / 2 + b * Math.sin(ang)];
      if (prev) length += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      pts.push([p, length]);
      prev = p;
    }
    const gap = Number(ring.dataset.espacio) || 74; // px between bulbs
    const count = Math.max(10, Math.round(length / gap));
    let html = '', j = 0;
    for (let k = 0; k < count; k++) {
      const target = (k / count) * length;
      while (j < pts.length - 1 && pts[j][1] < target) j++;
      const [x, y] = pts[j][0];
      html += `<i style="left:${(x / w * 100).toFixed(2)}%;top:${(y / h * 100).toFixed(2)}%;--n:${k}"></i>`;
    }
    lights.innerHTML = html;
  }

  function placeAllBulbs() {
    document.querySelectorAll('.marquesina').forEach(placeBulbs);
    document.querySelectorAll('.enmarcado img:not([data-escucha]), .portada__titulo--logo img:not([data-escucha])').forEach(img => { // framed images resize when loaded
      img.dataset.escucha = '1';
      img.addEventListener('load', placeAllBulbs, { once: true });
    });
  }

  // Draws every section, the side index and the printed table of contents
  function renderSections() {
    const ui = t();
    const main = $('#contenido');
    main.innerHTML = '';
    state.sections.forEach((s, i) => {
      const num = String(i + 1).padStart(2, '0'); // 01, 02…
      const el = document.createElement('section');
      el.className = 'seccion';
      el.id = s.id;
      const tags = [
        s.nueva ? `<span class="tag tag--nuevo">${esc(ui.nueva)}</span>` : '',
        s.etiqueta ? `<span class="tag tag--propia">${esc(localized(s.etiqueta))}</span>` : '',
        s.fallback ? `<span class="tag tag--traduccion">${esc(ui.sinTraducir)}</span>` : ''
      ].join('');
      el.innerHTML =
        `<header class="seccion__cabecera"><span class="seccion__num" aria-hidden="true">${num}</span>` +
        `<h2 class="seccion__titulo"><span class="mancha mancha--${'abc'[i % 3]}">${esc(s.title)}</span></h2>` +
        (tags ? `<div class="seccion__tags">${tags}</div>` : '') + `</header>` +
        `<div class="contenido">${marked.parse(s.body)}</div>`;
      main.appendChild(el);
      s.num = num;
      s.pending = el.querySelectorAll('.por-definir').length; // fields still to fill
    });
    const footer = document.createElement('footer');
    footer.className = 'pie';
    footer.innerHTML = esc(ui.pie(state.config.version, state.config.fecha));
    main.appendChild(footer);

    decorateNotices(main);
    decorateImages(main);
    decorateSliders(main);
    wrapTables(main);
    renderIndex();
    renderPrintToc();
  }

  // Builds the side index with a counter of fields to define
  function renderIndex() {
    const ui = t();
    const total = state.sections.reduce((n, s) => n + s.pending, 0);
    const items = state.sections.map(s =>
      `<li><a href="#${s.id}" data-id="${s.id}"><span class="indice__num">${s.num}</span>` +
      `<span class="indice__nombre">${esc(s.title)}</span>${s.pending ? `<span class="indice__badge" title="${esc(ui.porDefinir)}">${s.pending}</span>` : ''}</a></li>`);
    $('#indice').innerHTML =
      `<p class="indice__titulo">${esc(ui.indice)}</p>` +
      `<p class="indice__pendientes">${ui.pendientes(total)}</p><ol>${items.join('')}</ol>`;
    $('#indice').querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    filmStrip($('#indice'));
  }

  // Desktop index as a film strip: frames grow near the cursor like the macOS dock and bend the strip
  function filmStrip(nav) {
    const desk = window.matchMedia('(min-width: 961px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = [...nav.querySelectorAll('li')];
    const fit = () => nav.style.setProperty('--n-cuadros', items.length); // CSS sizes frames to fit the screen
    fit();
    let frame = 0;
    const apply = y => {
      items.forEach(li => {
        const r = li.getBoundingClientRect();
        const d = y === null ? Infinity : Math.abs(y - (r.top + r.height / 2)); // distance to the cursor
        const k = Math.max(0, Math.cos(Math.min(d / 120, 1) * Math.PI / 2)); // 1 under the cursor, 0 far away
        li.style.setProperty('--k', k.toFixed(3));
      });
    };
    const reset = () => { cancelAnimationFrame(frame); items.forEach(li => li.style.setProperty('--k', 0)); };
    nav.addEventListener('mousemove', e => {
      if (!desk.matches || calm.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => apply(e.clientY));
    });
    nav.addEventListener('mouseleave', reset);
    nav.addEventListener('focusin', e => { // keyboard: the focused frame grows like a hovered one
      if (!desk.matches || calm.matches) return;
      const r = e.target.getBoundingClientRect();
      apply(r.top + r.height / 2);
    });
    nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) reset(); });
  }

  // Builds the table of contents that only shows in the PDF
  function renderPrintToc() {
    const items = state.sections.map(s => `<li><span>${s.num}</span>${esc(s.title)}</li>`);
    $('#toc-print').innerHTML = `<h2>${esc(t().contenido)}</h2><ol>${items.join('')}</ol>`;
  }

  // Highlights the section being read in the side index
  function watchActiveSection() {
    if (!('IntersectionObserver' in window)) return;
    const links = new Map([...document.querySelectorAll('.indice a')].map(a => [a.dataset.id, a]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.classList.remove('activo'));
        const link = links.get(e.target.id);
        if (link) link.classList.add('activo');
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('.seccion').forEach(s => observer.observe(s));
  }

  // Loads Mermaid only if the GDD has diagrams, themed with the game tokens
  function renderDiagrams() {
    const boxes = [...document.querySelectorAll('[data-mermaid]:not([data-listo])')]; // only new diagrams
    if (!boxes.length) return Promise.resolve();
    if (!state.mermaidReady) {
      state.mermaidReady = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'assets/js/vendor/mermaid.min.js'; // bundled, no CDN
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return state.mermaidReady.then(async () => {
      const css = getComputedStyle(document.documentElement);
      const v = name => css.getPropertyValue(name).trim(); // token value
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        fontFamily: v('--font-body'),
        themeVariables: {
          background: v('--color-panel'),
          primaryColor: v('--color-secundario'),
          primaryTextColor: v('--color-texto'),
          primaryBorderColor: v('--color-acento'),
          secondaryColor: v('--color-panel'),
          tertiaryColor: v('--color-dominante'),
          lineColor: v('--color-texto-2'),
          textColor: v('--color-texto'),
          mainBkg: v('--color-secundario'),
          nodeBorder: v('--color-acento'),
          clusterBkg: v('--color-dominante'),
          titleColor: v('--color-texto'),
          edgeLabelBackground: v('--color-panel'),
          sectionBkgColor: v('--color-secundario'),
          altSectionBkgColor: v('--color-panel'),
          taskBkgColor: v('--color-acento'),
          taskTextColor: v('--color-sobre-acento') || v('--color-dominante'),
          taskTextOutsideColor: v('--color-texto'),
          taskBorderColor: v('--color-acento'),
          activeTaskBkgColor: v('--color-interactuable'),
          gridColor: v('--color-linea'),
          todayLineColor: v('--color-peligro'),
          fontSize: '15px'
        }
      });
      for (const [i, box] of boxes.entries()) {
        try {
          const { svg } = await window.mermaid.render(`diagrama-${i}-${Date.now()}`, box.dataset.mermaid); // SVG string
          box.innerHTML = svg;
        } catch (err) {
          box.innerHTML = `<pre>${esc(box.dataset.mermaid)}</pre>`; // show the source if it fails
          console.warn('Mermaid', err);
        }
        box.classList.remove('cargando');
        box.dataset.listo = '1'; // drawn once
      }
    }).catch(err => console.warn('Mermaid no cargó', err));
  }

  // Builds the ES/EN switch
  function renderLanguages() {
    const box = $('#idiomas');
    box.hidden = state.config.idiomas.length < 2; // no switch while there is only one language
    box.innerHTML = state.config.idiomas.map(l =>
      `<button type="button" data-lang="${l}" aria-pressed="${l === state.lang}">${l.toUpperCase()}</button>`).join('');
    box.querySelectorAll('button').forEach(b => b.addEventListener('click', () => changeLanguage(b.dataset.lang)));
  }

  // Builds the download menu (designed PDF and Markdown)
  function renderDownloads() {
    const ui = t();
    const published = (state.config.pdf || {})[state.lang]; // optional committed PDF
    $('#btn-descargar').textContent = ui.descargar;
    $('#lista-descargas').innerHTML =
      (published ? `<button type="button" data-accion="pdf-archivo">${esc(ui.pdfArchivo)}<small>${esc(published)}</small></button>` : '') +
      `<button type="button" data-accion="pdf">${esc(ui.pdf)}<small>${esc(ui.pdfNota)}</small></button>` +
      `<button type="button" data-accion="md">${esc(ui.md)}<small>${esc(ui.mdNota)}</small></button>`;
    $('#lista-descargas').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      toggleDownloads(false);
      if (b.dataset.accion === 'pdf') printPdf();
      if (b.dataset.accion === 'md') downloadMarkdown();
      if (b.dataset.accion === 'pdf-archivo') window.open(published, '_blank', 'noopener');
    }));
  }

  // Opens or closes the download menu
  function toggleDownloads(open) {
    const box = $('#descargas');
    const isOpen = open === undefined ? !box.classList.contains('abierto') : open;
    box.classList.toggle('abierto', isOpen);
    $('#btn-descargar').setAttribute('aria-expanded', String(isOpen));
  }

  // Opens or closes the side index on small screens
  function toggleMenu(open) {
    const isOpen = open === undefined ? !document.body.classList.contains('indice-abierto') : open;
    document.body.classList.toggle('indice-abierto', isOpen);
    $('#btn-menu').setAttribute('aria-expanded', String(isOpen));
  }

  // Prints the designed PDF once every diagram is drawn
  async function printPdf() {
    await renderDiagrams();
    const c = state.config;
    const previous = document.title;
    document.title = `${c.siglas || 'GDD'} ${c.titulo} v${c.version} ${state.lang.toUpperCase()}`; // default PDF file name
    window.addEventListener('afterprint', () => { document.title = previous; }, { once: true });
    window.print();
  }

  // Saves all sections of the current language as one Markdown file
  function downloadMarkdown() {
    const c = state.config;
    const header = `# ${c.titulo}: ${localized(c.tipo) || t().etiqueta}\n\nv${c.version} · ${c.fecha} · ${c.estudio}\n\n---\n\n`;
    const text = header + state.sections.map(s => s.raw.trim()).join('\n\n---\n\n') + '\n';
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${c.siglas || 'GDD'}_${c.titulo.replace(/\s+/g, '_')}_v${c.version}_${state.lang}.md`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => { URL.revokeObjectURL(link.href); link.remove(); }, 0);
  }

  // Switches language and reloads the sections
  async function changeLanguage(lang) {
    if (lang === state.lang) return;
    writeStore('gdd-lang', lang);
    state.lang = lang;
    await load();
  }

  // Loads config-driven content for the current language and draws the page
  async function load() {
    document.documentElement.lang = state.lang; // correct language for screen readers and browser translation
    const status = $('#estado');
    if (status) status.textContent = t().cargando;
    state.sections = await Promise.all(state.config.secciones.map(fetchSection));
    renderCover();
    renderSections();
    renderLanguages();
    renderDownloads();
    $('#btn-menu').setAttribute('aria-label', t().menu);
    watchActiveSection();
    renderDiagrams();
    placeAllBulbs();
    if (document.fonts) document.fonts.ready.then(placeAllBulbs); // sizes change when fonts arrive
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView(); // deep link
  }

  // Swaps tokens.css for assets/css/temas/<name>.css when the URL has ?tema=<name>
  function applyThemePreview() {
    const name = new URLSearchParams(location.search).get('tema'); // e.g. ?tema=papel
    if (!name || !/^[a-z0-9-]+$/.test(name)) return Promise.resolve();
    return new Promise(resolve => {
      const link = $('#tema');
      link.addEventListener('load', resolve, { once: true }); // wait so tokens are ready
      link.addEventListener('error', resolve, { once: true }); // unknown theme: keep going
      link.href = `assets/css/temas/${name}.css`;
    });
  }

  // Entry point
  async function start() {
    try {
      await applyThemePreview();
      setupMarked();
      const res = await fetch('content/config.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('config.json');
      state.config = await res.json();
      state.lang = pickLanguage(state.config.idiomas, state.config.idiomaBase);
      copyListener();
      $('#btn-descargar').addEventListener('click', e => { e.stopPropagation(); toggleDownloads(); });
      document.addEventListener('click', e => { if (!e.target.closest('#descargas')) toggleDownloads(false); });
      $('#btn-menu').addEventListener('click', () => toggleMenu());
      await load();
    } catch (err) {
      console.error(err);
      $('#contenido').innerHTML = `<p class="estado estado--error">${esc(UI.es.error)}</p>`;
    }
  }

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(placeAllBulbs, 120); });
  window.addEventListener('beforeprint', () => { document.body.classList.add('imprimiendo'); placeAllBulbs(); }); // print hook
  window.addEventListener('afterprint', () => document.body.classList.remove('imprimiendo'));
  start();
})();
