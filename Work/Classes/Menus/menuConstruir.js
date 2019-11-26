export default class MenuConstruir extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.radioMenu = 60;

        this.constructionMenu = scene.add.image(this.radioMenu, this.radioMenu / 2, 'constructionMenuAv').setScale(0.75).setInteractive();
        this.add(this.constructionMenu);

        this.factoryMenu = scene.add.image(-this.radioMenu, this.radioMenu / 2, 'factoryMenuAv').setScale(0.75).setInteractive();
        this.add(this.factoryMenu);

        this.constructionMenuX = scene.add.image(this.radioMenu, this.radioMenu / 2, 'constructionMenuUnav').setScale(0.75).setInteractive();
        this.constructionMenuX.visible = false;
        this.add(this.constructionMenuX);

        this.factoryMenuX = scene.add.image(-this.radioMenu, this.radioMenu / 2, 'factoryMenuUnav').setScale(0.75).setInteractive();
        this.factoryMenuX.visible = false;
        this.add(this.factoryMenuX);

        this.HQmenu = scene.add.image(0, -this.radioMenu / 2, 'HQMenuAv').setScale(0.75).setInteractive();
        this.add(this.HQmenu);

        this.HQmenuX = scene.add.image(0, -this.radioMenu / 2, 'HQMenuUnav').setScale(0.75).setInteractive();
        this.HQmenuX.visible = false;
        this.add(this.HQmenuX);

        this.buildCannon = scene.add.image(this.radioMenu, this.radioMenu, 'cannonMenu').setScale(0.75).setInteractive();
        this.buildCannon.visible = false;
        this.add(this.buildCannon);

        this.buildTower = scene.add.image(-this.radioMenu, this.radioMenu, 'towerMenu').setScale(0.75).setInteractive();
        this.buildTower.visible = false;
        this.add(this.buildTower);

        this.buildMortar = scene.add.image(this.radioMenu, -this.radioMenu, 'mortarMenu').setScale(0.75).setInteractive();
        this.buildMortar.visible = false;
        this.add(this.buildMortar);

        this.visible = false;
        scene.add.existing(this);

        //Se configuran las interacciones con los iconos
        {
            this.constructionMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) this.defensesMenuSelected();});
            this.factoryMenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.buildStructure(3); });
            this.constructionMenuX.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) console.log("No puedes construir una defensa aqui");});
            this.factoryMenuX.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) console.log("no puedes extraer recursos aqui");});
            this.buildCannon.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.buildStructure(0);});
            this.buildTower.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.buildStructure(1);});
            this.buildMortar.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.buildStructure(2);});
            this.HQmenu.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.buildStructure(4);});
            this.HQmenuX.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) console.log("No puedes construir un cuartel aqui");});
        }
    }

    updateMenu(){
        let casilla = this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y];
        //console.log(this.scene.selection.position.x + " " +this.scene.selection.position.y + " " + casilla.sprite);

        if (casilla.resources){
            this.factoryMenuAv();
            this.constructionMenuUnav();
            this.HQMenuUnav();
        }
        else if (casilla.vacia){
            this.factoryMenuUnav();
            this.HQMenuAv();
            if(this.scene.selection.owner.Resources.wood >= 5){
                this.constructionMenuAv();
            }
            else{
                this.constructionMenuUnav();
            }
        }
        else {
            this.HQMenuUnav();
            this.factoryMenuUnav();
            this.constructionMenuUnav();
        }
    }

    factoryMenuAv(){
        this.desactivateDefensesMenu();
        this.factoryMenuX.visible = false;
        this.factoryMenu.visible = true;
    }

    factoryMenuUnav(){
        this.desactivateDefensesMenu();
        this.factoryMenuX.visible = true;
        this.factoryMenu.visible = false;
    }

    constructionMenuAv(){
        this.desactivateDefensesMenu();
        this.constructionMenu.visible = true;
        this.constructionMenuX.visible = false;
    }

    constructionMenuUnav(){
        this.desactivateDefensesMenu();
        this.constructionMenu.visible = false;
        this.constructionMenuX.visible = true;
    }

    HQMenuAv(){
        this.desactivateDefensesMenu();
        this.HQmenu.visible = true;
        this.HQmenuX.visible = false;
    }

    HQMenuUnav(){
        this.desactivateDefensesMenu();
        this.HQmenu.visible = false;
        this.HQmenuX.visible = true;
    }

    defensesMenuSelected(){
        this.constructionMenu.visible = false;
        this.constructionMenuX.visible = false;
        this.factoryMenuX.visible = false;
        this.factoryMenu.visible = false;
        this.buildCannon.visible = true;
        this.buildTower.visible = true;
        this.buildMortar.visible = true;

        this.HQmenu.visible = false;
    }

    desactivateDefensesMenu(){
        this.buildCannon.visible = false;
        this.buildTower.visible = false;
        this.buildMortar.visible = false;
    }
}