import Estructura from "./Estructura.js";

export default class Cuartel extends Estructura{
    constructor(owner, tabPos, x, y, scene){
        if (owner.color === 'red') this.spriteName = 'redHQ';
        else this.spriteName = 'blueHQ';
        this.hp = 50;
        
        super(this.spriteName, this.hp, owner, tabPos, x, y, scene);

        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => {if (scene.mouse.leftButtonDown()) scene.HQselected(this)})
    }

    spawnUnit(pos, dir, unitType){
        this.owner.newUnit(pos[0], pos[1], unitType, dir);
        console.log("Spawning unit at " + pos[0] + " " + pos[1] + " direction " + dir);
    }
}