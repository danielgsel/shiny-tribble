import MenuTropaCuartel from "./menuTropaCuartel.js";

export default class MenuCuartel extends Phaser.GameObjects.Container{
    constructor(HQ, scene, x, y){
        super(scene, x, y);
        this.radioMenu = 40;
        this.settingUnit = false;
        this.settingDirection = false;
        this.unitToSpawn = undefined;
        this.HQ = HQ;
        this.menuDirecciones = new MenuTropaCuartel(scene, x, y, this);

        this.unitName = undefined;
        this.pos = undefined;
        this.direction = undefined;

        this.soldierMenu = scene.add.image(this.radioMenu, this.radioMenu, 'soldierMenu').setScale(0.75).setInteractive();
        this.add(this.soldierMenu);

        this.knightMenu = scene.add.image(-this.radioMenu, this.radioMenu, 'knightMenu').setScale(0.75).setInteractive();
        this.add(this.knightMenu);

        this.bowMenu = scene.add.image(this.radioMenu, -this.radioMenu, 'bowMenu').setScale(0.75).setInteractive();
        this.add(this.bowMenu);

        this.visible = false;
        scene.add.existing(this);

        this.soldierMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.setPosUnit(); this.soldierSelected();});
        this.knightMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.setPosUnit(); this.tankSelected();});
        this.bowMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.setPosUnit(); this.archerSelected();});
    }

    selected(){
        this.settingUnit = false;
        this.settingDirection = false;
        this.unitToSpawn = undefined;

        if ((this.HQ.owner.color === 'blue' && this.scene.bluePlayer.Resources.steel >= 5) ||
        (this.HQ.owner.color === 'red' && this.scene.redPlayer.Resources.steel >= 5 )
        ){
            this.soldierMenu.visible = true;
            this.knightMenu.visible = true;
            this.bowMenu.visible = true;
        }
        else{
            this.soldierMenu.visible = false;
            this.knightMenu.visible = false;
            this.bowMenu.visible = false;

            console.log("no tienes recursos suficientes");
            
        }
        

        this.visible = true;
    }

    unselected(){
        if (this.unitToSpawn !== undefined) this.unitToSpawn.visible = false;
        if(this.menuDirecciones.visible) this.menuDirecciones.visible = false;
        this.visible = false;
    }

    setPosUnit(){
        this.settingUnit = true
        
        this.soldierMenu.visible = false;
        this.knightMenu.visible = false;
        this.bowMenu.visible = false;
    }

    selectDirection(){
        this.settingUnit = false;
        this.settingDirection = true;
    }

    soldierSelected(){
        if (this.HQ.owner.color === 'blue'){
            this.unitToSpawn = this.scene.add.image(0, 0, 'blueSoldier').setInteractive();
        }
        else{
            this.unitToSpawn = this.scene.add.image(0, 0, 'redSoldier').setInteractive();
        }
        this.unitName = 'soldier';
    }

    tankSelected(){
        if (this.HQ.owner.color === 'blue'){
            this.unitToSpawn = this.scene.add.image(0, 0, 'blueTank').setInteractive();
        }
        else{
            this.unitToSpawn = this.scene.add.image(0, 0, 'redTank').setInteractive();
        }
        this.unitName = 'tank';
    }

    archerSelected(){
        if (this.HQ.owner.color === 'blue'){
            this.unitToSpawn = this.scene.add.image(0, 0,'blueArcher').setInteractive();
        }
        else{
            this.unitToSpawn = this.scene.add.image(0, 0, 'redArcher').setInteractive();
        }
        this.unitName = 'archer';
    }

    updateMenu(){
        if (this.settingUnit){
            this.updateSettingMenu();
        }
        else if (this.settingDirection){
            this.menuDirecciones.updateMenu();
        }
    }

    updateSettingMenu(){
        let x = Math.floor(this.scene.mouse.worldX/this.scene.squareSize - 1);
        let y = Math.floor(this.scene.mouse.worldY/this.scene.squareSize - 1);

        if (x >= 0 && x < this.scene.anchoMundo && y >= 0 && y < this.scene.altoMundo && 
            Math.abs(this.HQ.position.x - x) <= 1 && Math.abs(this.HQ.position.y - y) <= 1 &&
            !this.scene.tablero.casillas[x][y].inexistente && this.scene.tablero.casillas[x][y].OccupiedBy === undefined && this.scene.tablero.casillas[x][y].estructurePlaced === undefined){
            
            let coord = {
                x : x - this.HQ.position.x,
                y : y - this.HQ.position.y
            }

            this.unitToSpawn.x = (this.HQ.position.x + coord.x) * this.scene.squareSize + this.scene.offset;
            this.unitToSpawn.y = (this.HQ.position.y + coord.y) * this.scene.squareSize + this.scene.offset;

            if (this.scene.mouse.leftButtonDown()){
                this.pos = [x, y];
                this.selectDirection();
                this.menuDirecciones.x = this.unitToSpawn.x;
                this.menuDirecciones.y = this.unitToSpawn.y;
                this.menuDirecciones.visible = true;
            }
        }
    }

    setDirection(dir){
        this.direction = dir;
        this.HQ.spawnUnit(this.pos, this.direction, this.unitName);
        this.unitToSpawn.visible = false;
        this.menuDirecciones.visible = false;
        this.unselected();
    }
}