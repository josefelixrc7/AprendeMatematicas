/**
 * Contrato de datos del motor.
 *
 * Este archivo no contiene código ejecutable: sólo describe con JSDoc la forma
 * que deben tener los módulos para que `engine.js` los pueda navegar. Añadir un
 * módulo nuevo (Límites, Derivadas…) consiste en producir objetos con esta forma.
 */

/**
 * @typedef {Object} Sheet
 * @property {string} id Identificador único dentro del submódulo.
 * @property {'theory'|'example'|'exercise'} kind
 * @property {string} title Título corto de la hoja.
 * @property {string} [formula] LaTeX principal (se renderiza con KaTeX en modo display).
 * @property {string} [text] Explicación breve; admite HTML mínimo y `$...$` en línea.
 * @property {string} [change] Sólo ejemplos: qué cambió en este paso.
 * @property {string} [why] Texto del desplegable «¿Por qué?».
 * @property {string} [note] Nota al pie de la hoja.
 * @property {string} [prompt] Sólo ejercicios: la pregunta en lenguaje natural.
 * @property {string} [hint] Sólo ejercicios: pista previa (desplegable).
 * @property {string} [explanation] Sólo ejercicios: explicación al comprobar.
 * @property {Question} [question] Sólo ejercicios: el control de respuesta.
 */

/**
 * @typedef {Object} Question
 * @property {'choice'|'text'} type
 * @property {ChoiceOption[]} [options] Requerido si `type` es `choice`.
 * @property {string[]} [accepted] Requerido si `type` es `text`.
 * @property {string} [placeholder]
 * @property {string} [inputmode]
 * @property {string} [wrong] Mensaje genérico cuando la respuesta escrita falla.
 */

/**
 * @typedef {Object} ChoiceOption
 * @property {string} [tex] LaTeX de la opción.
 * @property {string} [text] Alternativa en texto plano (si no hay `tex`).
 * @property {boolean} correct
 * @property {string} [feedback] Por qué esta opción concreta está mal.
 */

/**
 * @typedef {Object} SheetGroup
 * Un grupo = varias hojas consecutivas que resuelven un mismo ejemplo o ejercicio.
 * @property {string} id
 * @property {string} [statement] Enunciado común, se muestra en la primera hoja.
 * @property {Sheet[]} sheets
 */

/**
 * @typedef {Object} Submodule
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {'Teoría'|'Ejemplo'|'Ejercicio'} [groupLabel] Etiqueta de los grupos.
 * @property {Sheet[]} [sheets] Hojas planas (teoría, reglas).
 * @property {SheetGroup[]} [groups] Hojas agrupadas (ejemplos, ejercicios).
 */

/**
 * @typedef {Object} Module
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {Submodule[]} submodules
 */

export {};
