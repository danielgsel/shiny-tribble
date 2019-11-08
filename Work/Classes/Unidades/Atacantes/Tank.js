import Atacante from "../Atacante.js";


export default class Tank extends Atacante{
    constructor(scene, positionx, positiony, unitHP, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,unitHP,unitSpriteName, facing, owner)

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;
 
    }

    passTurn(){

        super.moveAuto();
    }
}