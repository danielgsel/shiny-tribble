

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
   
  }

  preload() {  
    
    this.load.image('blured', 'assets/imagenes/blured.png');
    this.load.image('play', 'assets/imagenes/start.png');
    
  }

  create() {
      this.input.mouse.disableContextMenu();
      
      this.add.image(650,650,'blured').setScale(1.4);
      this.KeyR = this.input.keyboard.addKey('R');
      this.KeyB = this.input.keyboard.addKey('B');

      this.mouse =this.input.activePointer;


      this.play = this.add.image(650, 650, 'play').setScale(0.75).setInteractive();
      //Se configuran las interacciones con los iconos
      {
        this.play.on('pointerdown', () => {if (this.mouse.leftButtonDown()) this.goTogame();});
        
      }


  }

  update(time, delta) {
    if(this.KeyR.isDown){
      this.scene.start('winnermenu', {winner: 1});
        }
    else if(this.KeyB.isDown){
      this.scene.start('winnermenu', {winner: 0});
    } 
}

  goTogame(){//Habra que hacer aqui lo del online jajj
    this.scene.start('main');

  }

    
}


