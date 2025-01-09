import { Control } from "./src/control.js"
import { Character } from "./src/character.js"
import { Universe } from "./src/universe.js"
import { SoundPlayer01 } from "./src/soundPlayer.js";

// Configuración del canvas
const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "#a5a5b1";
const world = new Universe(canvas);
world.physics.gravity = 0;
world.activateResponsiveCanvas(90);


// Sprite-sheets
const spriteSheetPlayer = new Image();
spriteSheetPlayer.src = "./assets/boy.png";

// Generar Fotogramas de Animación
const playerFrames = world.mapFrames({name:"dizzy", frames:2}, {name: "faint", frames:3}, {name:"idle", frames: 2}, {name: "run", frames: 4},{name: "jump-fall", frames:1}, {name:"jump-up", frames: 1}, {name:"sliding", frames:1}, {dimensions: {width: 531, height:  592}})

// Configuración de personajes

const character = new Character({
    /* speedX: 5,
    speedY: 0, */
    spriteSheet: spriteSheetPlayer,
    frameWidth: 531,
    frameHeight: 592,
    staggerFrames: 5,
    animationName: "idle",
   /*  cancelEvent: "stop", */
    isAutoOffAnimation: true,
    frameCoordinates: playerFrames,
    universe: world,

    positionX: 50,
    /* positionY: 20, */
    width: 100,
    height: 200,
    type: "hero",
});

const character2 = new Character({
    /* speedX: 5,
    speedY: 0, */
    spriteSheet: spriteSheetPlayer,
    frameWidth: 531,
    frameHeight: 592,
    staggerFrames: 5,
    animationName: "idle",
   /*  cancelEvent: "stop", */
    isAutoOffAnimation: true,
    frameCoordinates: playerFrames,
    universe: world,

    positionX: 200,
    /* positionY: 20, */
    width: 100,
    height: 200,
    type: "hero",
});

// Configura los controles de un personaje
character.setupKeyControl("d", {
    startAnimation:"run",
    startEvent: "keydown",
    startLoop: true,
    endAnimation: "idle",
    endEvent: "keyup",
    endLoop: true,
    displacementPhysics:{speedX:2, speedY:0}
})

character2.setupKeyControl("s", {
    startAnimation:"run",
    startEvent: "keydown",
    startLoop: true,
    endAnimation: "idle",
    endEvent: "keyup",
    endLoop: true,
    displacementPhysics:{speedX:2, speedY:0}
})

// Crea y configura la hit-box de un personaje
character.configHitbox({positionX:40, positionY:30, width:76, height:140, border:0, color:"red", type:"player"})
character2.configHitbox({positionX:40, positionY:30, width:76, height:140, border:0, color:"blue", type:"player"})


// Configura los comportamientos después de una colisión entre dos elementos o personajes del juego (La función de detección de colisiones solo admite elementos de forma rectangular o cuadrada)
character.collisionActionStack.push((elem) => {
    console.log("Character: Colisión detectada");
})

// Gestionar la interacción entre controles (teclas o botones) y las acciones de un personaje
const controlsOfCharacter = new Control(character);
controlsOfCharacter.hookCharacter("idle", true) 




// Inicio del juego
function initGame(){

    /* NIVELES */
    world.maps.escena_01=[character2] //Introducir elementos animados a la escena (characters) que no posen controles
    world.playMap("escena_01");

    world.drawSprites();
    window.addEventListener("click", () => {
        SoundPlayer01.playAll()
       
    })
    
}


initGame();

