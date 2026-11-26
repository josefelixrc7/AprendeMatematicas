/**
 * Capa de presentación.
 *
 * El renderizador no sabe qué es un «módulo de Funciones»: sólo recibe una vista
 * de hoja ya aplanada por el motor y la dibuja. Toda la matemática se marca con
 * `math()` y se tipografía después con `typeset()`, de modo que un cambio de hoja
 * o la apertura de un desplegable siempre vuelve a renderizar las fórmulas.
 */

import { el, clear, math, richText, typeset, answersMatch } from './utils.js';
import { getAnswer, recordAnswer } from './store.js';

/** Contador para generar nombres de grupo de radios únicos. */
let uid = 0;

/* ------------------------------------------------------------ navegación */

/**
 * Rellena el selector de módulos.
 *
 * @param {HTMLSelectElement} select
 * @param {import('./data/schema.js').Module[]} modules
 * @param {string} activeId
 * @param {(id: string) => void} onSelect
 */
export function renderModuleSelect(select, modules, activeId, onSelect) {
  clear(select);
  for (const module of modules) {
    select.append(el('option', { text: module.title, attrs: { value: module.id } }));
  }
  select.value = activeId;
  select.onchange = () => onSelect(select.value);
}

/**
 * Rellena las pestañas de submódulos.
 *
 * @param {HTMLElement} nav
 * @param {import('./data/schema.js').Submodule[]} submodules
 * @param {string} activeId
 * @param {(id: string) => void} onSelect
 */
export function renderSubmoduleTabs(nav, submodules, activeId, onSelect) {
  clear(nav);
  for (const submodule of submodules) {
    const active = submodule.id === activeId;
    const tab = el('button', {
      className: active ? 'tab tab--active' : 'tab',
      text: submodule.title,
      attrs: {
        type: 'button',
        role: 'tab',
        'aria-selected': active ? 'true' : 'false',
        'aria-current': active ? 'page' : false,
        title: submodule.description ?? submodule.title,
      },
    });
    tab.addEventListener('click', () => onSelect(submodule.id));
    nav.append(tab);
  }
}

/**
 * Actualiza el indicador «Hoja n / m» y la barra de progreso.
 *
 * @param {{index: number, total: number, note: string}} view
 */
export function renderProgress({ index, total, note }) {
  const label = document.getElementById('progress-label');
  const noteEl = document.getElementById('progress-note');
  const bar = document.getElementById('progress-bar');
  const fill = document.getElementById('progress-fill');

  label.textContent = `Hoja ${index + 1} / ${total}`;
  noteEl.textContent = note;

  const ratio = total > 0 ? (index + 1) / total : 0;
  bar.setAttribute('aria-valuemax', String(total));
  bar.setAttribute('aria-valuenow', String(index + 1));
  fill.style.width = `${Math.max(4, Math.round(ratio * 100))}%`;
}

/**
 * Habilita o deshabilita los botones del paginador.
 *
 * @param {boolean} hasPrev
 * @param {boolean} hasNext
 */
export function renderPager(hasPrev, hasNext) {
  document.getElementById('prev-btn').disabled = !hasPrev;
  document.getElementById('next-btn').disabled = !hasNext;
}

/* ----------------------------------------------------------------- hoja */

/**
 * Dibuja la hoja actual.
 *
 * @param {Object} view Vista aplanada por el motor.
 * @param {import('./data/schema.js').Sheet} view.sheet
 * @param {string} view.key Clave de persistencia (`modulo/submodulo/hoja`).
 * @param {string|null} [view.groupLabel] Etiqueta del grupo («Ejemplo 2»).
 * @param {number} [view.stepIndex] Paso 1-based dentro del grupo.
 * @param {number} [view.stepTotal] Hojas del grupo.
 * @param {string|null} [view.statement] Enunciado común del grupo.
 * @param {() => void} [onGraded] Se invoca tras registrar una respuesta.
 * @returns {HTMLElement}
 */
