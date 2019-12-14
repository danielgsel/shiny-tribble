export default class MenuNewWorker extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene, 0, 0);
      
        this.scene = scene;

        if (this.scene.color === 'red'){
            this.redWorker = scene.add.image(650, 1250 , 'constructionMenuAv').setInteractive();
            this.add(this.redWorker);

            this.redWorker.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) 
                if(this.scene.myTurn) this.scene.redPlayer.newWorker();}); 
        }
        else{
            this.blueWorker = scene.add.image(650, 50, 'constructionMenuAv').setInteractive();
            this.add(this.blueWorker);

            this.blueWorker.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) 
                if(this.scene.myTurn) this.scene.bluePlayer.newWorker();});
        }

        scene.add.existing(this);
    }

    passTurn(player){
        this.scene.passTurn(player);
    }
}