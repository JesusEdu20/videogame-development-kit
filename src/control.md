# Clase `Control`

La clase `Control` es responsable de gestionar la interacción entre controles (teclas o botones) y las acciones de un personaje (`Character`). Permite asignar eventos de inicio y fin a controles específicos, actualizando el estado del personaje y sus animaciones.

---

## **Índice**
- [Instalación](#instalación)
- [Uso](#uso)
- [Métodos](#métodos)
- [Ejemplo](#ejemplo)
- [Propiedades](#propiedades)
- [Notas adicionales](#notas-adicionales)

---

## **Instalación**

Asegúrate de que esta clase está disponible como parte de tu proyecto. No necesita dependencias adicionales.

---

## **Uso**

Para usar esta clase, debes tener un objeto `Character` correctamente configurado. Este objeto debe incluir controles y configuraciones necesarias para las animaciones.

```javascript
import { Control } from './Control';

const character = {
  animationName: "",
  isVisibleHitbox: false,
  spriteSheet: document.createElement("div"), // Elemento DOM del sprite
  universe: {
    requestSpriteAnimation: (character) => console.log("Animation requested"),
    physics: { gravity: 9.8 },
  },
  controls: {
    ArrowRight: {
      startAnimation: "runRight",
      startEvent: "keydown",
      startLoop: true,
      endAnimation: "idle",
      endEvent: "keyup",
      endLoop: true,
      displacementPhysics: { speedX: 5, speedY: 0 },
    },
  },
};

const controlManager = new Control(character);
controlManager.hookCharacter("idle", true);
