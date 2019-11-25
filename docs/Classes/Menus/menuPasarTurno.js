export default class MenuPasarTurno extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
      
        this.scene = scene;
        this.nextTurn = scene.add.image(x, y, 'nextTurnRed').setScale(0.75).setInteractive();
        this.add(this.nextTurn);

  


        scene.add.existing(this);

        //Se configuran las interacciones con los iconos
        {
            this.nextTurn.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.passTurn();});
        
        }
    }

    passTurn(player){
        this.scene.passTurn(player);
    }
}