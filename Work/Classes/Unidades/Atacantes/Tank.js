import Atacante from "../Atacante.js";


export default class Tank extends Atacante{
    constructor(scene, positionx, positiony, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,65,unitSpriteName, facing, owner);

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;
        this.attackingSomeOne = false;

        this.attacking = undefined;
 
        this.damage = 10;

        this.canAttack = [];

    }

    passTurn(){
        this.checkAttack();
        if(!this.attackingSomeOne){
            this.moveAuto();
                
        }
        else if (this.attacking !== undefined){

            this.attacking.receiveDamage(this.damage);
        }
        this.canAttack.length  = 0;

    }
    checkAttack(){
        
        this.TryAttack(this.facingRel.x, this.facingRel.y);
        let i = 0;
        
        while(i<this.canAttack.length && !this.attackingSomeOne){
            this.attacking = this.canAttack[i];
            if(this.canAttack[i] !== undefined) {
                this.attackingSomeOne = true;
            }
            i++;
        }       

    }
}