export function renderSheet(view, onGraded) {
  const { sheet } = view;
  const article = el('article', { className: 'sheet sheet--enter' });

  // Etiqueta de grupo: «Ejemplo 2 · Paso 3 de 7».
  if (view.groupLabel) {
    const step =
      view.stepTotal > 1 ? ` · Paso ${view.stepIndex} de ${view.stepTotal}` : '';
    article.append(el('p', { className: 'group-badge', text: view.groupLabel + step }));
  }

  // El enunciado sólo se repite en la primera hoja del grupo, para no saturar.
  if (view.statement && (view.stepIndex ?? 1) === 1) {
    const statement = el('p', { className: 'sheet__statement' });
    statement.append(el('strong', { text: 'Enunciado: ' }));
    // `richText` devuelve un DocumentFragment: se añade como nodo, nunca se expande.
    statement.append(richText(view.statement));
    article.append(statement);
  }

  // `richText` permite fórmulas en línea también en los títulos («Raíz: radicando $\ge 0$»).
  article.append(el('h2', { className: 'sheet__title' }, richText(sheet.title)));

  if (sheet.formula) {
    article.append(el('div', { className: 'sheet__formula' }, [math(sheet.formula, { display: true })]));
  }

  if (sheet.change) {
    article.append(el('div', { className: 'sheet__change' }, richText(sheet.change)));
  }

  if (sheet.text) {
    article.append(el('p', { className: 'sheet__text' }, richText(sheet.text)));
  }

  // Teoría: versión rigurosa plegada en el acordeón «La versión formal».
  if (sheet.formal) {
    article.append(disclosure('La versión formal', [el('p', {}, richText(sheet.formal))]));
  }

  if (sheet.kind === 'exercise' && sheet.question) {
    article.append(buildExercise(view, onGraded));
  }

  if (sheet.why) {
    article.append(disclosure('¿Por qué?', [el('p', {}, richText(sheet.why))]));
  }

  if (sheet.note) {
    article.append(el('p', { className: 'sheet__note' }, richText(sheet.note)));
  }

  return article;
}

/* ------------------------------------------------------------ ejercicio */

/**
 * Bloque interactivo completo: pregunta, control de respuesta, pista y feedback.
 *
 * @param {Object} view
 * @param {() => void} [onGraded]
 * @returns {HTMLElement}
 */
function buildExercise(view, onGraded) {
  const { sheet } = view;
  const question = sheet.question;
  const stored = getAnswer(view.key);
  const wrap = el('div', { className: 'exercise' });

  if (sheet.prompt) {
    wrap.append(el('p', { className: 'exercise__prompt' }, richText(sheet.prompt)));
  }

  const feedbackSlot = el('div', { className: 'exercise__feedback' });
  /** @type {{node: HTMLElement, restore: Function, lock: Function}|null} */
  let control = null;

  /**
   * Registra el resultado: bloquea el control, pinta el feedback y avisa al motor.
   *
   * @param {boolean} correct
   * @param {*} response Respuesta tal como la dio el estudiante (índice o texto).
   * @param {string} [wrongMessage] Explicación específica del error.
   */
  function finish(correct, response, wrongMessage) {
    control?.lock?.(response);
    recordAnswer(view.key, { correct, response });
    feedbackSlot.append(
      buildFeedback(sheet, correct, correct ? sheet.explanation : wrongMessage ?? question.wrong)
    );
    typeset(feedbackSlot);
    onGraded?.();
  }

  control =
    question.type === 'text'
      ? buildTextControl(question, finish)
      : buildChoiceControl(question, finish);

  // Respuesta ya guardada (el estudiante vuelve a la hoja): estado bloqueado.
  if (stored) {
    control.restore(stored);
    feedbackSlot.append(
      buildFeedback(
        sheet,
        stored.correct,
        stored.correct
          ? sheet.explanation
          : question.type === 'choice'
            ? question.options[Number(stored.response)]?.feedback ?? question.wrong
            : question.wrong
      )
    );
  }

  wrap.append(control.node);

  if (sheet.hint) {
    wrap.append(disclosure('Pista', [el('p', {}, richText(sheet.hint))]));
  }

  wrap.append(feedbackSlot);
  return wrap;
}

/**
 * Caja de retroalimentación. Al fallar añade, plegada, la explicación completa.
 *
 * @param {import('./data/schema.js').Sheet} sheet
 * @param {boolean} correct
 * @param {string} [message]
 * @returns {HTMLElement}
 */
function buildFeedback(sheet, correct, message) {
  const box = el('div', { className: correct ? 'feedback feedback--ok' : 'feedback feedback--err' });
  box.append(
    el('p', { className: 'feedback__head', text: correct ? '¡Correcto!' : 'Todavía no' })
  );
  if (message) box.append(el('p', {}, richText(message)));

  if (correct && sheet.note) {
    box.append(el('p', { className: 'feedback__actions' }, richText(sheet.note)));
  }

  // Al fallar, la resolución queda disponible pero plegada: no se impone.
  if (!correct && sheet.explanation) {
    const details = disclosure('Ver la explicación del paso', [
      el('p', {}, richText(sheet.explanation)),
    ]);
    box.append(el('div', { className: 'feedback__actions' }, [details]));
  }

  return box;
}

