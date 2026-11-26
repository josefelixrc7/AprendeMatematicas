# AGENTS.md

Guía operativa para agentes (y personas) que extienden esta aplicación. Define
dónde vive cada cosa, cómo se añade contenido y cómo se verifica. Si el cambio
que vas a hacer no encaja en este archivo, probablemente haya que pensarlo dos
veces antes de tocar `js/engine.js` o `js/render.js`.

## Arquitectura en 30 segundos

- App 100 % estática: sin build, sin bundler, sin `npm install`. KaTeX se carga
  por CDN en `index.html`.
- Todo el código son ES Modules, así que **no funciona abrir `index.html` con
  `file://`**: hace falta un servidor (`python3 -m http.server 8000`).
- El motor (`js/engine.js`) sólo entiende tres niveles: **Módulo → Submódulo →
  Hojas**. No conoce «Funciones» ni ningún contenido concreto.
- Regla de oro del repo: **para añadir contenido sólo se toca `js/data/**`**.
  `js/engine.js`, `js/render.js`, `js/store.js` y `js/utils.js` son
  infraestructura; no se editan para dar de alta contenido.
- El contrato de datos es `js/data/schema.js` (JSDoc, sin código). Un campo nuevo
  se documenta ahí **primero** y sólo después se renderiza.

## Mapa de archivos

| Archivo                        | Rol                                                    |
| ------------------------------ | ------------------------------------------------------ |
| `js/engine.js`                 | Navegación, teclado, hash, progreso                    |
| `js/render.js`                 | Pinta hojas, pestañas y ejercicios (`renderSheet`)      |
| `js/store.js`                  | Persistencia en `localStorage`                         |
| `js/utils.js`                  | DOM, LaTeX inline, tipografiado KaTeX, comparación     |
| `js/data/index.js`             | **Registro de módulos: único punto de alta**           |
| `js/data/schema.js`            | Contrato: `Sheet`, `SheetGroup`, `Submodule`, `Module` |
| `js/data/funciones.js`         | Ensamblado del módulo Funciones                        |
| `js/data/funciones/*.js`       | Hojas de cada submódulo de Funciones                   |

## Crear un módulo nuevo (p. ej. «Límites»)

1. Crear `js/data/limites.js` con la forma de `Module`:

   ```js
   import { teoriaSheets } from './limites/teoria.js';

   /** @type {import('./schema.js').Module} */
   export const limitesModule = {
     id: 'limites', // kebab-case y ESTABLE: aparece en la URL
     title: 'Límites',
     description: 'Una línea sobre qué cubre el módulo.',
     submodules: [
       { id: 'teoria', title: 'Teoría', description: '…', sheets: teoriaSheets },
     ],
   };
   ```

   Los submódulos viven en `js/data/limites/*.js` (imita la carpeta
   `js/data/funciones/`) y se importan igual que en `funciones.js`.

2. Registrarlo en `js/data/index.js`: añadir el import y el elemento al array
   `modules`.

No hay paso 3: el selector de módulos, las pestañas, el progreso y la
persistencia se generan solos.

## Crear un submódulo nuevo

- **`sheets` (hojas planas)**: teoría o reglas. Un objeto `Sheet` por idea; el
  orden del array es el orden de navegación.
- **`groups` (hojas agrupadas)**: ejemplos o ejercicios. Cada grupo aporta sus
  hojas consecutivas con badge «{groupLabel} N · Paso i de n» y un `statement`
  común que sólo se muestra en la primera hoja.
- `groupLabel` («Ejemplo», «Ejercicio») define la etiqueta del badge; si se
  omite, el motor usa «Ejemplo».

## Anatomía de una hoja (`Sheet`)

