# Documentación de `SoundPlayer`

La clase `SoundPlayer` se utiliza para gestionar la reproducción de una lista de archivos de audio. Ofrece funcionalidades para reproducir todos los audios secuencialmente o de forma individual.

---

## **Lista de audios**
```javascript
const musicList = [
    {
        name: "carrampincho",
        route: "../assets/audio/carrapicho-nojodas.mp3",
    }, 
    {
        name: "levanto-mi-copa",
        route: "../assets/audio/levanto-mi-copa.mp3"
    }
];
```

`musicList` contiene una lista de objetos con los siguientes atributos:
- **`name`**: Nombre del audio (identificador).
- **`route`**: Ruta al archivo de audio.

---

## **Función `instanceAudioList`**
```javascript
const instanceAudioList = () => {
    musicList.forEach(elem => {
       elem.audio =  new Audio(elem.route);
    });

    return musicList;
};
```

### Descripción:
Esta función:
1. Recorre `musicList` y agrega una instancia de `Audio` (de la API Web Audio) a cada elemento de la lista, asociándola con su propiedad `route`.
2. Devuelve la lista actualizada con los objetos de audio.

---

## **Clase `SoundPlayer`**
```javascript
export class SoundPlayer {
    constructor(){
        this.counter = 0;
        this.playedAll = false;
        this.list = instanceAudioList();
    }

    playAll = (isLoop) => { ... }

    play = (name) => { ... }
}
```

### **Constructor**
#### Propiedades:
- **`this.counter`**: Un contador que rastrea qué audio de la lista está siendo reproducido.
- **`this.playedAll`**: Bandera booleana que indica si toda la lista de audios ya ha sido reproducida.
- **`this.list`**: Lista de audios, inicializada con la función `instanceAudioList`.

---

### **Métodos**

#### **`playAll(isLoop)`**
Reproduce todos los audios de la lista secuencialmente.

#### Parámetros:
- **`isLoop`** (booleano): Si es `true`, la lista de reproducción se reinicia automáticamente después de reproducir todos los audios.

#### Funcionamiento:
1. Verifica si la lista de audios ya está en reproducción usando `this.playedAll`.
2. Para cada audio:
   - Escucha el evento `ended` para saber cuándo termina la reproducción.
   - Incrementa `this.counter` para pasar al siguiente audio.
   - Si llega al final de la lista:
     - Reinicia el contador si `isLoop` es `true`.
     - Restablece `this.playedAll` a `false`.
3. Comienza reproduciendo el primer audio con `musicList[0].audio.play()`.

---

#### **`play(name)`**
Reproduce un audio específico por su nombre o el audio actual basado en el contador.

#### Parámetros:
- **`name`** (opcional): El nombre del audio a reproducir.

#### Funcionamiento:
1. Si se pasa un `name`:
   - Busca el audio correspondiente en la lista `musicList`.
   - Reproduce el audio encontrado usando `.play()`.
2. Si no se pasa un `name`:
   - Reproduce el audio correspondiente al índice actual del contador (`this.counter`).

---

## **Instancia exportada**
```javascript
export const SoundPlayer01 = new SoundPlayer();
```

### Descripción:
Se exporta una instancia predeterminada de la clase `SoundPlayer`, llamada `SoundPlayer01`, para ser utilizada directamente en otros módulos.

---

## **Ejemplo de uso**
```javascript
import { SoundPlayer01 } from './SoundPlayer';

// Reproducir todos los audios secuencialmente
SoundPlayer01.playAll(true);

// Reproducir un audio específico por su nombre
SoundPlayer01.play('carrampincho');
```

---

## **Consideraciones**
- El método `playAll` debe evitar ser llamado si `this.playedAll` es `true`, para evitar conflictos en la reproducción simultánea.
- El parámetro `isLoop` en `playAll` habilita una reproducción continua de la lista de audios.
- La lista de audios debe estar correctamente definida en `musicList` para evitar errores al intentar acceder a propiedades inexistentes.
```