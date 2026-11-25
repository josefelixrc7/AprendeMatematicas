/**
 * Módulo Funciones · Submódulo «Ejemplos».
 *
 * Aquí cada ejemplo es un GRUPO de hojas consecutivas: una hoja = un solo paso.
 * El motor no conoce los ejemplos, sólo expande grupos, así que añadir un ejemplo
 * nuevo es escribir otro objeto en este array.
 *
 * Convenciones de contenido:
 *  - `formula`   → la expresión matemática completa del paso.
 *  - `change`    → qué cambió respecto al paso anterior (se resalta en la hoja).
 *  - `why`       → desplegable «¿Por qué?» con la justificación.
 *  - Los fragmentos nuevos se marcan dentro del propio LaTeX con \boxed y
 *    \textcolor (comandos nativos de KaTeX, sin necesidad de `trust`).
 */

/** @type {import('../schema.js').SheetGroup[]} */
export const ejemploGroups = [
  {
    id: 'ejemplo-radical',
    statement:
      String.raw`Hallar el dominio y el rango de $f(x)=\sqrt{3x-12}+2$.`,
    sheets: [
      {
        id: 'radical-1',
        kind: 'example',
        title: 'Qué nos piden',
        formula: String.raw`f(x)=\sqrt{3x-12}+2`,
        change: 'Punto de partida: una raíz cuadrada y un $+2$ que está fuera de ella.',
        text: 'Buscamos dos conjuntos: las $x$ que se pueden usar (dominio) y los valores que salen (rango). La función tiene dos ingredientes que se comportan de forma distinta: la raíz limita la entrada y el $+2$ mueve la salida.',
        why: 'Conviene separar el trabajo en dos partes. Primero se resuelve el dominio, porque es puramente algebraico; después el rango, que depende de la forma de la gráfica. Mezclarlos es la causa más común de errores.',
        note: 'Regla de trabajo: dominio primero, rango después.',
      },
      {
        id: 'radical-2',
        kind: 'example',
        title: 'Paso 1 · Mirar dentro de la raíz',
        formula: String.raw`f(x)=\sqrt{\textcolor{#c2410c}{3x-12}}+2`,
        change: 'El radicando es $3x-12$: es lo único que puede prohibir valores de $x$.',
        text: 'La raíz es de índice par (cuadrada), así que todo lo que esté dentro debe ser mayor o igual que cero. El $+2$ está fuera y no afecta al dominio.',
        why: 'Si el radicando fuese negativo, la raíz no tendría resultado real. Por eso los valores de $x$ que hacen $3x-12<0$ quedan fuera del dominio, y los que lo dejan en cero o más, dentro.',
      },
      {
        id: 'radical-3',
        kind: 'example',
        title: 'Paso 2 · Plantear la condición',
        formula: String.raw`3x-12 \;\ge\; 0`,
        change: String.raw`La regla «radicando $\ge 0$» se convierte en una desigualdad que hay que resolver.`,
        text: String.raw`Este es el paso donde la teoría pasa a ser cuentas: copiamos el radicando y le imponemos la condición. El símbolo es $\ge$, no $>$, porque la raíz de cero sí existe.`,
        why: String.raw`Ese $\ge$ es el que luego decide si el intervalo se escribe con corchete o con paréntesis. Si lo cambias a $>$, pierdes el valor $x=4$, donde $f(4)=2$ sí se puede calcular.`,
      },
      {
        id: 'radical-4',
        kind: 'example',
        title: 'Paso 3 · Despejar la x',
        formula: String.raw`3x \ge 12 \;\;\Longrightarrow\;\; \boxed{x \ge 4}`,
        change: 'Se suma $12$ en ambos lados y se divide entre $3$: el sentido de la desigualdad no cambia.',
        text: String.raw`Resolvemos la desigualdad como si fuese una ecuación, con un cuidado extra: al multiplicar o dividir por un número negativo, el símbolo se invierte. Aquí el $3$ es positivo, así que $\ge$ se mantiene.`,
        why: String.raw`Dividir entre un positivo conserva el orden: si $3x$ es mayor o igual que $12$, entonces $x$ es mayor o igual que $4$. Si el coeficiente hubiera sido $-3$, el resultado sería $x \le -4$.`,
      },
      {
        id: 'radical-5',
        kind: 'example',
        title: 'Paso 4 · Escribir el dominio',
        formula: String.raw`\text{Dom}(f)=\textcolor{#c2410c}{\boxed{[\,4,\infty)}}`,
        change: String.raw`La desigualdad $x \ge 4$ se traduce a intervalo con corchete cerrado a la izquierda.`,
        text: String.raw`De $x \ge 4$ sale $[4,\infty)$: el $4$ entra porque la desigualdad incluye la igualdad, y el infinito siempre lleva paréntesis. Comprobación rápida: $f(4)=\sqrt{0}+2=2$ existe; $f(0)=\sqrt{-12}+2$ no existe.`,
        why: 'Una comprobación con dos valores (uno permitido y otro prohibido) detecta casi todos los errores de signo antes de continuar con el rango.',
        note: 'Dominio terminado. Ahora sí, la segunda mitad del problema: el rango.',
      },
      {
        id: 'radical-6',
        kind: 'example',
        title: 'Paso 5 · El valor más pequeño de la raíz',
        formula: String.raw`\sqrt{3x-12}\;\ge\;\textcolor{#c2410c}{0}`,
        change: 'Una raíz cuadrada nunca devuelve un resultado negativo: su mínimo es $0$.',
        text: 'La raíz vale $0$ cuando el radicando es $0$, es decir en $x=4$. Para cualquier otra $x$ del dominio da un número positivo, y crece sin techo.',
        why: String.raw`El rango de $\sqrt{\,\cdot\,}$ es $[0,\infty)$: por eso el de nuestra función será ese mismo intervalo, sólo desplazado por el $+2$.`,
      },
      {
        id: 'radical-7',
        kind: 'example',
        title: 'Paso 6 · El $+2$ desplaza el resultado',
        formula: String.raw`\sqrt{3x-12}\;\ge\;0 \;\;\Longrightarrow\;\; \sqrt{3x-12}\,\textcolor{#c2410c}{+2}\;\ge\;\boxed{2}`,
        change: 'Sumar $2$ fuera de la raíz sube toda la gráfica dos unidades: el mínimo pasa de $0$ a $2$.',
        text: 'Sumar una constante a la función entera desplaza los resultados, no las entradas. Cada salida anterior aumenta en $2$, así que el extremo inferior también.',
        why: 'El desplazamiento vertical ($+2$ fuera) cambia el rango; el horizontal (dentro, junto a la $x$) cambiaría el dominio. Distinguir «dentro» de «fuera» resuelve la mitad de los ejercicios de transformaciones.',
      },
      {
        id: 'radical-8',
        kind: 'example',
        title: 'Paso 7 · Rango y verificación',
        formula: String.raw`\text{Dom}(f)=[\,4,\infty) \qquad \text{Rango}(f)=[\,2,\infty)`,
        change: 'Se juntan los dos resultados: dominio desde $4$ y rango desde $2$.',
        text: String.raw`El mínimo de la función está en el punto $(4,2)$ y desde ahí crece indefinidamente. Verificación: $f(4)=2$ (mínimo, entra en el rango) y $f(8)=\sqrt{12}+2\approx 5{,}46$ (valor alcanzado).`,
        why: String.raw`Comprobar que el mínimo se alcanza justifica el corchete. Si el punto no perteneciera al dominio, el rango empezaría con paréntesis: $(2,\infty)$.`,
        note: 'Resumen del ejemplo: la raíz fijó el dominio y el $+2$ fijó el rango.',
      },
    ],
  },

  {
    id: 'ejemplo-racional',
    statement:
      String.raw`Hallar el dominio y el rango de $g(x)=\dfrac{2x+1}{x-3}$.`,
    sheets: [
      {
        id: 'racional-1',
        kind: 'example',
        title: 'Qué nos piden',
        formula: String.raw`g(x)=\frac{2x+1}{x-3}`,
        change: 'Punto de partida: ahora la $x$ aparece en el denominador.',
        text: 'Es una función racional. El numerador puede valer cualquier cosa, pero el denominador no puede anularse. Eso marcará el dominio; para el rango usaremos un truco algebraico.',
        why: String.raw`En una función racional el dominio casi siempre es «todo $\mathbb{R}$ menos uno o varios puntos», y el rango suele ser también «todo $\mathbb{R}$ menos un valor». Reconocer ese patrón ahorra tiempo.`,
      },
      {
        id: 'racional-2',
        kind: 'example',
        title: 'Paso 1 · Señalar el denominador',
        formula: String.raw`g(x)=\frac{2x+1}{\textcolor{#c2410c}{x-3}}`,
        change: 'Sólo la parte de abajo impone la restricción de dominio.',
        text: 'El numerador $2x+1$ no tiene raíces ni fracciones, así que no prohíbe nada. La única condición viene de $x-3$.',
        why: 'Regla práctica: en una fracción, mira primero el denominador completo; el numerador sólo importaría si tuviese su propia raíz o su propia fracción.',
      },
      {
        id: 'racional-3',
        kind: 'example',
        title: 'Paso 2 · La condición de existencia',
        formula: String.raw`x-3 \;\neq\; 0`,
        change: 'Denominador distinto de cero: aparece una igualdad que se excluye.',
        text: String.raw`Aquí no hay desigualdad con $\ge$ como en la raíz, sino una igualdad prohibida. El conjunto de soluciones es «todos los reales menos el que anula»: $x \neq 3$.`,
        why: 'Dividir entre cero no está definido, ni siquiera como límite. Por eso $x=3$ se excluye por completo y en los intervalos se escribe con paréntesis.',
      },
      {
        id: 'racional-4',
        kind: 'example',
        title: 'Paso 3 · Escribir el dominio',
        formula: String.raw`\text{Dom}(g)=\textcolor{#c2410c}{\boxed{(-\infty,3)\cup(3,\infty)}}`,
        change: String.raw`El punto $x=3$ parte la recta en dos trozos que se unen con $\cup$.`,
        text: String.raw`Como $3$ queda fuera, la recta se rompe: a la izquierda $(3$ no entra$)$ y a la derecha tampoco. Es la forma habitual de escribir $\mathbb{R}-\{3\}$.`,
        why: String.raw`Podrías escribir $\mathbb{R}-\{3\}$ y sería correcto, pero en este curso usamos intervalos porque describen con precisión qué extremos entran y cuáles no.`,
        note: 'Dominio terminado; el rango de una racional no se ve a simple vista, así que vamos a despejar la $x$.',
      },
      {
        id: 'racional-5',
        kind: 'example',
        title: 'Paso 4 · Cambiar el punto de vista',
        formula: String.raw`y=\frac{2x+1}{x-3} \;\;\Longrightarrow\;\; y(x-3)=2x+1`,
        change: 'Escribimos la función como $y$ y multiplicamos en cruz para sacar la $x$.',
        text: 'La idea es invertir la pregunta: en lugar de «dame la salida para esta entrada», preguntamos «¿qué entrada produciría esta salida?». Si alguna $y$ no tiene $x$ posible, esa $y$ queda fuera del rango.',
        why: 'Este método sirve para cualquier función donde puedas despejar $x$ en términos de $y$: racionales, radicales sencillas, lineales. Es el puente entre el álgebra y el rango.',
      },
      {
        id: 'racional-6',
        kind: 'example',
        title: 'Paso 5 · Despejar la x',
        formula: String.raw`yx-3y=2x+1 \;\Longrightarrow\; x(y-2)=\textcolor{#c2410c}{3y+1}`,
        change: 'Agrupamos las $x$ a un lado y factorizamos: aparece el factor $(y-2)$.',
        text: String.raw`Pasamos $2x$ al lado izquierdo y $-3y$ al derecho: $yx-2x=3y+1$. Sacando factor común $x$ queda $x(y-2)=3y+1$, y por tanto $x=\dfrac{3y+1}{y-2}$.`,
        why: 'El factor $(y-2)$ es la clave de todo el ejercicio: si se anula, no podremos dividir y esa $y$ no tendrá preimagen. Ese valor será justamente el que falte en el rango.',
      },
      {
        id: 'racional-7',
        kind: 'example',
        title: 'Paso 6 · La y prohibida',
        formula: String.raw`y-2 \neq 0 \;\;\Longrightarrow\;\; \textcolor{#c2410c}{y \neq 2}`,
        change: 'Aplicamos la misma regla de antes, ahora sobre la variable $y$.',
        text: String.raw`La expresión $x=\dfrac{3y+1}{y-2}$ sólo falla si $y=2$. Para cualquier otra $y$ existe una $x$ válida, así que sólo el $2$ se queda fuera del rango.`,
        why: 'Ojo: $y=2$ es una asíntota horizontal. La gráfica se acerca a $2$ tanto como quieras pero nunca lo toca, y eso es exactamente lo que significa que $2$ no esté en el rango.',
      },
      {
        id: 'racional-8',
        kind: 'example',
        title: 'Paso 7 · Rango y verificación',
        formula: String.raw`\text{Dom}(g)=(-\infty,3)\cup(3,\infty) \qquad \text{Rango}(g)=\textcolor{#c2410c}{\boxed{(-\infty,2)\cup(2,\infty)}}`,
        change: 'Se juntan los dos resultados: falta el $3$ en la entrada y falta el $2$ en la salida.',
        text: String.raw`Verificación: $g(0)=-\tfrac{1}{3}$ (menor que $2$) y $g(4)=9$ (mayor que $2$). El valor $y=2$ no aparece nunca, y $x=3$ nunca se usa. Cada hueco tiene su motivo.`,
        why: 'Comprobar con dos entradas, una a cada lado del punto prohibido, confirma que el rango cubre las dos ramas. Si ambas salidas quedaran del mismo lado, habría que revisar las cuentas.',
        note: 'Resumen del ejemplo: el denominador decidió el dominio y el despeje de $x$ decidió el rango.',
      },
    ],
  },

  {
    id: 'ejemplo-absoluto',
    statement: 'Hallar el dominio y el rango de $h(x)=|x-1|+3$.',
    sheets: [
      {
        id: 'absoluto-1',
        kind: 'example',
        title: 'Qué nos piden',
        formula: String.raw`h(x)=|x-1|+3`,
        change: 'Punto de partida: un valor absoluto y un $+3$ fuera de él.',
        text: 'El valor absoluto devuelve siempre un número mayor o igual que cero. Por eso su gráfica tiene forma de $V$, con un vértice que será el punto clave del rango.',
        why: 'El valor absoluto se puede leer como «distancia al cero»: $|x-1|$ es la distancia entre $x$ y $1$. Una distancia nunca es negativa, y eso fija el mínimo.',
      },
      {
        id: 'absoluto-2',
        kind: 'example',
        title: 'Paso 1 · Dominio: ninguna restricción',
        formula: String.raw`\text{Dom}(h)=\textcolor{#c2410c}{\boxed{\mathbb{R}}}`,
        change: 'No hay raíces de índice par ni denominadores: nada que prohibir.',
        text: String.raw`Podemos restar $1$, tomar el valor absoluto y sumar $3$ para cualquier número real. Así que el dominio es todo $\mathbb{R}$, sin huecos ni recortes.`,
        why: 'El valor absoluto no rompe nunca: acepta negativos, positivos y el cero. Es una de las familias más permisivas con la entrada.',
      },
      {
        id: 'absoluto-3',
        kind: 'example',
        title: 'Paso 2 · El mínimo del valor absoluto',
        formula: String.raw`|x-1|\;\ge\;0 \quad \text{y vale } 0 \text{ cuando } \boxed{x=1}`,
        change: 'El valor absoluto llega a cero exactamente en $x=1$: ese es el vértice.',
        text: 'En $x=1$ la distancia a $1$ es $0$, el mínimo posible. A ambos lados crece: $h(0)=1+3=4$ y $h(2)=1+3=4$, simétricos alrededor del vértice.',
        why: 'La simetría es la firma visual del valor absoluto: dos ramas con la misma pendiente y signos opuestos. Saber dónde está el vértice es saber dónde está el extremo del rango.',
      },
      {
        id: 'absoluto-4',
        kind: 'example',
        title: 'Paso 3 · El $+3$ sube el vértice',
        formula: String.raw`|x-1|\ge 0 \;\;\Longrightarrow\;\; |x-1|\textcolor{#c2410c}{+3}\;\ge\;\boxed{3}`,
        change: 'Sumar $3$ desplaza el mínimo de $0$ a $3$; no cambia la forma de la $V$.',
        text: 'El vértice se mueve del punto $(1,0)$ al punto $(1,3)$. Desde ahí, la función sube hacia ambos lados sin límite superior.',
        why: 'El término fuera del valor absoluto desplaza verticalmente y afecta al rango; el término dentro ($x-1$) desplaza horizontalmente y afecta al vértice, pero no al conjunto de salidas.',
      },
      {
        id: 'absoluto-5',
        kind: 'example',
        title: 'Paso 4 · Rango y verificación',
        formula: String.raw`\text{Dom}(h)=\mathbb{R} \qquad \text{Rango}(h)=\textcolor{#c2410c}{\boxed{[\,3,\infty)}}`,
        change: 'El mínimo $3$ se alcanza en $x=1$, así que el intervalo cierra por la izquierda.',
        text: 'Verificación: $h(1)=3$ (mínimo, por eso corchete) y $h(6)=8$ (valor alcanzado). Todos los valores desde $3$ hacia arriba aparecen en la gráfica.',
        why: String.raw`Si la función hubiera sido $h(x)=-|x-1|+3$, la $V$ se invertiría y el rango sería $(-\infty,3]$. El signo delante del valor absoluto decide la dirección.`,
        note: 'Con esto ya tienes tres ejemplos completos: raíz, fracción y valor absoluto.',
      },
    ],
  },
];
