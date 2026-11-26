/**
 * Módulo Funciones · Submódulo «Regla de Oro».
 *
 * Restricciones clave del dominio y estrategias para el rango, una hoja por
 * regla. Igual que en «Teoría», `text` abre con la analogía (técnica Feynman)
 * y `formal` guarda la versión rigurosa en el desplegable «La versión formal».
 * Sin fórmulas de relleno: sólo las que se usan al resolver.
 */

/** @type {import('../schema.js').Sheet[]} */
export const reglaDeOroSheets = [
  {
    id: 'regla-maestra',
    kind: 'theory',
    title: 'La regla maestra',
    formula: String.raw`\text{Dom}(f)=\mathbb{R} \;-\; \{\text{lo prohibido}\}`,
    text: String.raw`Para saber quién falta a una fiesta no repasas a los mil invitados: <strong>miras las pocas sillas vacías</strong>. Con el dominio igual: en vez de buscar los infinitos valores permitidos, cazamos los poquísimos prohibidos. Y en los números reales sólo existen dos delitos: <strong>raíz par de un negativo</strong> y <strong>división entre cero</strong>. Si la función no comete ninguno, su dominio es todo $\mathbb{R}$.`,
    formal: String.raw`$\text{Dom}(f)$ reúne las $x$ para las que la expresión está definida; si la función no contiene ninguna de las dos operaciones prohibidas, es todo $\mathbb{R}$. Buscar los pocos valores excluidos es más rápido y más seguro que intentar listar los infinitos permitidos.`,
    note: 'Primero clasifica la función; la restricción sale sola.',
  },
  {
    id: 'raiz-par',
    kind: 'theory',
    title: String.raw`Raíz de índice par: radicando $\ge 0$`,
    formula: String.raw`\sqrt[2n]{\,R(x)\,} \;\Longrightarrow\; R(x) \ge 0`,
    text: String.raw`Nadie hornea una <strong>galleta cuadrada con área negativa</strong>: cualquier número multiplicado por sí mismo da positivo o cero, porque los negativos se cancelan entre sí, $(-)\cdot(-)=(+)$. Por eso lo de dentro de una raíz par debe ser <strong>positivo o cero</strong>. En $\sqrt{3x-12}$ se exige $3x-12\ge 0$, es decir $x\ge 4$.`,
    formal: String.raw`No existe ningún número real cuyo cuadrado sea negativo, así que $\sqrt[2n]{R(x)}$ sólo está definida cuando $R(x)\ge 0$. El punto de inicio del intervalo <em>sí</em> entra, porque $\sqrt{0}=0$: en el ejemplo, $\text{Dom}=[4,\infty)$ con corchete.`,
    note: String.raw`Las raíces de índice <em>impar</em>, como $\sqrt[3]{x}$, no restringen nada: aceptan negativos.`,
  },
  {
    id: 'denominador',
    kind: 'theory',
    title: 'Denominador distinto de cero',
    formula: String.raw`\frac{N(x)}{D(x)} \;\Longrightarrow\; D(x) \neq 0`,
    text: String.raw`Repartir una pizza entre $3$ personas da un tercio cada una. ¿Y entre <strong>cero personas</strong>? La pregunta ni siquiera existe: no hay reparto posible. En $\dfrac{2x+1}{x-3}$, el valor $x=3$ es el «cero personas»: el único que rompe la cuenta y sale del dominio.`,
    formal: String.raw`La división entre cero no está definida en $\mathbb{R}$: no es «infinito», es una operación inexistente. La condición $D(x)\neq 0$ excluye exactamente los valores que anulan el denominador; en el ejemplo, $\text{Dom}=\mathbb{R}-\{3\}$, y ese valor deja un agujero en la gráfica.`,
    note: String.raw`Los demás valores sí se permiten: el resto del dominio es todo $\mathbb{R}$.`,
  },
  {
    id: 'combinar',
    kind: 'theory',
    title: 'Varias restricciones: se intersectan',
    formula: String.raw`\text{Dom}(f) = D_1 \cap D_2 \cap \cdots`,
    text: String.raw`En el aeropuerto hay que pasar <strong>todos</strong> los filtros de seguridad, no basta con uno. Una función con dos operaciones peligrosas es igual: la entrada debe superar los dos controles. En $h(x)=\dfrac{\sqrt{x-1}}{x-4}$ se pide $x-1\ge 0$ <em>y además</em> $x-4\neq 0$, lo que deja $[1,4)\cup(4,\infty)$.`,
    formal: String.raw`Cada restricción define su propio conjunto válido ($D_1$, $D_2$…) y la función sólo existe donde <strong>todos</strong> se cumplen a la vez: es una conjunción lógica («y», no «o»). Por eso el dominio es la intersección $D_1\cap D_2$, y el resultado puede quedar partido en varios trozos.`,
    note: 'Orden recomendado: escribir cada condición, graficarlas en la recta y quedarte con lo que se solapa.',
  },
  {
    id: 'rango-vertice',
    kind: 'theory',
    title: 'Rango por el vértice',
    formula: String.raw`a(x-h)^{2}+k \;\Longrightarrow\; \text{Rango}=[k,\infty) \text{ si } a>0`,
    text: String.raw`Una pelota lanzada al aire tiene una altura mínima y una máxima: el <strong>vértice</strong>. En $a(x-h)^{2}+k$, el trozo $(x-h)^{2}$ es un <em>piso de altura cero</em>: nunca baja de $0$. Así que la salida más pequeña posible es $k$, y el rango empieza ahí. Con $|x-h|+k$ pasa igual.`,
    formal: String.raw`Si $a>0$ la parábola abre hacia arriba y $k$ es su punto más bajo: Rango $=[k,\infty)$. Si $a<0$ abre hacia abajo y $k$ es el más alto: Rango $=(-\infty,k]$. El signo de $a$ decide la dirección; $k$ fija el extremo; $h$ desplaza en horizontal y no afecta al rango.`,
    note: 'El valor $h$ (posición horizontal del vértice) afecta al dominio, no al rango.',
  },
  {
    id: 'rango-desplazamiento',
    kind: 'theory',
    title: 'Rango por desplazamiento vertical',
    formula: String.raw`\sqrt{x}+k \Longrightarrow [k,\infty) \qquad \frac{1}{x}+k \Longrightarrow \mathbb{R}-\{k\}`,
    text: String.raw`Sumar $k$ <strong>fuera</strong> de la raíz o de la fracción es subirle el sueldo a todo el equipo por igual: la gráfica entera sube $k$ pisas, y con ella el rango. $\sqrt{x}$ vivía en $[0,\infty)$; con $+2$ vive en $[2,\infty)$. Y $\dfrac{1}{x}+3$ es <em>la persona que nunca enferma</em>: como $\dfrac{1}{x}$ jamás vale $0$, al sumarle $3$ jamás vale $3$.`,
    formal: String.raw`Sólo el desplazamiento vertical cambia el rango: $[0,\infty)\to[k,\infty)$. El horizontal desplaza el dominio, no el rango. Y un factor que multiplica sí lo cambia: $-2\sqrt{x}$ invierte la dirección y convierte $[0,\infty)$ en $(-\infty,0]$.`,
    note: 'Checklist final: 1) tipo de función, 2) restricciones de dominio, 3) forma del rango, 4) desplazamientos.',
  },
];
