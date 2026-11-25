/**
 * Módulo Funciones · Submódulo «Regla de Oro».
 *
 * Restricciones clave del dominio y estrategias para el rango, una hoja por regla.
 * Sin fórmulas de relleno: sólo las que se usan al resolver.
 */

/** @type {import('../schema.js').Sheet[]} */
export const reglaDeOroSheets = [
  {
    id: 'regla-maestra',
    kind: 'theory',
    title: 'La regla maestra',
    formula: String.raw`\text{Dom}(f)=\mathbb{R} \;-\; \{\text{lo prohibido}\}`,
    text: String.raw`En los números reales sólo hay dos cosas prohibidas: <strong>raíces de índice par de números negativos</strong> y <strong>divisiones entre cero</strong>. Si la función no contiene ninguna de las dos, su dominio es todo $\mathbb{R}$.`,
    why: 'En lugar de buscar qué valores sí se permiten (infinitos), buscamos los pocos que no: es más rápido y no se olvida ninguno. Es el mismo atajo que usarías para decir quién falta en una fiesta contando las sillas vacías.',
    note: 'Primero clasifica la función; la restricción sale sola.',
  },
  {
    id: 'raiz-par',
    kind: 'theory',
    title: String.raw`Raíz de índice par: radicando $\ge 0$`,
    formula: String.raw`\sqrt[2n]{\,R(x)\,} \;\Longrightarrow\; R(x) \ge 0`,
    text: String.raw`En una raíz cuadrada (o cuarta, o sexta) el contenido debe ser <strong>positivo o cero</strong>. Así, $\sqrt{3x-12}$ exige $3x-12 \ge 0$, es decir $x \ge 4$. El punto de inicio del intervalo sí entra, porque la raíz de $0$ es $0$.`,
    why: String.raw`No existe ningún número real que multiplicado por sí mismo dé un resultado negativo, porque $(-)\cdot(-)=+$. Por eso pedir la raíz cuadrada de algo negativo no tiene respuesta real y ese valor de $x$ queda prohibido.`,
    note: String.raw`Las raíces de índice <em>impar</em>, como $\sqrt[3]{x}$, no restringen nada: aceptan negativos.`,
  },
  {
    id: 'denominador',
    kind: 'theory',
    title: 'Denominador distinto de cero',
    formula: String.raw`\frac{N(x)}{D(x)} \;\Longrightarrow\; D(x) \neq 0`,
    text: String.raw`Si $x$ aparece abajo, hay que exigir que la parte de abajo <strong>no se anule</strong>. En $\dfrac{2x+1}{x-3}$ la condición es $x-3 \neq 0$, es decir $x \neq 3$: ese único valor sale del dominio.`,
    why: 'Dividir entre cero no está definido: no es un número. Por eso el valor que anula el denominador deja un agujero en la gráfica, y en los intervalos se escribe con paréntesis en lugar de corchete.',
    note: String.raw`Los demás valores sí se permiten: el resto del dominio es todo $\mathbb{R}$.`,
  },
  {
    id: 'combinar',
    kind: 'theory',
    title: 'Varias restricciones: se intersectan',
    formula: String.raw`\text{Dom}(f) = D_1 \cap D_2 \cap \cdots`,
    text: String.raw`Si la función mezcla tipos, <strong>todas</strong> las condiciones deben cumplirse a la vez. En $h(x)=\dfrac{\sqrt{x-1}}{x-4}$ se pide $x-1\ge 0$ <em>y</em> $x-4\neq 0$, lo que deja $[1,4)\cup(4,\infty)$.`,
    why: 'Una función con dos operaciones peligrosas falla si falla cualquiera de las dos: es un «y» lógico, no un «o». Por eso se intersectan, y el resultado puede quedar partido en dos trozos.',
    note: 'Orden recomendado: escribir cada condición, graficarlas en la recta y quedarte con lo que se solapa.',
  },
  {
    id: 'rango-vertice',
    kind: 'theory',
    title: 'Rango por el vértice',
    formula: String.raw`a(x-h)^{2}+k \;\Longrightarrow\; \text{Rango}=[k,\infty) \text{ si } a>0`,
    text: 'En una cuadrática escrita como $a(x-h)^{2}+k$, el término al cuadrado nunca es negativo: su mínimo es $0$. Por eso la salida más pequeña es $k$ y el rango empieza ahí. Lo mismo ocurre con $|x-h|+k$, cuyo mínimo también es $k$.',
    why: String.raw`Si $a>0$ la parábola abre hacia arriba y $k$ es el punto más bajo; si $a<0$ abre hacia abajo y $k$ es el más alto, cambiando el intervalo por $(-\infty,k]$. El signo de $a$ decide la dirección; $k$, el extremo.`,
    note: 'El valor $h$ (posición horizontal del vértice) afecta al dominio, no al rango.',
  },
  {
    id: 'rango-desplazamiento',
    kind: 'theory',
    title: 'Rango por desplazamiento vertical',
    formula: String.raw`\sqrt{x}+k \Longrightarrow [k,\infty) \qquad \frac{1}{x}+k \Longrightarrow \mathbb{R}-\{k\}`,
    text: String.raw`Un número sumado <strong>fuera</strong> de la raíz o de la fracción mueve toda la gráfica hacia arriba o hacia abajo, y con ella el rango. $\sqrt{x}$ tiene rango $[0,\infty)$; al sumarle $2$ pasa a $[2,\infty)$. Del mismo modo $y=\dfrac{1}{x}$ nunca vale $0$, y $\dfrac{1}{x}+3$ nunca vale $3$.`,
    why: String.raw`Sólo el desplazamiento vertical cambia el rango; el horizontal desplaza el dominio. Y un factor que multiplica sí lo cambia: $-2\sqrt{x}$ invierte la dirección y convierte $[0,\infty)$ en $(-\infty,0]$.`,
    note: 'Checklist final: 1) tipo de función, 2) restricciones de dominio, 3) forma del rango, 4) desplazamientos.',
  },
];
