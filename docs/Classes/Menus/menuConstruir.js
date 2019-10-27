export default class MenuConstruir extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.radioMenu = 40;
        this.menuConstruirImage = scene.add.image(this.radioMenu, 0, 'constructionMenuAv').setScale(0.75);
        this.add(this.menuConstruirImage);
        this.menuConstruirImage = scene.add.image(-this.radioMenu, 0, 'factoryMenuAv').setScale(0.75);
        this.add(this.menuConstruirImage);
        this.visible = false;
        scene.add.existing(this);
    }
}