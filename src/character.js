/**
 * Represents a character object used in the game.
 */
export class Character {
    /**
     * Creates a character object with specified attributes.
     * @param {Object} options - Object containing character attributes.
     * @param {number} [options.speedX=0] - Horizontal speed of the character.
     * @param {number} [options.speedY=0] - Vertical speed of the character.
     * @param {object} options.spriteSheet - Sprite sheet of the character.
     * @param {number} options.frameWidth - Width of the character frame.
     * @param {number} options.frameHeight - Height of the character frame.
     * @param {number} [options.staggerFrames=5] - Time to display each frame of the animation.
     * @param {string} options.animationName - Name of the animation.
     * @param {boolean} [options.isLoopAnimation=false] - Indicates if the animation should loop.
     * @param {string} options.cancelEvent - Event to cancel the animation.
     * @param {boolean} options.isAutoOffAnimation - Indicates if animation should turn off automatically.
     * @param {object} options.frameCoordinates - Coordinates of each frame in the sprite sheet.
     * @param {object} [options.controls={}] - Control configuration for the animation.
     * @param {object} options.universe - Universe object for the character.
     * @param {number} [options.positionX=0] - X-coordinate position of the character.
     * @param {number} [options.positionY=0] - Y-coordinate position of the character.
     * @param {number} options.width - Width of the character.
     * @param {number} options.height - Height of the character.
     * @param {string} options.type - Type of the character.
     */
    constructor({
        speedX = 0,
        speedY = 0,
        spriteSheet,
        frameWidth,
        frameHeight,
        staggerFrames = 5,
        animationName,
        cancelEvent,
        isAutoOffAnimation,
        frameCoordinates,
        controls = {},
        universe,
        positionX = 0,
        positionY = 0,
        width,
        height,
        type,
    }) {
        this.spriteId = undefined;
        this.speedX = speedX;
        this.speedY = speedY;
        this.nickName = "element";
        this.isShadow = false;
        this.isVisibleShadow = false;
        this.acceleration = 0;
        this.gameFrameCounter = 0;
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.staggerFrames = staggerFrames;
        this.animationName = animationName;
        this.isLoopAnimation = false;
        this.cancelEvent = cancelEvent;
        this.isAutoOffAnimation = isAutoOffAnimation;
        this.frameCoordinates = frameCoordinates;
        this.universe = universe;
        this.frame = 0;
        this.hitBox = undefined;
        this.isVisibleHitbox = false;
        this.width = width;
        this.height = height;
        this.position = { x: positionX, y: positionY };
        this.type = type;
        this.collisionActionStack = [];
        this.behaviorStack = [];
        this.controls = controls;
    }

    /**
     * Configures the hitbox of the character.
     * @param {Object} options - Hitbox configuration options.
     * @param {number} options.width - Width of the hitbox.
     * @param {number} options.height - Height of the hitbox.
     * @param {number} [options.border=1] - Border size of the hitbox.
     * @param {string} [options.color="black"] - Color of the hitbox.
     * @param {number} options.positionX - X-coordinate position of the hitbox.
     * @param {number} options.positionY - Y-coordinate position of the hitbox.
     */
    configHitbox({ width, height, border = 1, color = "black", positionX, positionY }) {
        this.hitBox = {
            x: 0,
            y: 0,
            positionX,
            positionY,
            width,
            height,
            border,
            color,
        };
    }

    /**
     * Reads the hitbox position based on the sprite's position.
     * @param {number} spritePositionX - X-coordinate position of the sprite.
     * @param {number} spritePositionY - Y-coordinate position of the sprite.
     */
    readHitbox(spritePositionX, spritePositionY) {
        if (!this.hitBox) return;
        this.hitBox.x = spritePositionX + this.hitBox.positionX;
        this.hitBox.y = spritePositionY + this.hitBox.positionY;
    }

    /**
     * Configures key control mappings for the character.
     * @param {string} key - Key to bind control.
     * @param {Object} controlOptions - Control configuration object.
     */
    setupKeyControl(key, controlOptions) {
        const { startAnimation, startEvent, startLoop, endAnimation, endEvent, endLoop, displacementPhysics } =
            controlOptions;

        if (!key || !startAnimation || !endAnimation || !startEvent || !endEvent) {
            console.error("Invalid control configuration.");
            return;
        }

        this.controls[key] = {
            startAnimation,
            startEvent,
            startLoop: !!startLoop,
            endAnimation,
            endEvent,
            endLoop: !!endLoop,
            displacementPhysics: displacementPhysics || { speedX: 0, speedY: 0 },
        };
    }
}
