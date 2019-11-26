import Atacante from "../Atacante.js";


export default class Soldier extends Atacante{
    constructor(scene, positionx, positiony, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,45,unitSpriteName, facing, owner);

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;

        this.attackingSomeOne = false;
        this.canAttack = [];
        this.attacking = undefined;
 
        this.damage = 30;
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
        this.attackingSomeOne = false;

        this.TryAttack(1,0);
        this.TryAttack(-1,0);
        this.TryAttack(0,1);
        this.TryAttack(0,-1);

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