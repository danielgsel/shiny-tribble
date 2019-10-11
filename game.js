import Tablero from "./Tablero.js";
//import Estructura from "./Estructura.js";
//import Unidad from "./Unidad.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  
    console.log("preload");
  }

  create() {

      this.tablero = new Tablero(this);

  }

  update(time, delta) {

  }
}