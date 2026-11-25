/**
 * Motor de navegación.
 *
 * El motor sólo conoce el contrato Módulo → Submódulo → Hojas (ver `data/schema.js`).
 * No contiene contenido ni sabe qué es una función matemática: recibe los datos,
 * aplana los grupos en una lista de hojas y mantiene el índice actual.
 *
 * Añadir un módulo nuevo no requiere tocar este archivo.
 */

import { modules, getModule, getSubmodule } from './data/index.js';
import {
  renderModuleSelect,
  renderSubmoduleTabs,
  renderProgress,
  renderPager,
  renderSheet,
} from './render.js';
import {
  sheetKey,
  markVisited,
  setLast,
  getLast,
  countVisited,
  countCorrect,
  resetProgress,
} from './store.js';
import { clear, typeset } from './utils.js';

/* --------------------------------------------------------------- estado */

/** Posición actual. */
const state = {
  moduleId: modules[0].id,
  submoduleId: modules[0].submodules[0].id,
  index: 0,
};

/** Caché de hojas aplanadas por `modulo/submodulo`. */
const flattenCache = new Map();

const dom = {
  moduleSelect: document.getElementById('module-select'),
  tabs: document.getElementById('submodule-tabs'),
  sheetHost: document.getElementById('sheet'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  resetBtn: document.getElementById('reset-btn'),
};

/* ------------------------------------------------------------- aplanado */

/**
 * Convierte un submódulo en una lista plana de hojas.
 *
 * Los submódulos con `groups` (ejemplos, ejercicios) se expanden: cada grupo
 * aporta sus hojas consecutivas con una etiqueta («Ejemplo 2») y el número de
 * paso, que es todo lo que necesita el renderizador.
 *
 * @param {import('./data/schema.js').Module} module
 * @param {import('./data/schema.js').Submodule} submodule
 * @returns {Array<Object>}
 */
function flatten(module, submodule) {
  const cacheKey = `${module.id}/${submodule.id}`;
  if (flattenCache.has(cacheKey)) return flattenCache.get(cacheKey);

  const views = [];

  const push = (sheet, meta) => {
    views.push({
      ...meta,
      sheet,
      key: sheetKey(module.id, submodule.id, sheet.id),
      index: views.length,
      total: 0, // se rellena al final
    });
  };

  if (submodule.groups) {
    submodule.groups.forEach((group, groupIndex) => {
      const label = `${submodule.groupLabel ?? 'Ejemplo'} ${groupIndex + 1}`;
      group.sheets.forEach((sheet, i) => {
        push(sheet, {
          groupLabel: label,
          statement: group.statement ?? null,
          stepIndex: i + 1,
          stepTotal: group.sheets.length,
        });
      });
    });
  } else {
    for (const sheet of submodule.sheets ?? []) push(sheet, { groupLabel: null });
  }

  for (const view of views) view.total = views.length;
  flattenCache.set(cacheKey, views);
  return views;
}

/* ---------------------------------------------------------------- rutas */

/** @returns {Array<Object>} hojas del submódulo activo. */
function currentViews() {
  const module = getModule(state.moduleId);
  const submodule = getSubmodule(module, state.submoduleId);
  return module && submodule ? flatten(module, submodule) : [];
}

/** Escribe la posición en el hash sin ensuciar el historial del navegador. */
function syncHash() {
  const hash = `#/${state.moduleId}/${state.submoduleId}/${state.index}`;
  if (location.hash !== hash) history.replaceState(null, '', hash);
}

/**
 * Lee `#/modulo/submodulo/indice`.
 *
 * @returns {{moduleId: string, submoduleId: string, index: number}|null}
 */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  if (!raw) return null;

  const [moduleId, submoduleId, index] = raw.split('/');
  const module = getModule(moduleId);
  const submodule = getSubmodule(module, submoduleId);
  if (!module || !submodule) return null;

  const parsed = Number.parseInt(index ?? '0', 10);
  const views = flatten(module, submodule);
  const safeIndex = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), views.length - 1) : 0;

  return { moduleId, submoduleId, index: safeIndex };
}

/* ---------------------------------------------------------------- pintado */

/** Dibuja la hoja actual. */
function paint() {
  const module = getModule(state.moduleId);
  const submodule = getSubmodule(module, state.submoduleId);
  const views = currentViews();
  const view = views[state.index];

  if (!view) {
    clear(dom.sheetHost);
    dom.sheetHost.append(
      Object.assign(document.createElement('p'), {
        className: 'sheet__note',
        textContent: 'Este submódulo todavía no tiene hojas.',
      })
    );
    return;
  }

  clear(dom.sheetHost);
  const sheetNode = renderSheet(view, onGraded);
  dom.sheetHost.append(sheetNode);
  // Las fórmulas se tipografían ya dentro del DOM, para que KaTeX mida el ancho real.
  typeset(sheetNode);

  renderProgress({ index: state.index, total: views.length, note: progressNote(submodule, views) });
  renderPager(state.index > 0, state.index < views.length - 1);

  markVisited(view.key);
  setLast({ moduleId: state.moduleId, submoduleId: state.submoduleId, index: state.index });
  syncHash();
}

