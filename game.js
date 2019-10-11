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
    
    let enemy = this.add.image(700, 400, 'enemy');

    this.movManager = {
      movTime : 5,
      waitTime : 2,
      lastMovTime : 0,
      dir : 'x'}
  }

  update(time, delta) {

    if (this.movManager.lastMovTime +this.movManager.movTime > time){
      if(this.movManager.dir == 'x'){
        enemy.x += delta;
      }
      else{
        enemy.y += delta;
      }
    }
    else if (this.movManager.lastMovTime +this.movManager.movTime + this.movManager.waitTime < time){
      this.movManager.lastMovTime = time;
    }
  }
}