/**
 * Módulo Funciones · Submódulo «Teoría».
 *
 * Hojas planas: cada una presenta UNA idea, su fórmula (si aplica) y una
 * explicación breve. El detalle largo vive en `why` (desplegable «¿Por qué?»)
 * para que la vista principal nunca sature.
 *
 * Todas las fórmulas usan `String.raw` para no pelear con las barras invertidas
 * de LaTeX.
 */

/** @type {import('../schema.js').Sheet[]} */
export const teoriaSheets = [
  {
    id: 'que-es-una-funcion',
    kind: 'theory',
    title: '¿Qué es una función?',
    formula: String.raw`f: A \to B, \qquad x \mapsto f(x)`,
    text: 'Una función es una regla que asigna a <strong>cada</strong> entrada $x$ del conjunto $A$ <strong>exactamente una</strong> salida del conjunto $B$. Si una misma $x$ pudiera producir dos resultados distintos, no sería una función.',
    why: 'Piensa en una máquina expendedora: eliges el código $4$ y siempre cae el mismo producto. Si a veces cayera uno y a veces otro, la máquina estaría rota. Con $y^{2}=x$ pasa eso: para $x=9$ hay dos salidas, $3$ y $-3$, así que no es función de $x$.',
    note: '$f(x)$ se lee «f de $x$» y representa la <em>salida</em> cuando la entrada es $x$. No es una multiplicación.',
  },
  {
    id: 'la-maquina',
    kind: 'theory',
    title: 'La función como máquina',
    formula: String.raw`x \;\longrightarrow\; \boxed{\,f(x)=3x-5\,} \;\longrightarrow\; f(x)`,
    text: String.raw`Toda función tiene tres piezas: la <strong>entrada</strong> $x$, la <strong>regla</strong> que transforma y la <strong>salida</strong> $f(x)$. Con $f(x)=3x-5$ y entrada $x=4$: multiplicamos $3\cdot 4 = 12$ y restamos $5$, así que $f(4)=7$.`,
    why: String.raw`Evaluar siempre es sustituir y operar en el orden correcto. Si escribes $3\cdot 4-5$ y respetas la jerarquía (multiplicar antes de restar) llegas a $7$. Ese «sustituir» es la herramienta que usarás en todos los ejercicios.`,
    note: 'Pedir $f(0)$ es preguntar: «¿qué sale si entra un cero?».',
  },
  {
    id: 'dominio',
    kind: 'theory',
    title: 'Dominio: lo que puede entrar',
    formula: String.raw`\text{Dom}(f) = \{\, x \in \mathbb{R} \;\mid\; f(x) \text{ existe} \,\}`,
    text: String.raw`El <strong>dominio</strong> es el conjunto de entradas permitidas: todas las $x$ para las que la cuenta se puede hacer. Calculamos $f(x) = \sqrt{x}$ y vemos que $x=-4$ no tiene resultado real, mientras que $x=9$ sí: $f(9)=3$. Por eso el dominio es $[0, \infty)$.`,
    why: String.raw`En los números reales hay dos operaciones prohibidas: la raíz de índice par de un negativo y la división entre cero. Todo el resto de $x$ sí está permitido, y por eso el dominio casi siempre es «todo $\mathbb{R}$ menos unos pocos valores».`,
    note: 'Dominio = preguntarse «¿qué podría fallar aquí?».',
  },
  {
    id: 'rango',
    kind: 'theory',
    title: 'Rango: lo que puede salir',
    formula: String.raw`\text{Rango}(f) = \{\, f(x) \;\mid\; x \in \text{Dom}(f) \,\}`,
    text: String.raw`El <strong>rango</strong> (o imagen) es el conjunto de salidas que la función <em>realmente</em> produce. En $f(x)=x^{2}$ el dominio es todo $\mathbb{R}$, pero la salida nunca es negativa: el rango es $[0, \infty)$. La x puede valer cualquier cosa; el resultado no.`,
    why: 'El rango no se copia del dominio: se deduce de la forma de la función. Una parábola que abre hacia arriba tiene un mínimo; un valor absoluto también. En cambio una recta no vertical recorre todos los reales.',
    note: 'Truco: el rango es una propiedad de la <em>salida</em>, así que conviene pensarlo después de conocer el dominio.',
  },
  {
    id: 'intervalos',
    kind: 'theory',
    title: 'Saber leer intervalos',
    formula: String.raw`(a,b) \quad [a,b) \quad [a,\infty) \quad (-\infty,a)\cup(a,\infty)`,
    text: String.raw`<strong>Corchete</strong> $[\,]$ significa que el extremo <em>sí</em> entra; <strong>paréntesis</strong> $(\;)$ significa que queda fuera. Los símbolos $-\infty$ y $\infty$ nunca llevan corchete, porque el infinito no es un número al que se pueda llegar.`,
    why: String.raw`En $f(x)=\sqrt{x-2}$ el valor $x=2$ sí funciona (da $0$), así que se escribe corchete: $[2,\infty)$. En cambio en $g(x)=\dfrac{1}{x-2}$ el valor $x=2$ rompe la cuenta, por eso se escribe paréntesis: $(-\infty,2)\cup(2,\infty)$.`,
    note: String.raw`La unión $\cup$ se usa cuando el dominio se parte en dos trozos separados.`,
  },
  {
    id: 'familias-i',
    kind: 'theory',
    title: 'Familias básicas: recta y parábola',
    formula: String.raw`f(x)=mx+b \qquad g(x)=ax^{2}+bx+c`,
    text: String.raw`La <strong>lineal</strong> crece o decrece siempre igual: su gráfica es una recta y su rango es todo $\mathbb{R}$ (salvo la recta horizontal). La <strong>cuadrática</strong> dibuja una parábola con un vértice: si $a>0$ abre hacia arriba y tiene mínimo; si $a<0$, máximo.`,
    why: 'Estas dos familias son el esqueleto de casi todo lo demás: los desplazamientos, las restricciones y el rango se ven mejor cuando reconoces la forma base antes de mirar los números.',
    note: 'Reconocer la forma base es el atajo: primero el tipo, después los detalles.',
  },
  {
    id: 'familias-ii',
    kind: 'theory',
    title: 'Familias básicas: raíz, fracción y absoluto',
    formula: String.raw`\sqrt{x} \qquad \frac{1}{x} \qquad |x|`,
    text: String.raw`La <strong>radical</strong> $\sqrt{x}$ empieza en su punto inicial y avanza en una sola dirección. La <strong>racional</strong> $\dfrac{1}{x}$ se parte en dos ramas con una asíntota donde el denominador se anula. El <strong>valor absoluto</strong> $|x|$ tiene forma de $V$ y nunca da resultados negativos.`,
    why: String.raw`Cada familia trae su propia restricción de dominio y su propia forma de rango: el radical exige radicando $\ge 0$, la racional exige denominador $\neq 0$, y el valor absoluto garantiza rango $\ge 0$. Son las tres pistas que resuelven casi todos los ejercicios.`,
    note: 'Con esto ya tienes el mapa completo: en el submódulo «Regla de Oro» convertimos estas pistas en un procedimiento.',
  },
];
