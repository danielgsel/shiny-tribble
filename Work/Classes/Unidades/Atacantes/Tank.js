import Atacante from "../Atacante.js";


export default class Tank extends Atacante{
    constructor(scene, positionx, positiony, unitHP, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,unitHP,unitSpriteName, facing, owner)

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;

        this.attacking = undefined;
 
        this.damage = 10;
    }

    passTurn(){
        this.checkAttack();
        if(this.attacking === undefined){
            super.moveAuto();
                
        }
        else{
            console.log("pium pium a: " +  this.attacking.position.x +  " " + this.attacking.position.y);

            this.attacking.receiveDamage(this.damage);
        }
    }
    checkAttack(){ //Ataqu
        let facingTo = super.facingTo();
        if(super.casillaValid(facingTo.x,facingTo.y)){
            if(this.scene.tablero.casillas[facingTo.x][facingTo.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[facingTo.x][facingTo.y].OccupiedBy.owner !== this.owner) {
                    
                    this.attacking = this.scene.tablero.casillas[facingTo.x][facingTo.y].OccupiedBy;
                
            }
            else{
                    this.attacking = undefined;
            }
        }
    }
}