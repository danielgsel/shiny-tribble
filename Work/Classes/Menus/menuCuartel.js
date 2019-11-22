export default class MenuCuartel extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.radioMenu = 40;
        this.settingUnit = false;
        this.settingDirection = false;
        this.unitToSpawn = undefined;

        this.soldierMenu = scene.add.image(this.radioMenu, this.radioMenu, 'soldierMenu').setScale(0.75).setInteractive();
        this.add(this.soldierMenu);

        this.knightMenu = scene.add.image(-this.radioMenu, this.radioMenu, 'knightMenu').setScale(0.75).setInteractive();
        this.add(this.knightMenu);

        this.bowMenu = scene.add.image(this.radioMenu, -this.radioMenu, 'bowMenu').setScale(0.75).setInteractive();
        this.add(this.bowMenu);

        this.visible = false;
        scene.add.existing(this);

        this.soldierMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.soldierSelected();});
        this.knightMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.knightSelected();});
        this.bowMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.bowSelected();});
    }

    soldierSelected(){

    }

    knightSelected(){

    }

    bowSelected(){

    }

    updateMenu(){
        if (this.settingUnit){

        }
        else if (this.settingDirection){

        }
    }
}