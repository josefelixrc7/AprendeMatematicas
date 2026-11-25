/**
 * Persistencia del progreso en `localStorage`.
 *
 * Guarda tres cosas: la última hoja visitada, las hojas ya vistas y las respuestas
 * de los ejercicios. Todo va bajo una única clave versionada para poder migrar o
 * descartar el estado sin tocar el resto del código.
 *
 * Las claves de hoja tienen la forma `modulo/submodulo/id-de-hoja`, así que el
 * almacén no necesita saber nada de la estructura de datos.
 */

const STORAGE_KEY = 'aprendematematicas:progress:v1';
const VERSION = 1;

/**
 * Clave estable de una hoja: módulo + submódulo + id de hoja.
 * El almacén no necesita saber nada más de la estructura de datos.
 */
export function sheetKey(moduleId, submoduleId, sheetId) {
  return `${moduleId}/${submoduleId}/${sheetId}`;
}

/** @returns {{version: number, last: {moduleId: string, submoduleId: string, index: number}|null, visited: Object<string, number>, answers: Object<string, {correct: boolean, response: any, at: number}>}} */
function emptyState() {
  return { version: VERSION, last: null, visited: {}, answers: {} };
}

/** Estado en memoria; se hidrata al importar el módulo. */
let state = readState();

function readState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== VERSION) return emptyState();

    return {
      version: VERSION,
      last: parsed.last ?? null,
      visited: isPlainObject(parsed.visited) ? parsed.visited : {},
      answers: isPlainObject(parsed.answers) ? parsed.answers : {},
    };
  } catch (error) {
    // Modo privado, cuota llena o JSON corrupto: seguimos sin persistencia.
    console.warn('No se pudo leer el progreso guardado:', error);
    return emptyState();
  }
}

function writeState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('No se pudo guardar el progreso:', error);
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/** Marca una hoja como vista (idempotente). */
export function markVisited(key) {
  if (state.visited[key]) return;
  state.visited[key] = Date.now();
  writeState();
}

/** @returns {boolean} si la hoja ya se había visto. */
export function isVisited(key) {
  return Boolean(state.visited[key]);
}

/** Guarda el resultado de un ejercicio (`correct` + respuesta dada). */
export function recordAnswer(key, answer) {
  state.answers[key] = { ...answer, at: Date.now() };
  writeState();
}

/** @returns {{correct: boolean, response: any, at: number}|null} */
export function getAnswer(key) {
  return state.answers[key] ?? null;
}

/** Guarda la posición actual para restaurarla al volver. */
export function setLast(route) {
  state.last = route;
  writeState();
}

/** @returns {{moduleId: string, submoduleId: string, index: number}|null} */
export function getLast() {
  return state.last;
}

/** Cantidad de hojas vistas dentro de una lista de claves. */
export function countVisited(keys) {
  return keys.filter(isVisited).length;
}

/** Cantidad de ejercicios respondidos correctamente dentro de una lista de claves. */
export function countCorrect(keys) {
  return keys.filter((key) => state.answers[key]?.correct === true).length;
}

/** Borra todo el progreso guardado. */
export function resetProgress() {
  state = emptyState();
  writeState();
}
