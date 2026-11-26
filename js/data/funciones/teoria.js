/**
 * Módulo Funciones · Submódulo «Teoría».
 *
 * Hojas planas escritas con la técnica Feynman: el texto principal (`text`)
 * abre con la idea en lenguaje claro y una analogía de la vida real; la
 * versión rigurosa vive en `formal` (desplegable «La versión formal») y
 * `note` cierra cada hoja con una regla fácil de recordar.
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
    text: 'Una función es una <strong>máquina expendedora</strong>: pulsas el código $4$ y siempre cae el mismo producto. Cada entrada suelta <strong>una sola</strong> salida, siempre la misma. Si a veces cayera una golosina y a veces otra, dirías que la máquina está rota; con una función eso no pasa, porque cada entrada tiene su salida fija.',
    formal: String.raw`Formalmente, $f$ asigna a <strong>cada</strong> entrada $x$ del conjunto $A$ <strong>exactamente una</strong> salida $f(x)$ del conjunto $B$. La clave es la unicidad: si una misma $x$ produce dos resultados, no hay función. Así, $y^{2}=x$ no es función de $x$, porque la entrada $x=9$ produce dos salidas, $3$ y $-3$.`,
    note: '$f(x)$ se lee «f de $x$» y es la <em>salida</em> cuando entra $x$. No es una multiplicación.',
  },
  {
    id: 'la-maquina',
    kind: 'theory',
    title: 'La función como máquina',
    formula: String.raw`x \;\longrightarrow\; \boxed{\,f(x)=3x-5\,} \;\longrightarrow\; f(x)`,
    text: String.raw`Una función también es una <strong>receta de cocina</strong>: entran los ingredientes ($x=4$), sigues los pasos <em>en orden</em> —multiplicar por $3$, restar $5$— y sale el plato ($7$). La receta nunca cambia: quien cocine y con los mismos ingredientes, obtiene el mismo resultado.`,
    formal: String.raw`Evaluar es sustituir la entrada en la expresión y respetar la jerarquía de operaciones: $f(4)=3\cdot 4-5=12-5=7$. Ese «sustituir y operar en orden» es la herramienta que se usa en todos los ejercicios de este módulo.`,
    note: 'Pedir $f(0)$ es preguntar: «¿qué sale si entra un cero?».',
  },
  {
    id: 'dominio',
    kind: 'theory',
    title: 'Dominio: lo que puede entrar',
    formula: String.raw`\text{Dom}(f) = \{\, x \in \mathbb{R} \;\mid\; f(x) \text{ existe} \,\}`,
    text: String.raw`El dominio son <strong>los botones que funcionan</strong> de la máquina. En $f(x)=\sqrt{x}$ puedes pulsar $9$ (sale $3$), pero si pulsas $-4$ la máquina se traba: no existe ningún número que multiplicado por sí mismo dé $-4$. Dominio: sólo los botones que no rompen la cuenta, aquí $[0,\infty)$.`,
    formal: String.raw`$\text{Dom}(f)$ es el conjunto de las $x$ reales para las que la expresión tiene resultado real. En los reales sólo hay dos operaciones prohibidas: la raíz de índice par de un negativo y la división entre cero. Por eso el dominio casi siempre es «todo $\mathbb{R}$ menos unos pocos valores».`,
    note: 'Dominio = preguntarse «¿qué podría fallar aquí?».',
  },
  {
    id: 'rango',
    kind: 'theory',
    title: 'Rango: lo que puede salir',
    formula: String.raw`\text{Rango}(f) = \{\, f(x) \;\mid\; x \in \text{Dom}(f) \,\}`,
    text: String.raw`El rango es la <strong>carta real del restaurante</strong>: puedes pedir lo que quieras, pero sólo te sirven lo que la cocina sabe hacer. En $f(x)=x^{2}$ entran números de todo tipo, pero la cocina de «elevar al cuadrado» nunca sirve un plato negativo. Rango: $[0,\infty)$.`,
    formal: String.raw`El rango (o imagen) es el conjunto de salidas <em>alcanzables</em> al recorrer todo el dominio. No se copia del dominio: se deduce de la forma de la función. Una parábola que abre hacia arriba tiene un mínimo (su vértice) y nunca baja de ahí; el valor absoluto, igual; una recta no vertical recorre todos los reales.`,
    note: 'El rango es una propiedad de la <em>salida</em>: piénsalo después de conocer el dominio.',
  },
  {
    id: 'intervalos',
    kind: 'theory',
    title: 'Saber leer intervalos',
    formula: String.raw`(a,b) \quad [a,b) \quad [a,\infty) \quad (-\infty,a)\cup(a,\infty)`,
    text: String.raw`Un intervalo es una <strong>lista de invitados</strong>: el corchete $[\,]$ significa que el extremo <em>sí entra</em> a la fiesta; el paréntesis $(\;)$, que se queda en la puerta. Y el infinito nunca lleva corchete, porque es <em>un lugar al que nunca llegas</em>: no es un número, es una dirección.`,
    formal: String.raw`En $f(x)=\sqrt{x-2}$ el valor $x=2$ sí funciona (produce $0$), así que entra: $[2,\infty)$. En $g(x)=\dfrac{1}{x-2}$ el valor $x=2$ rompe la cuenta y queda fuera: $(-\infty,2)\cup(2,\infty)$. La unión $\cup$ une los trozos separados que deja un valor prohibido.`,
    note: 'Corchete = dentro; paréntesis = fuera; infinito = siempre paréntesis.',
  },
  {
    id: 'familias-i',
    kind: 'theory',
    title: 'Familias básicas: recta y parábola',
    formula: String.raw`f(x)=mx+b \qquad g(x)=ax^{2}+bx+c`,
    text: String.raw`Antes de mirar los números, <strong>reconoce la raza del perro</strong>. La lineal es una <strong>rampa</strong>: sube o baja siempre con la misma inclinación, sin sorpresas. La cuadrática es una <strong>pelota lanzada al aire</strong>: sube, alcanza su punto más alto (o más bajo, si abre hacia abajo) y regresa.`,
    formal: String.raw`La lineal $f(x)=mx+b$ tiene pendiente constante y rango todo $\mathbb{R}$ (salvo la horizontal, con $m=0$). La cuadrática tiene un vértice: si $a>0$ abre hacia arriba y su rango parte del mínimo; si $a<0$, del máximo. Reconocer la forma base resuelve dominio y rango antes que los números.`,
    note: 'Primero el tipo de función, después los detalles.',
  },
  {
    id: 'familias-ii',
    kind: 'theory',
    title: 'Familias básicas: raíz, fracción y absoluto',
    formula: String.raw`\sqrt{x} \qquad \frac{1}{x} \qquad |x|`,
    text: String.raw`Tres personajes con <strong>reglas de casa</strong>: la raíz es una <em>puerta que sólo abre para números no negativos</em>; la fracción $\dfrac{1}{x}$ es un <em>camino partido en dos por un río</em> que nadie cruza (en $x=0$ el denominador se anula); y el valor absoluto $|x|$ es una <em>hoja doblada en V</em>: mide la distancia y nunca sale negativa.`,
    formal: String.raw`Cada familia trae su restricción de dominio y su forma de rango: el radical exige radicando $\ge 0$ (dominio y rango $[0,\infty)$); la racional exige denominador $\neq 0$ (dominio y rango $\mathbb{R}-\{0\}$); el valor absoluto, definido en todo $\mathbb{R}$, garantiza rango $\ge 0$.`,
    note: 'Con este mapa, en «Regla de Oro» convertimos las pistas de cada familia en un procedimiento.',
  },
];
