

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'winnermenu' });
    }

  init(data){
    this.winner = data.winner;
  }



  preload() {  
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    
    this.load.image('blured', 'assets/imagenes/blured.png');
    this.load.image('cont', 'assets/imagenes/continue.png');
    
  }

  create() {
      this.input.mouse.disableContextMenu();
      
      this.add.image(650,650,'blured').setScale(1.4);
      this.KeyN = this.input.keyboard.addKey('N');
      this.mouse = this.input.activePointer;
      if(this.winner === 1){
        this.add.text(430, 400,  "RED WINS" , { fontFamily: 'Freckle Face', fontSize: 90, color: '#FF0000' });
      }
      else{
        this.add.text(430, 400,  "BLUE WINS" , { fontFamily: 'Freckle Face', fontSize: 90, color: '#00FFFF' });
      }

      this.play = this.add.image(650, 650, 'cont').setInteractive();
      //Se configuran las interacciones con los iconos
      {
        this.play.on('pointerdown', () => {if (this.mouse.leftButtonDown()) this.goTogame();});
        
      }


  }

  goTogame(){
    this.scene.start('menu');

  }

    
}


