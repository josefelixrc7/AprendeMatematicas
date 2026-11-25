# AprendeMatemáticas

Aplicación web educativa para aprender matemáticas con **hojas progresivas**: cada
hoja presenta una idea, su fórmula y una explicación breve. Sin frameworks, sin
pasos de compilación y sin dependencias más allá de KaTeX.

```bash
# Cualquier servidor estático sirve (los ES Modules no funcionan con file://)
python3 -m http.server 8000
# y abre http://localhost:8000
```

## Estructura

```
index.html                 Shell de la aplicación (header, progreso, hoja, paginador)
styles.css                 Tema «cuaderno», responsive y accesible
js/engine.js               Motor: navegación, teclado, hash, progreso
js/render.js               Presentación: pinta las hojas y los ejercicios
js/store.js                Persistencia en localStorage
js/utils.js                DOM, LaTeX inline, tipografiado KaTeX, comparación de respuestas
js/data/index.js           Registro de módulos  ← punto único de extensión
js/data/schema.js          Contrato de datos (JSDoc, sin código)
js/data/funciones.js       Módulo «Funciones»: ensambla sus 4 submódulos
js/data/funciones/
  teoria.js                Hojas planas de teoría
  regla-de-oro.js          Hojas planas de restricciones
  ejemplos.js              Grupos multi-hoja (un ejemplo = varias hojas)
  ejercicios.js            Grupos de práctica con validación y pistas
```

El motor sólo entiende tres niveles: **Módulo → Submódulo → Hojas**. No contiene
contenido ni conoce el módulo de Funciones.

## Añadir un módulo nuevo (Límites, Derivadas…)

1. Crear `js/data/limites.js` exportando un objeto con la forma descrita en
   `js/data/schema.js` (`id`, `title`, `submodules[]`).
2. Registrar el import en `js/data/index.js` y añadirlo al array `modules`.

No hay paso 3: el selector de módulos, las pestañas, el progreso y la persistencia
se generan solos. Un submódulo puede usar `sheets` (hojas planas) o `groups`
(varias hojas consecutivas para un mismo ejemplo o ejercicio).

## Convenciones de contenido

- Las fórmulas se escriben con `String.raw`, para no escapar las barras invertidas
  de LaTeX: ``formula: String.raw`\frac{1}{x}` ``.
- En el texto, `$...$` en línea se tipografía con KaTeX.
- En los ejemplos, el fragmento que cambia dentro de la fórmula se marca con
  `\boxed` o `\textcolor` (comandos nativos de KaTeX).
- Los ejercicios admiten `type: 'choice'` (con `feedback` por opción) o
  `type: 'text'` (con `accepted` y comparación tolerante a espacios, comas
  decimales, `≥` y `∞`).

## Atajos y accesibilidad

- `←` / `→` cambian de hoja (se ignoran al escribir en un campo).
- La posición se refleja en la URL (`#/funciones/ejemplos/7`), así que se puede
  recargar o compartir la hoja exacta.
- El progreso (hojas vistas, aciertos, última posición) se guarda en
  `localStorage` bajo `aprendematematicas:progress:v1`.
