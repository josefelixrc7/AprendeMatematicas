/**
 * Registro de módulos.
 *
 * ESTE es el único archivo que hay que tocar para añadir un módulo nuevo:
 *   1. Crear `js/data/<modulo>.js` exportando un objeto con la forma de `Module`.
 *   2. Importarlo aquí y añadirlo al array `modules`.
 * El motor (`engine.js`) no necesita ningún cambio.
 */

import { funcionesModule } from './funciones.js';

/** @type {import('./schema.js').Module[]} */
export const modules = [funcionesModule];

/**
 * @param {string|null|undefined} id
 * @returns {import('./schema.js').Module|undefined}
 */
export function getModule(id) {
  return modules.find((module) => module.id === id);
}

/**
 * @param {import('./schema.js').Module|undefined} module
 * @param {string|null|undefined} id
 * @returns {import('./schema.js').Submodule|undefined}
 */
export function getSubmodule(module, id) {
  return module?.submodules.find((submodule) => submodule.id === id);
}
