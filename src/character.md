# Clase `Character`

## Descripción
La clase `Character` representa un personaje en un juego, proporcionando atributos y métodos para configurar su comportamiento, animaciones, y controles.

---

## Constructor

### **Parámetros**
- **`speedX`** *(number, opcional)*: Velocidad horizontal del personaje. *(Por defecto: 0)*  
- **`speedY`** *(number, opcional)*: Velocidad vertical del personaje. *(Por defecto: 0)*  
- **`spriteSheet`** *(object, requerido)*: Sprite sheet del personaje.  
- **`frameWidth`** *(number, requerido)*: Ancho del frame del personaje.  
- **`frameHeight`** *(number, requerido)*: Altura del frame del personaje.  
- **`staggerFrames`** *(number, opcional)*: Tiempo de visualización de cada frame. *(Por defecto: 5)*  
- **`animationName`** *(string, requerido)*: Nombre de la animación.  
- **`cancelEvent`** *(string, requerido)*: Evento que cancela la animación.  
- **`isAutoOffAnimation`** *(boolean, requerido)*: Si la animación debe apagarse automáticamente.  
- **`frameCoordinates`** *(object, requerido)*: Coordenadas de cada frame en el sprite sheet.  
- **`controls`** *(object, opcional)*: Configuración de controles del personaje.  
- **`universe`** *(object, requerido)*: Objeto de universo relacionado con el personaje.  
- **`positionX`** *(number, opcional)*: Posición X inicial del personaje. *(Por defecto: 0)*  
- **`positionY`** *(number, opcional)*: Posición Y inicial del personaje. *(Por defecto: 0)*  
- **`width`** *(number, requerido)*: Ancho del personaje.  
- **`height`** *(number, requerido)*: Altura del personaje.  
- **`type`** *(string, requerido)*: Tipo del personaje.  

---

## Métodos

### **`configHitbox(options)`**
Configura la hitbox del personaje.

#### **Parámetros**
- **`options.width`** *(number, requerido)*: Ancho de la hitbox.  
- **`options.height`** *(number, requerido)*: Altura de la hitbox.  
- **`options.border`** *(number, opcional)*: Borde de la hitbox. *(Por defecto: 1)*  
- **`options.color`** *(string, opcional)*: Color de la hitbox. *(Por defecto: "black")*  
- **`options.positionX`** *(number, requerido)*: Posición X de la hitbox.  
- **`options.positionY`** *(number, requerido)*: Posición Y de la hitbox.  

---

### **`readHitbox(spritePositionX, spritePositionY)`**
Lee la posición de la hitbox con base en la posición del sprite.

#### **Parámetros**
- **`spritePositionX`** *(number, requerido)*: Posición X del sprite.  
- **`spritePositionY`** *(number, requerido)*: Posición Y del sprite.  

---

### **`setupKeyControl(key, controlOptions)`**
Configura los controles del personaje.

#### **Parámetros**
- **`key`** *(string, requerido)*: Tecla que activa el control.  
- **`controlOptions`** *(object, requerido)*: Opciones de configuración para la tecla.  

#### **Opciones de `controlOptions`**
- **`startAnimation`** *(string, requerido)*: Animación inicial.  
- **`startEvent`** *(string, requerido)*: Evento que inicia la animación.  
- **`startLoop`** *(boolean, opcional)*: Indica si la animación inicial debe repetirse.  
- **`endAnimation`** *(string, requerido)*: Animación final.  
- **`endEvent`** *(string, requerido)*: Evento que termina la animación.  
- **`endLoop`** *(boolean, opcional)*: Indica si la animación final debe repetirse.  
- **`displacementPhysics`** *(object, opcional)*: Configuración de física de desplazamiento. *(Por defecto: `{speedX: 0, speedY: 0}`)*  

--- 

## Ejemplo de Uso

```javascript
const character = new Character({
    speedX: 5,
    speedY: 0,
    spriteSheet: mySpriteSheet,
    frameWidth: 50,
    frameHeight: 100,
    staggerFrames: 3,
    animationName: "run",
    cancelEvent: "stop",
    isAutoOffAnimation: true,
    frameCoordinates: { x: 0, y: 0 },
    universe: gameUniverse,
    positionX: 10,
    positionY: 20,
    width: 50,
    height: 100,
    type: "hero",
});

character.configHitbox({
    width: 40,
    height: 80,
    positionX: 5,
    positionY: 10,
});
