/**
 * Utilidades compartidas por el motor y el renderizador.
 *
 * Aquí viven tres cosas pequeñas y reutilizables:
 *  1. Construcción de DOM sin plantillas ni frameworks.
 *  2. Texto enriquecido con matemáticas en línea (`$...$`) y tipografiado con KaTeX.
 *  3. Normalización de respuestas escritas por el estudiante.
 */

/**
 * Crea un elemento con clase, texto, atributos, data-* e hijos en una sola llamada.
 *
 * @param {string} tag Nombre de la etiqueta.
 * @param {{className?: string, text?: string, html?: string, attrs?: object, dataset?: object}} [options]
 * @param {Array<Node|string|null|undefined|Array>} [children]
 * @returns {HTMLElement}
 */
export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  const { className, text, html, attrs, dataset } = options;

  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  if (html !== undefined && html !== null) node.innerHTML = html;

  if (attrs) {
    for (const [name, value] of Object.entries(attrs)) {
      if (value === false || value === null || value === undefined) continue;
      node.setAttribute(name, value === true ? '' : String(value));
    }
  }

  if (dataset) {
    for (const [name, value] of Object.entries(dataset)) {
      node.dataset[name] = String(value);
    }
  }

  append(node, children);
  return node;
}

/** Añade hijos aceptando arrays y valores nulos (se ignoran). */
export function append(parent, children) {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    if (Array.isArray(child)) {
      append(parent, child);
      continue;
    }
    parent.append(child);
  }
  return parent;
}

/** Vacía un nodo por completo. */
export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/**
 * Marca un nodo para que `typeset()` lo rellene con KaTeX.
 *
 * Guardamos el LaTeX original en `data-tex`, así que se puede volver a tipografiar
 * tantas veces como haga falta (cambio de hoja, apertura de un desplegable…).
 *
 * @param {string} tex Código LaTeX.
 * @param {{display?: boolean}} [options]
 * @returns {HTMLElement}
 */
export function math(tex, options = {}) {
  const display = Boolean(options.display);
  return el(display ? 'div' : 'span', {
    className: display ? 'math math--display' : 'math',
    dataset: { tex, display: String(display) },
  });
}

/**
 * Convierte un texto con matemáticas en línea a nodos del DOM.
 *
 * El contenido entre `$...$` se tipografía con KaTeX; el resto se interpreta como
 * HTML mínimo (`<strong>`, `<em>`, `<code>`). El texto proviene de archivos de datos
 * locales, nunca de la entrada del usuario.
 *
 * @param {string} source
 * @returns {DocumentFragment}
 */
export function richText(source) {
  const fragment = document.createDocumentFragment();
  const text = String(source ?? '');
  const pattern = /\$([^$]+)\$/g;
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) fragment.append(htmlSlice(text.slice(cursor, match.index)));
    fragment.append(math(match[1], {}));
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) fragment.append(htmlSlice(text.slice(cursor)));
  return fragment;
}

/** Fragmento con HTML metro-limitado (sólo etiquetas de énfasis). */
function htmlSlice(html) {
  const fragment = document.createDocumentFragment();
  if (!html) return fragment;
  const span = document.createElement('span');
  span.innerHTML = html;
  while (span.firstChild) fragment.append(span.firstChild);
  return fragment;
}

/**
 * Tipografía todos los `[data-tex]` dentro de `root`.
 *
 * `throwOnError: false` evita que un LaTeX mal escrito rompa la hoja: KaTeX pinta
 * el error en rojo y la navegación continúa. Si el CDN no cargó, se muestra el
 * código fuente como respaldo legible.
 *
 * @param {ParentNode|null} root
 */
export function typeset(root) {
  if (!root) return;

  const katex = window.katex;
  const nodes = root.querySelectorAll('[data-tex]');

  for (const node of nodes) {
    const tex = node.dataset.tex ?? '';
    const displayMode = node.dataset.display === 'true';

    if (!katex) {
      node.textContent = tex;
      node.classList.add('tex-fallback');
      continue;
    }

    try {
      node.innerHTML = katex.renderToString(tex, {
        displayMode,
        throwOnError: false,
        strict: false,
        output: 'html',
      });
    } catch (error) {
      node.textContent = tex;
      node.classList.add('tex-fallback');
      console.warn('No se pudo renderizar LaTeX:', tex, error);
    }
  }
}

/**
 * Normaliza una respuesta escrita para compararla de forma tolerante:
 * ignora espacios, mayúsculas, coma decimal, `≥`/`>=` y variantes de infinito.
 *
 * @param {string} value
 * @returns {string}
 */
export function normalizeAnswer(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/≠/g, '!=')
    .replace(/∞/g, 'inf')
    .replace(/infinito|infinity/g, 'inf')
    .replace(/\\mathbb\{r\}/g, 'r')
    .replace(/,(?=\d)(?=\d{1,3}\b)/g, '.')
    .replace(/[{}]/g, '')
    .replace(/;/g, ',');
}

/**
 * ¿La respuesta del estudiante coincide con alguna de las aceptadas?
 *
 * @param {string[]} accepted
 * @param {string} value
 * @returns {boolean}
 */
export function answersMatch(accepted, value) {
  const normalized = normalizeAnswer(value);
  if (!normalized) return false;
  return accepted.some((candidate) => normalizeAnswer(candidate) === normalized);
}
