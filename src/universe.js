import { Character } from "./character.js";

export class Universe {
    constructor(canvas) {
        this.stackAnimations = [];
        this.canvas = canvas;
        this.menu = null;
        this.ctx = this.canvas.getContext("2d");
        this.physics = { gravity: 1.0000002 };
        this.maps = {};
        this.synchronizedActionExecutionStack = [];
        this.stackCopiedModelObjects = {};
    }

    syncWithRenderingCycle = (action) => {
        this.synchronizedActionExecutionStack.push(action);
    };

    executeSynchronizedActions = () => {
        this.synchronizedActionExecutionStack.forEach((action) => action());
    };

    drawSprites = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.stackAnimations.forEach((request) => {
            const {
                animationName,
                staggerFrames,
                spriteSheet,
                frameCoordinates,
                frameWidth,
                frameHeight,
                position,
                isLoopAnimation,
                isVisibleHitbox,
                isVisibleShadow,
                hitBox,
                speedX,
                speedY,
                isShadow,
            } = request;

            this.executeSynchronizedActions();
            this.executeBehaviorStack(request);
            this.applyPhysics(request);

            const numberOfFrames = frameCoordinates[animationName]?.length || 0;

            if (isLoopAnimation || request.frame < numberOfFrames - 1) {
                request.frame = Math.floor(request.gameFrameCounter / staggerFrames) % numberOfFrames;
            }

            if (hitBox) {
                request.readHitbox(position.x, position.y) // Esta función actualiza la posición de la hit-box

                if(isVisibleHitbox){
                    this.ctx.strokeStyle = hitBox.color;
                    this.ctx.lineWidth = hitBox.border;
                    this.ctx.strokeRect(hitBox.x, hitBox.y, hitBox.width, hitBox.height);
                }
            }

            if (!isShadow) {
                this.ctx.drawImage(
                    spriteSheet,
                    frameCoordinates[animationName][request.frame].codX,
                    frameCoordinates[animationName][request.frame].codY,
                    frameWidth,
                    frameHeight,
                    position.x,
                    position.y,
                    request.width,
                    request.height
                );
            } else if (isVisibleShadow) {
                this.ctx.strokeRect(position.x, position.y, request.width, request.height);
            }

            request.gameFrameCounter++;
            
        });

        this.detectCollisions();
        
        requestAnimationFrame(this.drawSprites);
    };

    requestSpriteAnimation = (request) => {
        request.spriteId = `${this.stackAnimations.length}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        this.stackAnimations.push(request);
    };

    removeSpriteAnimation = (id) => {
        const index = this.stackAnimations.findIndex((request) => request.spriteId === id);
        if (index !== -1) {
            this.stackAnimations.splice(index, 1);
        }
    };

    detectCollisions = () => {
        for (let i = 0; i < this.stackAnimations.length - 1; i++) {
            const spriteA = this.stackAnimations[i];
            if (!spriteA.hitBox) continue;
           
            for (let j = i + 1; j < this.stackAnimations.length; j++) {
                const spriteB = this.stackAnimations[j];
                if (!spriteB.hitBox || spriteB.type === "map") continue;
               
                const hitBoxA = spriteA.hitBox;
                const hitBoxB = spriteB.hitBox;

                const isCollision =
                    hitBoxA.x < hitBoxB.x + hitBoxB.width &&
                    hitBoxA.x + hitBoxA.width > hitBoxB.x &&
                    hitBoxA.y < hitBoxB.y + hitBoxB.height &&
                    hitBoxA.y + hitBoxA.height > hitBoxB.y;

                if (isCollision) {
                    console.log(true)
                    spriteA.collisionActionStack.forEach((action) => action(spriteB));
                    spriteB.collisionActionStack.forEach((action) => action(spriteA));
                }
            }
        }
    };

    applyPhysics = (request) => {
        request.speedY += request.acceleration || 0;
        request.position.x += request.speedX || 0;
        request.position.y += request.speedY || 0;
    };

    setCanvasSize = (element, decimalPercentage, menu) => {
        const size = Math.min(window.innerWidth, window.innerHeight);
        const dimension = size * (decimalPercentage / 100);

        element.style.width = `${dimension}px`;
        element.style.height = `${dimension}px`;

        if (menu) {
            menu.style.width = `${dimension}px`;
            menu.style.height = `${dimension}px`;
        }
    };

    activateResponsiveCanvas = (decimalPercentage) => {
        const resizeCanvas = () => this.setCanvasSize(this.canvas, decimalPercentage, this.menu);
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("load", resizeCanvas);
    };

    playMap = (mapName) => {
        const map = this.maps[mapName] || [];
        map.forEach((element) => this.requestSpriteAnimation(element));
    };

    executeBehaviorStack = (request) => {
        request.behaviorStack.forEach((action) => action(request));
    };

    mapFrames = (...actions) => {
        const dimensionsFrame = actions.find((elem) => elem.dimensions);
        const animationsState = actions.filter((frames) => frames.frames);
        const animationFrames = {};

        animationsState.forEach((state, index) => {
            animationFrames[state.name] = Array.from({ length: state.frames }, (_, i) => ({
                codX: i * dimensionsFrame.dimensions.width,
                codY: index * dimensionsFrame.dimensions.height,
            }));
        });

        return animationFrames;
    };

    createReel = (objectModel) => {
        const reel = {
            createFrame: (widthRange, heightRange) => {
                const frame = new Character({
                    ...objectModel,
                });

                const gridCols = Math.floor(((widthRange / 100) * this.canvas.width) / frame.width);
                const gridRows = Math.floor(((heightRange / 100) * this.canvas.height) / frame.height);

                frame.cols = gridCols;
                frame.rows = gridRows;
                frame.width *= gridCols;
                frame.height *= gridRows;

                this.requestSpriteAnimation(frame);
                return frame;
            },

            select: (action, index) => {
                const model = this.stackCopiedModelObjects[objectModel.nickName];
                model.frames[index].grid.forEach((row) => row.forEach(action));
            },

            renderFrame: (frame) => {
                const { rows, cols } = frame;
                frame.grid = this.createGrid(frame, rows, cols);
                this.renderGrid(frame.grid);

                frame.isShadow = true;
                frame.spriteSheet = undefined;
                frame.hitBox = undefined;
            },
        };

        this.removeSpriteAnimation(objectModel.spriteId);
        return reel;
    };
}
