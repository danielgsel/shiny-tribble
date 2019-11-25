import Atacante from "../Atacante.js";


export default class Tank extends Atacante{
    constructor(scene, positionx, positiony, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,65,unitSpriteName, facing, owner);

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
            this.moveAuto();     
                
        }
        else{
            console.log("pium pium a: " +  this.attacking.position.x +  " " + this.attacking.position.y);

            this.attacking.receiveDamage(this.damage);
        }
    }
    checkAttack(){ //Ataqu
        let facingTo = this.facingTo();
        let dest = this.scene.tablero.casillas[facingTo.x][facingTo.y];
        if(this.casillaValid(facingTo.x,facingTo.y)){
            console.log(dest.estructurePlaced !== undefined);
            if(dest.OccupiedBy !== undefined && dest.OccupiedBy.owner !== this.owner) {
                this.attacking = this.scene.tablero.casillas[facingTo.x][facingTo.y].OccupiedBy;
            }
            else if (dest.estructurePlaced !== undefined && dest.estructurePlaced.owner !== this.owner){
                this.attacking = dest.estructurePlaced;
            }
            else{
                this.attacking = undefined;
            }
        }
    }
}