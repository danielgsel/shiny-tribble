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
    let movTime = 5;
    let waitTime = 2;
    let lastMovTime = 0;
    let dir = 'x';
  }

  update(time, delta) {

    if (lastMovTime + movTime > time){
      if(dir == 'x'){
        enemy.x += delta;
      }
      else{
        enemy.y += delta;
      }
    }
    else if (lastMovTime + movTime + waitTime < time){
      lastMovTime = time;
    }
  }
}