| Campo          | Aplica a           | Descripción                                              |
| -------------- | ------------------ | -------------------------------------------------------- |
| `id`           | todas              | Kebab-case, único en el submódulo. **Nunca renombrar.** |
| `kind`         | todas              | `'theory'` \| `'example'` \| `'exercise'`                 |
| `title`        | todas              | Título corto; admite `$...$` en línea                    |
| `formula`      | opcional           | LaTeX principal, en modo display                         |
| `text`         | todas              | Explicación breve; HTML mínimo (`strong`/`em`)           |
| `formal`       | teoría             | Versión rigurosa; acordeón «La versión formal»           |
| `change`       | ejemplos           | Qué cambió respecto al paso anterior (se resalta)       |
| `why`          | ejemplos/ejercicios | Acordeón «¿Por qué?»                                     |
| `note`         | opcional           | Cierre mnemotécnico al pie de la hoja                    |
| `prompt`       | ejercicios         | Pregunta en lenguaje natural                             |
| `hint`         | ejercicios         | Pista previa, desplegable                                |
| `explanation`  | ejercicios         | Qué ocurre al comprobar la respuesta                     |
| `question`     | ejercicios         | El control de respuesta (ver abajo)                     |

## Convenciones de contenido

- **Técnica Feynman en teoría** (`kind: 'theory'`): `text` abre con la idea en
  lenguaje claro y una analogía cotidiana; `formal` guarda la versión rigurosa
  (plegada); `note` cierra con una regla fácil de recordar. En teoría no se usa
  `why`: las hojas ya tienen sus dos capas.
- **LaTeX siempre con `String.raw`**, para no escapar las barras invertidas.
- En prosa, fórmulas en línea con `$...$` **siempre balanceados** (el
  resaltador de `utils.js` lo exige).
- En ejemplos, el fragmento que cambia se marca dentro del propio LaTeX con
  `\boxed` o `\textcolor` (comandos nativos de KaTeX, sin `trust`).
- Contenido en español, tono directo, una idea por hoja. Si la explicación
  crece, va al acordeón; la vista principal nunca satura.

## Ejercicios: tipos de pregunta

- **`{ type: 'choice', options: [...] }`**: opción múltiple. Cada opción lleva
  `tex` (o `text`), `correct` y `feedback`. El `feedback` de cada opción
  incorrecta debe **diagnosticar el error concreto** (signo perdido, extremo
  invertido…), no repetir un «incorrecto» genérico.
- **`{ type: 'text', accepted: [...] }`**: respuesta corta. La comparación
  (`utils.js`) ignora espacios y comas decimales y acepta `≥`/`∞` alternativos;
  añade en `accepted` las grafías razonables (`['3', 'y=3']`).

## Ruteo y persistencia (no romperlos)

- La posición se refleja en la URL como `#/modulo/submodulo/indice`. El índice
  es **posicional**: insertar hojas en medio renumera las siguientes y cambia
  las URLs ya compartidas de esas hojas.
- El progreso se guarda en `localStorage` bajo `aprendematematicas:progress:v1`
  con claves `modulo/submodulo/id-de-hoja`. Renombrar un `id` hace que el
  usuario «pierda» su avance en esa hoja.

## Verificación mínima antes de dar por terminado

1. Sintaxis de los archivos de datos (no dependen del DOM):

   ```bash
   node -e "import('./js/data/limites.js').then(()=>console.log('OK')).catch(e=>{console.error(e.message);process.exit(1)})"
   ```

2. Paridad de `$` en cada archivo editado (el conteo debe ser par):

   ```bash
   grep -o '\$' js/data/limites/teoria.js | wc -l
   ```

3. Smoke en navegador: `python3 -m http.server 8000` → `http://localhost:8000`.
   Navegar el contenido nuevo, abrir los acordeones y responder un ejercicio.

4. Revisar el diff: salvo que la tarea pidiera otra cosa, sólo debe haber
   cambios bajo `js/data/**` (o en estos docs).

## Qué NO hacer

- No añadir frameworks, bundlers ni dependencias npm: el proyecto es ES
  Modules + CDN por diseño.
- No editar motor/render/store para meter contenido: cualquier `Sheet` conforme
  al schema ya se renderiza sola.
- No renombrar `id`s de módulos, submódulos u hojas existentes (rompe URLs y
  progreso guardado).
- No usar campos que no estén en `js/data/schema.js`: primero se documenta el
  campo y, si el motor no lo pinta, se añade el render mínimo.
- No activar `trust` en KaTeX: usar sólo comandos nativos (`\boxed`,
  `\textcolor`, …).
