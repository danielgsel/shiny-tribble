import Estructura from "./Estructura.js";
import MenuCuartel from "../Menus/menuCuartel.js"

export default class Cuartel extends Estructura{
    constructor(owner, tabPos, x, y, scene){
        let sName;
        if (owner.color === 'red') sName = 'redHQ';
        else sName = 'blueHQ';
        
        super(sName, 45, owner, tabPos, x, y, scene);

        this.MenuCuartel = new MenuCuartel(this, this.scene, tabPos[0] * scene.squareSize + scene.offset, tabPos[1] * scene.squareSize + scene.offset);
        this.MenuCuartel.visible = false;

        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => {if (scene.mouse.leftButtonDown()) if(scene.myTurn && owner.color === scene.color||
        (!scene.myTurn && owner.color === scene.color)){
            scene.HQSelected(this.MenuCuartel); this.MenuCuartel.selected();}
        });
    }

    spawnUnit(pos, dir, unitType){
        this.owner.newUnit(pos[0], pos[1], unitType, dir);
        //console.log("Spawning unit at " + pos[0] + " " + pos[1] + " direction " + dir);
    }
}