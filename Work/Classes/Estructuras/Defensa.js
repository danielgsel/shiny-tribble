import Estructura from "./Estructura.js";

export default class Defensa extends Estructura{
    constructor( damage, range, hp, owner, tabPos, x, y, scene){
        super(hp, owner, tabPos, x, y, scene);
        
        this.range = range;
        this.unitAttached = undefined;
        this.damage = damage;
    }

    passTurn(){
        if (this.unitAttached === undefined){
            this.checkUnits();
        }
        else {
            this.attackUnit();
        }
    }

    checkUnits(){

    }

    attackUnit(){

    }
}