/**
 * Opción múltiple con validación inmediata al marcar.
 *
 * @param {import('./data/schema.js').Question} question
 * @param {{correct: boolean, response: any}|null} stored
 * @param {(correct: boolean, response: any, wrongMessage?: string) => void} finish
 */
function buildChoiceControl(question, finish) {
  const name = `opcion-${++uid}`;
  const node = el('div', { className: 'options', attrs: { role: 'radiogroup' } });
  const entries = [];

  question.options.forEach((option, index) => {
    const input = el('input', {
      attrs: { type: 'radio', name, value: String(index), 'aria-label': `Opción ${index + 1}` },
    });
    const label = el('label', { className: 'option' }, [
      input,
      el('span', { className: 'option__mark', attrs: { 'aria-hidden': 'true' } }),
      el('span', { className: 'option__content' }, option.tex ? [math(option.tex)] : [document.createTextNode(option.text ?? '')]),
    ]);
    input.addEventListener('change', () => {
      const chosen = question.options[index];
      finish(Boolean(chosen.correct), index, chosen.feedback);
    });
    entries.push({ label, input, option, index });
    node.append(label);
  });

  /** Bloquea todas las opciones y marca cuál era correcta y cuál se eligió. */
  function lock(selectedIndex) {
    for (const entry of entries) {
      entry.input.disabled = true;
      entry.label.classList.add('option--locked');
      if (entry.option.correct) entry.label.classList.add('option--correct');
    }
    if (selectedIndex !== null && !question.options[selectedIndex]?.correct) {
      entries[selectedIndex]?.label.classList.add('option--wrong');
    }
  }

  return {
    node,
    lock,
    restore(storedAnswer) {
      const selected = Number(storedAnswer.response);
      if (entries[selected]) entries[selected].input.checked = true;
      lock(Number.isFinite(selected) ? selected : null);
    },
  };
}

/**
 * Respuesta corta con normalización tolerante (espacios, comas, ≥, ∞…).
 *
 * @param {import('./data/schema.js').Question} question
 * @param {{correct: boolean, response: any}|null} stored
 * @param {(correct: boolean, response: any, wrongMessage?: string) => void} finish
 */
function buildTextControl(question, finish) {
  const node = el('div', { className: 'text-row' });
  const input = el('input', {
    className: 'text-input',
    attrs: {
      type: 'text',
      placeholder: question.placeholder ?? 'Escribe tu respuesta',
      inputmode: question.inputmode ?? 'text',
      autocomplete: 'off',
      spellcheck: 'false',
      'aria-label': 'Tu respuesta',
    },
  });
  const button = el('button', {
    className: 'btn btn--primary btn--sm',
    text: 'Comprobar',
    attrs: { type: 'button' },
  });

  const submit = () => {
    const value = input.value.trim();
    if (!value) {
      input.focus();
      return;
    }
    const correct = answersMatch(question.accepted ?? [], value);
    finish(correct, value, question.wrong);
  };

  button.addEventListener('click', submit);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

  node.append(input, button);

  /** Bloquea el control mostrando lo que se respondió. */
  function lock(response) {
    if (response !== undefined && response !== null) input.value = String(response);
    input.disabled = true;
    button.disabled = true;
  }

  return {
    node,
    lock,
    restore(storedAnswer) {
      lock(storedAnswer.response);
    },
  };
}

/* --------------------------------------------------------- desplegables */

/**
 * `<details>` con el estilo del cuaderno y re-tipografiado al abrirse.
 *
 * @param {string} summaryText
 * @param {Array<Node|string>} bodyNodes
 * @returns {HTMLDetailsElement}
 */
function disclosure(summaryText, bodyNodes) {
  const details = el('details', { className: 'disclosure' });
  details.append(
    el('summary', { text: summaryText }),
    el('div', { className: 'disclosure__body' }, bodyNodes)
  );

  // El contenido puede estar cerrado al renderizar; al abrirlo, se tipografía
  // de nuevo para que KaTeX mida bien el ancho disponible.
  details.addEventListener('toggle', () => {
    if (details.open) typeset(details);
  });

  return details;
}
