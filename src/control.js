export class Control {
    constructor(character) {
      if (!character) {
        throw new Error("A valid character object must be provided.");
      }
      this.character = character;
    }
  
    hookCharacter(defaultAnimationName, isVisibleHitbox = false) {
      if (!this.character.controls) {
        console.warn("No controls defined for this character.");
        return;
      }
  
      // Inicializar configuración del personaje
      this.character.animationName = defaultAnimationName;
      this.character.isVisibleHitbox = isVisibleHitbox;
      this.character.universe.requestSpriteAnimation(this.character);
  
      const SPRITE_DISPLAY_ATTRIBUTE = "isDisplayed";
  
      for (const controlKey in this.character.controls) {
        const config = this.character.controls[controlKey];
        const {
          startAnimation,
          startEvent,
          startLoop,
          endAnimation,
          endEvent,
          endLoop,
          displacementPhysics,
          addListenerToObject,
        } = config;
  
        const listenerTarget = addListenerToObject || window;
  
        listenerTarget.addEventListener(startEvent, (e) => {
          const isSpriteVisible =
            this.character.spriteSheet.getAttribute(SPRITE_DISPLAY_ATTRIBUTE) ===
            "true";
  
          if (!isSpriteVisible && (e.key === controlKey || this.isButton(controlKey))) {
            this.startAnimation(startAnimation, startLoop, displacementPhysics);
          }
        });
  
        listenerTarget.addEventListener(endEvent, (e) => {
          const isSpriteVisible =
            this.character.spriteSheet.getAttribute(SPRITE_DISPLAY_ATTRIBUTE) ===
            "true";
  
          if (isSpriteVisible && (e.key === controlKey || this.isButton(controlKey))) {
            this.endAnimation(endAnimation, endLoop);
          }
        });
      }
    }
  
    isButton(controlKey) {
      return controlKey.startsWith("btn");
    }
  
    startAnimation(animationName, isLoop, displacementPhysics) {
      this.character.frame = 0;
      this.character.animationName = animationName;
      this.character.isLoopAnimation = isLoop;
      this.character.spriteSheet.setAttribute("isDisplayed", "true");
      this.character.speedX = displacementPhysics.speedX || 0;
      this.character.speedY = displacementPhysics.speedY || 0;
      this.character.acceleration = this.character.universe.physics.gravity;
    }
  
    endAnimation(animationName, isLoop) {
      this.character.frame = 0;
      this.character.animationName = animationName;
      this.character.isLoopAnimation = isLoop;
      this.character.spriteSheet.setAttribute("isDisplayed", "false");
      this.character.speedX = 0;
      this.character.speedY = 0;
    }
  }
  