export default class MenuCuartel extends Phaser.GameObjects.Container{
    constructor(HQ, scene, x, y){
        super(scene, x, y);
        this.radioMenu = 40;
        this.settingUnit = false;
        this.settingDirection = false;
        this.unitToSpawn = undefined;
        this.HQ = HQ;

        this.soldierMenu = scene.add.image(this.radioMenu, this.radioMenu, 'soldierMenu').setScale(0.75).setInteractive();
        this.add(this.soldierMenu);

        this.knightMenu = scene.add.image(-this.radioMenu, this.radioMenu, 'knightMenu').setScale(0.75).setInteractive();
        this.add(this.knightMenu);

        this.bowMenu = scene.add.image(this.radioMenu, -this.radioMenu, 'bowMenu').setScale(0.75).setInteractive();
        this.add(this.bowMenu);

        this.visible = false;
        scene.add.existing(this);

        this.soldierMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.settingUnit(); this.soldierSelected();});
        this.knightMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.settingUnit(); this.knightSelected();});
        this.bowMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.settingUnit(); this.bowSelected();});
    }

    selected(){
        this.settingUnit = false;
        this.settingDirection = false;
        this.unitToSpawn = undefined;

        this.soldierMenu.visible = true;
        this.knightMenu.visible = true;
        this.bowMenu.visible = true;

        this.visible = true;
    }

    unselected(){
        this.scene.HQUnselected();

        this.visible = false;
    }

    settingUnit(){
        this.settingUnit = true
        
        this.soldierMenu.visible = false;
        this.knightMenu.visible = false;
        this.bowMenu.visible = false;
    }

    selectDirection(){
        this.settingDirection = true;
    }

    soldierSelected(){
        if (this.HQ.owner.color === 'blue'){
            this.unitToSpawn = this.scene.add.image(0, 0, 'blueSoldier').setInteractive();
        }
        else{
            this.unitToSpawn = this.scene.add.image(0, 0, 'redSoldier').setInteractive();
        }
        this.unitToSpawn.on('pointerDown', () => {if (this.scene.mouse.leftButtonDown()) this.selectDirection();})
    }

    knightSelected(){
        if (this.HQ.owner.color === 'blue'){
            this.unitToSpawn = this.scene.add.image(0, 0, 'blueTank').setInteractive();
        }
        else{
            this.unitToSpawn = this.scene.add.image(0, 0, 'redTank').setInteractive();
        }
        this.unitToSpawn.on('pointerDown', () => {if (this.scene.mouse.leftButtonDown()) this.settingDirection();})
    }

    bowSelected(){
        if (this.HQ.owner.color === 'blue'){
            this.unitToSpawn = this.scene.add.image(0, 0,'blueArcher').setInteractive();
        }
        else{
            this.unitToSpawn = this.scene.add.image(0, 0, 'redArcher').setInteractive();
        }
        this.unitToSpawn.on('pointerDown', () => {if (this.scene.mouse.leftButtonDown()) this.settingDirection();})
    }

    updateMenu(){
        if (this.settingUnit){
            updateSettingMenu();
        }
        else if (this.settingDirection){

        }
    }

    updateSettingMenu(){
        //Mover imagen de acuerdo al raton
    }
}