/**
 * Texto secundario del indicador: cuántas hojas se han visto o cuántos
 * ejercicios se han acertado.
 *
 * @param {import('./data/schema.js').Submodule|undefined} submodule
 * @param {Array<Object>} views
 * @returns {string}
 */
function progressNote(submodule, views) {
  if (!submodule) return '';
  const keys = views.map((view) => view.key);

  if (submodule.groups) {
    const correct = countCorrect(keys);
    return `Aciertos: ${correct} / ${keys.length}`;
  }
  return `Vistas: ${countVisited(keys)} / ${keys.length}`;
}

/** Callback que el renderizador invoca tras registrar una respuesta. */
function onGraded() {
  const module = getModule(state.moduleId);
  const submodule = getSubmodule(module, state.submoduleId);
  renderProgress({
    index: state.index,
    total: currentViews().length,
    note: progressNote(submodule, currentViews()),
  });
}

/* -------------------------------------------------------------- navegar */

/**
 * Va a una hoja concreta del submódulo activo.
 *
 * @param {number} index
 */
function goTo(index) {
  const views = currentViews();
  const clamped = Math.min(Math.max(index, 0), Math.max(views.length - 1, 0));
  if (clamped === state.index) {
    paint(); // permite repintar (p. ej. tras reiniciar el progreso)
    return;
  }
  state.index = clamped;
  paint();
}

/**
 * Cambia de submódulo (o de módulo) y repinta los controles de navegación.
 *
 * @param {{moduleId?: string, submoduleId?: string}} route
 */
function navigate(route) {
  const moduleId = route.moduleId ?? state.moduleId;
  const module = getModule(moduleId);
  if (!module) return;

  const submoduleId = route.submoduleId ?? module.submodules[0].id;
  if (!getSubmodule(module, submoduleId)) return;

  state.moduleId = moduleId;
  state.submoduleId = submoduleId;
  state.index = 0;

  if (moduleId !== dom.moduleSelect.value) dom.moduleSelect.value = moduleId;
  renderSubmoduleTabs(dom.tabs, module.submodules, submoduleId, (id) =>
    navigate({ submoduleId: id })
  );
  paint();
}

/* --------------------------------------------------------------- eventos */

function bindEvents() {
  dom.prevBtn.addEventListener('click', () => goTo(state.index - 1));
  dom.nextBtn.addEventListener('click', () => goTo(state.index + 1));

  dom.moduleSelect.addEventListener('change', () => navigate({ moduleId: dom.moduleSelect.value }));

  // Las flechas del teclado no deben robar el cursor a un campo de texto ni
  // cambiar de hoja mientras el foco está dentro de un desplegable abierto.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (isInteractiveTarget(event.target)) return;

    event.preventDefault();
    goTo(event.key === 'ArrowRight' ? state.index + 1 : state.index - 1);
  });

  window.addEventListener('hashchange', () => {
    const route = parseHash();
    if (!route) return;
    if (
      route.moduleId === state.moduleId &&
      route.submoduleId === state.submoduleId &&
      route.index === state.index
    ) {
      return;
    }
    state.moduleId = route.moduleId;
    state.submoduleId = route.submoduleId;
    state.index = route.index;
    dom.moduleSelect.value = route.moduleId;
    const module = getModule(route.moduleId);
    renderSubmoduleTabs(dom.tabs, module.submodules, route.submoduleId, (id) =>
      navigate({ submoduleId: id })
    );
    paint();
  });

  dom.resetBtn.addEventListener('click', () => {
    const confirmed = window.confirm(
      'Se borrarán las hojas visitadas y tus respuestas guardadas. ¿Continuar?'
    );
    if (!confirmed) return;

    resetProgress();
    flattenCache.clear();
    // Reconstruye la vista para que se limpien los estados de respuesta.
    const module = getModule(state.moduleId);
    renderSubmoduleTabs(dom.tabs, module.submodules, state.submoduleId, (id) =>
      navigate({ submoduleId: id })
    );
    paint();
  });
}

/**
 * ¿El foco está en algo donde las flechas tienen otro significado?
 *
 * @param {EventTarget|null} target
 * @returns {boolean}
 */
function isInteractiveTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('input, textarea, select, [contenteditable]'));
}

/* ----------------------------------------------------------------- init */

/** Arranca la aplicación: restaura la posición previa y pinta todo. */
function init() {
  const route = parseHash() ?? getLast() ?? null;

  // Validamos la ruta restaurada; si ya no existe, caemos al primer módulo.
  const module = getModule(route?.moduleId) ?? modules[0];
  const submodule =
    getSubmodule(module, route?.submoduleId) ?? module.submodules[0];
  const views = flatten(module, submodule);
  const index = Number.isFinite(route?.index) ? route.index : 0;

  state.moduleId = module.id;
  state.submoduleId = submodule.id;
  state.index = Math.min(Math.max(index, 0), Math.max(views.length - 1, 0));

  renderModuleSelect(dom.moduleSelect, modules, module.id, (id) => navigate({ moduleId: id }));
  renderSubmoduleTabs(dom.tabs, module.submodules, submodule.id, (id) =>
    navigate({ submoduleId: id })
  );

  bindEvents();
  paint();
}

init();
