

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'winnermenu' });
    }

  init(data){
    this.winner = data.winner;
    this.enemyLeft = data.disconnect;
  }



  preload() {  
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    
    this.load.image('blured', 'assets/imagenes/blured.png');
    this.load.image('cont', 'assets/imagenes/continue.png');
    this.load.image('panel', 'assets/imagenes/panelTRIVALS.png');
    
  }

  create() {
      this.input.mouse.disableContextMenu();
      
      this.add.image(650,650,'blured').setScale(1.4);
      this.add.image(650, 550, 'panel').setScale(2);
      this.KeyN = this.input.keyboard.addKey('N');
      this.mouse = this.input.activePointer;
      if(this.winner === 1){
        this.add.text(430, 400,  "RED WINS" , { fontFamily: 'Freckle Face', fontSize: 90, color: '#FF0000' });
      }
      else{
        this.add.text(430, 400,  "BLUE WINS" , { fontFamily: 'Freckle Face', fontSize: 90, color: '#00FFFF' });
      }
      
      if(this.enemyLeft) {
        this.add.text(275, 525,  "Your enemy has disconnected :(" , { fontFamily: 'Freckle Face', fontSize: 60, color: '#000000' });
      }

      this.add.text(200, 650,  "Refresh website to find another game" , { fontFamily: 'Freckle Face', fontSize: 60, color: '#000000' });
  }

  goTogame(){
    this.scene.start('menu');

  }

    
}


