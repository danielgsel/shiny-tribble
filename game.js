import Tablero from "./Tablero";
import Estructura from "./Estructura";
import Unidad from "./Unidad";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  
    console.log("preload");

    this.load.image('casilla', './assets/imagenes/Casilla.png');
    this.load.image('enemy', './assets/imagenes/Enemy.png');
  }

  create() {
    console.log("create");
    
    this.enemy = this.add.image(700, 400, 'enemy');
    this.movManager = {
      movTime : 1,
      waitTime : 2,
      lastMovTime : 0,
      
      dir : 'x'}

  }

  update(time, delta) {

    if (this.movManager.lastMovTime + this.movManager.movTime < time){
      if(this.movManager.dir == 'x'){
        this.enemy.x += delta;
      }
      else{
        this.enemy.y += delta;
      }
    }
    if (this.movManager.lastMovTime + this.movManager.movTime + this.movManager.waitTime > time){
      this.movManager.lastMovTime = time;
    }

    console.log(this.movManager.lastMovTime);
    console.log(this.movManager.lastMovTime + this.movManager.movTime + this.movManager.waitTime);

    console.log(time);

  }
}