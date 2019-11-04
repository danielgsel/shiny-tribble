export default class MenuConstruir extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.radioMenu = 40;

        this.constructionMenu = scene.add.image(this.radioMenu, 0, 'constructionMenuAv').setScale(0.75);
        this.add(this.constructionMenu);

        this.factoryMenu = scene.add.image(-this.radioMenu, 0, 'factoryMenuAv').setScale(0.75);
        this.add(this.factoryMenu);

        this.constructionMenuX = scene.add.image(this.radioMenu, 0, 'constructionMenuUnav').setScale(0.75);
        this.constructionMenuX.visible = false;
        this.add(this.constructionMenuX);

        this.factoryMenuX = scene.add.image(-this.radioMenu, 0, 'factoryMenuUnav').setScale(0.75);
        this.factoryMenuX.visible = false;
        this.add(this.factoryMenuX);

        this.visible = false;
        scene.add.existing(this);
    }

    updateMenu(){
        let casilla = this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y];
        console.log(this.scene.selection.position.x + " " +this.scene.selection.position.y + " " + casilla.sprite);

        if (casilla.resources){
            
            this.factoryMenuAv();
            this.constructionMenuUnav();
        }
        else if (casilla.vacia){
            this.factoryMenuUnav();
            this.constructionMenuAv();
        }
    }

    factoryMenuAv(){
        this.factoryMenuX.visible = false;
        this.factoryMenu.visible = true;
    }

    factoryMenuUnav(){
        this.factoryMenuX.visible = true;
        this.factoryMenu.visible = false;
    }

    constructionMenuAv(){
        this.constructionMenu.visible = true;
        this.constructionMenuX.visible = false;
    }

    constructionMenuUnav(){
        this.constructionMenu.visible = false;
        this.constructionMenuX.visible = true;
    }
}