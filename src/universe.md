```markdown
# Documentación de la Clase `Universe`

## Descripción

La clase `Universe` es una implementación que permite gestionar un entorno gráfico donde se dibujan, animan y manejan múltiples sprites en un lienzo HTML5 (`<canvas>`). Además, proporciona funcionalidades para sincronizar acciones, aplicar física, manejar colisiones y controlar la interacción entre los elementos del lienzo.

---

## Métodos

### Constructor

```javascript
constructor(canvas)
```

- **Parámetros:**
  - `canvas`: Elemento HTML `<canvas>` donde se renderizan los sprites.
- **Propósito:** Inicializa las propiedades del universo, como el contexto de renderizado, la física, el manejo de animaciones y el almacenamiento de mapas.

---

### `syncWithRenderingCycle(action)`

- **Descripción:** Agrega una acción a la pila de acciones sincronizadas que se ejecutarán en cada ciclo de renderizado.
- **Parámetros:**
  - `action`: Función a ejecutar en el ciclo de renderizado.

---

### `executeSynchronizedActions()`

- **Descripción:** Ejecuta todas las acciones sincronizadas almacenadas en `synchronizedActionExecutionStack`.

---

### `drawSprites()`

- **Descripción:** Renderiza todos los sprites en el lienzo, aplica física y detecta colisiones.
- **Flujo:**
  - Limpia el lienzo.
  - Dibuja los sprites y aplica sus comportamientos.
  - Llama a `requestAnimationFrame` para mantener el ciclo de animación.

---

### `requestSpriteAnimation(request)`

- **Descripción:** Agrega una nueva animación de sprite a la pila.
- **Parámetros:**
  - `request`: Objeto que contiene las propiedades de la animación (posición, hitbox, frames, etc.).

---

### `removeSpriteAnimation(id)`

- **Descripción:** Elimina una animación de la pila usando su `spriteId`.
- **Parámetros:**
  - `id`: Identificador único del sprite.

---

### `detectCollisions()`

- **Descripción:** Detecta colisiones entre los sprites que tienen hitboxes definidas. Ejecuta las acciones correspondientes al detectar una colisión.

---

### `applyPhysics(request)`

- **Descripción:** Aplica física básica (gravedad, velocidad y aceleración) a un sprite.
- **Parámetros:**
  - `request`: Objeto de animación que será afectado por la física.

---

### `setCanvasSize(element, decimalPercentage, menu)`

- **Descripción:** Ajusta el tamaño del lienzo y el menú a un porcentaje del tamaño de la ventana.
- **Parámetros:**
  - `element`: Elemento HTML que se ajustará.
  - `decimalPercentage`: Porcentaje del tamaño de la ventana.
  - `menu`: Menú asociado (opcional).

---

### `activateResponsiveCanvas(decimalPercentage)`

- **Descripción:** Activa el redimensionamiento automático del lienzo según el tamaño de la ventana.
- **Parámetros:**
  - `decimalPercentage`: Porcentaje del tamaño de la ventana para ajustar el lienzo.

---

### `playMap(mapName)`

- **Descripción:** Activa todas las animaciones asociadas a un mapa específico.
- **Parámetros:**
  - `mapName`: Nombre del mapa.

---

### `executeBehaviorStack(request)`

- **Descripción:** Ejecuta todas las acciones del comportamiento asociado a un sprite.
- **Parámetros:**
  - `request`: Objeto que contiene la pila de comportamientos.

---

### `mapFrames(...actions)`

- **Descripción:** Genera las coordenadas de los frames para las animaciones de un sprite.
- **Parámetros:**
  - `actions`: Lista de objetos que describen las dimensiones y frames de las animaciones.
- **Retorno:** Objeto con las coordenadas de cada frame.

---

### `createReel(objectModel)`

- **Descripción:** Crea y maneja un "reel" de sprites basado en un modelo de objeto.
- **Parámetros:**
  - `objectModel`: Modelo base para generar el reel.
- **Retorno:** Objeto con métodos para crear, seleccionar y renderizar frames.

---

## Propiedades

### `stackAnimations`

- **Tipo:** Array
- **Descripción:** Contiene todas las animaciones activas.

### `canvas`

- **Tipo:** HTMLCanvasElement
- **Descripción:** Elemento HTML donde se renderizan los sprites.

### `menu`

- **Tipo:** HTMLElement (opcional)
- **Descripción:** Elemento asociado al menú.

### `ctx`

- **Tipo:** CanvasRenderingContext2D
- **Descripción:** Contexto de renderizado del lienzo.

### `physics`

- **Tipo:** Object
- **Descripción:** Propiedades físicas del universo (e.g., gravedad).

### `maps`

- **Tipo:** Object
- **Descripción:** Almacena los mapas disponibles para su uso.

### `synchronizedActionExecutionStack`

- **Tipo:** Array
- **Descripción:** Almacena acciones sincronizadas para ejecutarse en el ciclo de renderizado.

### `stackCopiedModelObjects`

- **Tipo:** Object
- **Descripción:** Almacena copias de modelos de objetos.

---

## Ejemplo de Uso

```javascript
const canvas = document.getElementById("gameCanvas");
const universe = new Universe(canvas);

// Crear una animación de sprite
const spriteRequest = {
    position: { x: 50, y: 50 },
    spriteSheet: imageElement,
    frameCoordinates: universe.mapFrames(...framesData),
    animationName: "run",
    frameWidth: 64,
    frameHeight: 64,
    staggerFrames: 5,
    isLoopAnimation: true,
};
universe.requestSpriteAnimation(spriteRequest);

// Iniciar el renderizado
universe.drawSprites();
```

---

## Notas

- **Colisiones:** Los sprites deben tener una propiedad `hitBox` definida para detectar colisiones.
- **Animaciones sincronizadas:** Utiliza `syncWithRenderingCycle` para ejecutar acciones específicas en sincronía con el ciclo de renderizado.
- **Redimensionamiento del lienzo:** Activa `activateResponsiveCanvas` para una experiencia optimizada en diferentes dispositivos.

```