/**
 * Módulo «Funciones».
 *
 * Ensamblado puro: importa las hojas de cada submódulo y las coloca en la
 * estructura jerárquica Módulo → Submódulo → Hojas que consume el motor.
 *
 * `sheets`  → hojas planas (una idea por hoja).
 * `groups`  → hojas agrupadas (un ejemplo o ejercicio ocupa varias hojas).
 */

import { teoriaSheets } from './funciones/teoria.js';
import { reglaDeOroSheets } from './funciones/regla-de-oro.js';
import { ejemploGroups } from './funciones/ejemplos.js';
import { ejercicioGroups } from './funciones/ejercicios.js';

/** @type {import('./schema.js').Module} */
export const funcionesModule = {
  id: 'funciones',
  title: 'Funciones',
  description:
    'Qué es una función, cuáles son sus restricciones y cómo obtener dominio y rango paso a paso.',
  submodules: [
    {
      id: 'teoria',
      title: 'Teoría',
      description: 'Conceptos base en hojas cortas.',
      sheets: teoriaSheets,
    },
    {
      id: 'regla-de-oro',
      title: 'Regla de Oro',
      description: 'Las restricciones que resuelven casi todo.',
      sheets: reglaDeOroSheets,
    },
    {
      id: 'ejemplos',
      title: 'Ejemplos',
      description: 'Un ejemplo completo repartido en varias hojas.',
      groupLabel: 'Ejemplo',
      groups: ejemploGroups,
    },
    {
      id: 'ejercicios',
      title: 'Ejercicios',
      description: 'Práctica con validación inmediata y pistas.',
      groupLabel: 'Ejercicio',
      groups: ejercicioGroups,
    },
  ],
};
