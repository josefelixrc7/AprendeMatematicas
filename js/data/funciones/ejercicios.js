/**
 * Módulo Funciones · Submódulo «Ejercicios».
 *
 * Cada grupo es un ejercicio; si el ejercicio pide dos cosas (por ejemplo dominio y
 * después rango) se reparte en varias hojas, una pregunta por hoja. Así la pantalla
 * nunca pide dos decisiones a la vez.
 *
 * Tipos de pregunta:
 *  - `{ type: 'choice', options: [{ tex|text, correct, feedback }] }`
 *       Opción múltiple. `feedback` explica el error de esa opción concreta.
 *  - `{ type: 'text', accepted: ['3', 'y=3'], placeholder }`
 *       Respuesta corta. La comparación ignora espacios, comas y símbolos ≥/∞.
 *
 * Campos comunes de la hoja: `prompt`, `hint` (pista antes de responder) y
 * `explanation` (qué ocurre cuando acierta).
 */

/** @type {import('../schema.js').SheetGroup[]} */
export const ejercicioGroups = [
  {
    id: 'ejercicio-radical-simple',
    statement: String.raw`Dominio de $f(x)=\sqrt{x+5}$.`,
    sheets: [
      {
        id: 'ej-r1',
        kind: 'exercise',
        title: 'Empieza por el radicando',
        prompt: '¿Cuál es el dominio de la función?',
        formula: String.raw`f(x)=\sqrt{x+5}`,
        hint: String.raw`Una raíz cuadrada exige que lo de dentro sea mayor o igual que cero: $x+5 \ge 0$.`,
        explanation:
          String.raw`De $x+5 \ge 0$ sale $x \ge -5$. El valor $-5$ sí entra porque $\sqrt{0}=0$ existe, así que el intervalo cierra con corchete: $[-5,\infty)$.`,
        question: {
          type: 'choice',
          options: [
            {
              tex: String.raw`[-5,\infty)`,
              correct: true,
              feedback: '',
            },
            {
              tex: String.raw`(-5,\infty)`,
              correct: false,
              feedback:
                String.raw`Casi: el paréntesis excluye el $-5$, pero $\sqrt{-5+5}=\sqrt{0}=0$ sí se puede calcular. Ese extremo debe entrar.`,
            },
            {
              tex: String.raw`(-\infty,-5]`,
              correct: false,
              feedback:
                String.raw`Se invirtió el intervalo: la condición es $x+5 \ge 0$, es decir $x \ge -5$, no $x \le -5$.`,
            },
            {
              tex: String.raw`[5,\infty)`,
              correct: false,
              feedback:
                String.raw`Se perdió el signo al despejar: al pasar el $5$ al otro lado queda $x \ge -5$, no $x \ge 5$.`,
            },
          ],
        },
      },
    ],
  },

  {
    id: 'ejercicio-racional-simple',
    statement: String.raw`Dominio de $g(x)=\dfrac{1}{x^{2}-9}$.`,
    sheets: [
      {
        id: 'ej-r2',
        kind: 'exercise',
        title: 'Sólo el denominador manda',
        prompt: '¿Cuál es el dominio de la función?',
        formula: String.raw`g(x)=\frac{1}{x^{2}-9}`,
        hint: 'El denominador no puede valer cero. Resuelve $x^{2}-9=0$ para saber qué valores hay que excluir.',
        explanation:
          String.raw`$x^{2}-9=0$ da $x=3$ y $x=-3$ (diferencia de cuadrados). Se excluyen los dos: $\mathbb{R}-\{-3,3\}$, que en intervalos se escribe $(-\infty,-3)\cup(-3,3)\cup(3,\infty)$.`,
        question: {
          type: 'choice',
          options: [
            {
              tex: String.raw`\mathbb{R}-\{-3,\,3\}`,
              correct: true,
              feedback: '',
            },
            {
              tex: String.raw`\mathbb{R}-\{3\}`,
              correct: false,
              feedback:
                'Falta una raíz: $x^{2}-9=0$ tiene dos soluciones, $3$ y $-3$. Hay que excluir ambas.',
            },
            {
              tex: String.raw`\mathbb{R}-\{-9,\,9\}`,
              correct: false,
              feedback:
                'Se confundió el radicando con la raíz: hay que anular $x^{2}-9$, no igualar $x^{2}$ a $-9$.',
            },
            {
              tex: String.raw`\mathbb{R}`,
              correct: false,
              feedback:
                String.raw`Hay una fracción: si $x=3$ el denominador se anula y la cuenta no existe. El dominio no puede ser todo $\mathbb{R}$.`,
            },
          ],
        },
      },
    ],
  },

  {
    id: 'ejercicio-dominio-rango',
    statement: String.raw`Analiza $f(x)=\sqrt{2x-8}$ paso a paso.`,
    sheets: [
      {
        id: 'ej-r3a',
        kind: 'exercise',
        title: 'Primer paso: el dominio',
        prompt: 'Antes de nada, ¿cuál es el dominio de $f$?',
        formula: String.raw`f(x)=\sqrt{2x-8}`,
        hint: String.raw`Plantea $2x-8 \ge 0$ y despeja. Recuerda que dividir entre un número positivo no cambia el sentido del símbolo.`,
        explanation:
          String.raw`$2x-8 \ge 0 \Rightarrow 2x \ge 8 \Rightarrow x \ge 4$. El $4$ entra, así que el dominio es $[4,\infty)$.`,
        question: {
          type: 'choice',
          options: [
            { tex: String.raw`[4,\infty)`, correct: true, feedback: '' },
            {
              tex: String.raw`[8,\infty)`,
              correct: false,
              feedback:
                String.raw`Se quedó la condición en $2x \ge 8$ sin dividir entre $2$. Termina el despeje: $x \ge 4$.`,
            },
            {
              tex: String.raw`(-\infty,4]`,
              correct: false,
              feedback:
                String.raw`El sentido de la desigualdad está invertido: al dividir entre $2$ (positivo) el símbolo $\ge$ no cambia.`,
            },
          ],
        },
      },
      {
        id: 'ej-r3b',
        kind: 'exercise',
        title: 'Segundo paso: el rango',
        prompt: 'Ya conocido el dominio, ¿cuál es el rango de $f$?',
        formula: String.raw`f(x)=\sqrt{2x-8}`,
        hint: 'La raíz no tiene nada sumado fuera. ¿Cuál es el valor más pequeño que puede devolver ?',
        explanation:
          String.raw`La raíz vale $0$ en $x=4$ y crece desde ahí: el rango es $[0,\infty)$. Sin desplazamiento vertical, el extremo inferior es $0$.`,
        question: {
          type: 'choice',
          options: [
            { tex: String.raw`[0,\infty)`, correct: true, feedback: '' },
            {
              tex: String.raw`[4,\infty)`,
              correct: false,
              feedback:
                'Ese es el dominio: $4$ es una entrada, no una salida. El rango se refiere a los valores de $f(x)$.',
            },
            {
              tex: String.raw`[8,\infty)`,
              correct: false,
              feedback:
                '$8$ es el valor de $x$ que anula el radicando, no la salida mínima. En $x=4$ la función vale $0$.',
            },
            {
              tex: String.raw`\mathbb{R}`,
              correct: false,
              feedback:
                String.raw`Una raíz cuadrada nunca devuelve negativos, así que no puede cubrir todo $\mathbb{R}$.`,
            },
          ],
        },
      },
    ],
  },

  {
    id: 'ejercicio-cuadratica',
    statement: 'Rango de $p(x)=(x-2)^{2}-1$.',
    sheets: [
      {
        id: 'ej-r4',
        kind: 'exercise',
        title: 'Busca el vértice',
        prompt: '¿Cuál es el rango de la función?',
        formula: String.raw`p(x)=(x-2)^{2}-1`,
        hint: String.raw`Un cuadrado nunca es negativo: $(x-2)^{2} \ge 0$. Réstale $1$ a esa desigualdad.`,
        explanation:
          String.raw`$(x-2)^{2} \ge 0$, así que $(x-2)^{2}-1 \ge -1$. El mínimo vale $-1$ y se alcanza en $x=2$: el rango es $[-1,\infty)$.`,
        question: {
          type: 'choice',
          options: [
            { tex: String.raw`[-1,\infty)`, correct: true, feedback: '' },
            {
              tex: String.raw`[1,\infty)`,
              correct: false,
              feedback:
                'El término independiente es $-1$, no $+1$. El mínimo del cuadrado es $0$, y al restar $1$ queda $-1$.',
            },
            {
              tex: String.raw`[2,\infty)`,
              correct: false,
              feedback:
                String.raw`$2$ es la posición horizontal del vértice (afecta al dominio, que aquí es todo $\mathbb{R}$), no el extremo del rango.`,
            },
            {
              tex: String.raw`(-\infty,-1]`,
              correct: false,
              feedback:
                String.raw`La parábola abre hacia arriba (coeficiente positivo del cuadrado), así que $-1$ es el mínimo y el rango va hacia $+\infty$.`,
            },
          ],
        },
      },
    ],
  },

  {
    id: 'ejercicio-absoluto',
    statement: 'Rango de $q(x)=|x+1|-4$.',
    sheets: [
      {
        id: 'ej-r5',
        kind: 'exercise',
        title: 'La V desplazada',
        prompt: '¿Cuál es el rango de la función?',
        formula: String.raw`q(x)=|x+1|-4`,
        hint: String.raw`$|x+1| \ge 0$ siempre. El mínimo del valor absoluto es $0$, y está a la altura del vértice.`,
        explanation:
          String.raw`El mínimo de $|x+1|$ es $0$ (en $x=-1$), y al restarle $4$ el mínimo resulta $-4$. Como la $V$ abre hacia arriba, el rango es $[-4,\infty)$.`,
        question: {
          type: 'choice',
          options: [
            { tex: String.raw`[-4,\infty)`, correct: true, feedback: '' },
            {
              tex: String.raw`[4,\infty)`,
              correct: false,
              feedback:
                'El signo del desplazamiento es negativo: la gráfica baja $4$ unidades, así que el mínimo es $-4$.',
            },
            {
              tex: String.raw`[-1,\infty)`,
              correct: false,
              feedback:
                '$-1$ es la coordenada horizontal del vértice; el rango depende de la altura, que es $-4$.',
            },
            { tex: String.raw`\mathbb{R}`, correct: false, feedback: 'Un valor absoluto nunca da resultados por debajo de su vértice.' },
          ],
        },
      },
    ],
  },

  {
    id: 'ejercicio-respuesta-corta',
    statement: String.raw`Rango de $f(x)=\sqrt{x-1}+3$.`,
    sheets: [
      {
        id: 'ej-r6',
        kind: 'exercise',
        title: 'Escribe el extremo',
        prompt: '¿Cuál es el valor <strong>mínimo</strong> del rango de $f$? (escribe sólo el número)',
        formula: String.raw`f(x)=\sqrt{x-1}+3`,
        hint: String.raw`El mínimo de $\sqrt{x-1}$ es $0$, y está fuera un $+3$. ¿Qué altura alcanza el punto más bajo?`,
        explanation:
          String.raw`En $x=1$ la raíz vale $0$ y la función vale $3$. Ese es el punto más bajo, así que el rango es $[3,\infty)$ y su valor mínimo es $3$.`,
        question: {
          type: 'text',
          accepted: ['3', 'y=3', 'f(x)=3'],
          placeholder: 'Escribe un número, por ejemplo 3',
          inputmode: 'decimal',
          wrong:
            'Todavía no. Revisa: la raíz aporta $0$ como mínimo y fuera hay un $+3$, así que el punto más bajo no está en $0$.',
        },
      },
    ],
  },

  {
    id: 'ejercicio-combinado',
    statement: String.raw`Dominio de $h(x)=\dfrac{\sqrt{x+2}}{x-1}$.`,
    sheets: [
      {
        id: 'ej-r7',
        kind: 'exercise',
        title: 'Dos restricciones a la vez',
        prompt: '¿Cuál es el dominio de la función?',
        formula: String.raw`h(x)=\frac{\sqrt{x+2}}{x-1}`,
        hint: String.raw`Aquí hay dos condiciones: el radicando $x+2 \ge 0$ y el denominador $x-1 \neq 0$. Deben cumplirse las dos, así que se intersectan.`,
        explanation:
          String.raw`De la raíz sale $x \ge -2$; del denominador, $x \neq 1$. Al intersectar queda $[-2,1)\cup(1,\infty)$: el $-2$ entra (la raíz de $0$ existe) y el $1$ se excluye.`,
        question: {
          type: 'choice',
          options: [
            { tex: String.raw`[-2,1)\cup(1,\infty)`, correct: true, feedback: '' },
            {
              tex: String.raw`(-2,1)\cup(1,\infty)`,
              correct: false,
              feedback:
                'El paréntesis en $-2$ es incorrecto: en $x=-2$ el radicando vale $0$ y la raíz existe. Ese extremo entra.',
            },
            {
              tex: String.raw`[-2,\infty)`,
              correct: false,
              feedback:
                'Falta excluir $x=1$: allí el denominador se anula y la función no existe. El dominio queda partido en dos trozos.',
            },
            {
              tex: String.raw`(-2,\infty)`,
              correct: false,
              feedback:
                'Se perdieron las dos condiciones: el $-2$ sí entra y el $1$ debe salir. La respuesta correcta tiene dos trozos.',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'ejercicio-invertida',
    statement: String.raw`Rango de $f(x)=3-\sqrt{x}$.`,
    sheets: [
      {
        id: 'ej-r8',
        kind: 'exercise',
        title: 'Un signo que lo cambia todo',
        prompt: '¿Cuál es el rango de la función?',
        formula: String.raw`f(x)=3-\sqrt{x}`,
        hint: String.raw`La raíz crece, pero va con signo negativo delante: al crecer $\sqrt{x}$, el valor de $f$ baja. El máximo está donde la raíz es $0$.`,
        explanation:
          String.raw`Como $\sqrt{x} \ge 0$, al restarlo de $3$ se obtiene $f(x) \le 3$. El valor $3$ se alcanza en $x=0$ (que está en el dominio), y la función baja sin límite: el rango es $(-\infty,3]$.`,
        question: {
          type: 'choice',
          options: [
            { tex: String.raw`(-\infty,3]`, correct: true, feedback: '' },
            {
              tex: String.raw`[3,\infty)`,
              correct: false,
              feedback:
                String.raw`El signo está invertido: el $-\sqrt{x}$ hace que la función baje. $3$ es el máximo, no el mínimo.`,
            },
            {
              tex: String.raw`(-\infty,-3]`,
              correct: false,
              feedback:
                'Revisa el desplazamiento: el $3$ es positivo, así que el máximo está en $3$, no en $-3$.',
            },
            {
              tex: String.raw`[0,\infty)`,
              correct: false,
              feedback:
                String.raw`Ese sería el rango de $\sqrt{x}$ sin transformar. El signo negativo y el $+3$ cambian por completo el conjunto de salidas.`,
            },
          ],
        },
      },
    ],
  },
];
