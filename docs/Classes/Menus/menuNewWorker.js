export default class MenuNewWorker extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene, 0, 0);
      
        this.scene = scene;
        this.blueWorker = scene.add.image(650, 50, 'constructionMenuAv').setInteractive();
        this.add(this.blueWorker);

        this.redWorker = scene.add.image(650, 1250 , 'constructionMenuAv').setInteractive();
        this.add(this.redWorker);

  


        scene.add.existing(this);

        //Se configuran las interacciones con los iconos
        {
            this.blueWorker.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) 
                if(this.scene.blueTurn) this.scene.bluePlayer.newWorker();});
            this.redWorker.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) 
                if(!this.scene.blueTurn) this.scene.redPlayer.newWorker();});  
        }
    }

    passTurn(player){
        this.scene.passTurn(player);
    }
}