import Atacante from "../Atacante.js";


export default class Soldier extends Atacante{
    constructor(scene, positionx, positiony, unitHP, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,unitHP,unitSpriteName, facing, owner)

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;

        this.canAttack = [];
        this.attacking = undefined;
 
    }

    passTurn(){
        this.checkAttack();
        if(this.attacking === undefined){
            super.moveAuto();
                
        }
        else{
            console.log("pium pium a: " +  this.attacking.position.x +  " " + this.attacking.position.y);
        }
        
    }

    checkAttack(){ //Ataca en cruz
        
        if(super.casillaValid(this.position.x -1,this.position.y)){
            if(this.scene.tablero.casillas[this.position.x -1][this.position.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x -1][this.position.y].OccupiedBy.owner !== this.owner) {
                    
                    this.canAttack[0] = this.scene.tablero.casillas[this.position.x -1][y].OccupiedBy;
                
            }
            else{
                    this.canAttack[0] = undefined;
            }
        }

        if(super.casillaValid(this.position.x +1,this.position.y)){
            if(this.scene.tablero.casillas[this.position.x + 1][this.position.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x + 1][this.position.y].OccupiedBy.owner !== this.owner) {
                    
                    this.canAttack[1] = this.scene.tablero.casillas[this.position.x + 1][this.position.y].OccupiedBy;
                }
            else{
                this.canAttack[1] = undefined;
            }
        }

        if(super.casillaValid(this.position.x,this.position.y-1)){
            if(this.scene.tablero.casillas[this.position.x][this.position.y - 1].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y - 1].OccupiedBy.owner !== this.owner) {
                    
                    this.canAttack[2] = this.scene.tablero.casillas[this.position.x][this.position.y - 1].OccupiedBy;
                }
            else{
                    this.canAttack[2] = undefined;
                }
        }
        if(super.casillaValid(this.position.x ,this.position.y+1)){
            if(this.scene.tablero.casillas[this.position.x][this.position.y + 1].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y + 1].OccupiedBy.owner !== this.owner) {
                    
                    this.canAttack[3] = this.scene.tablero.casillas[this.position.x][this.position.y + 1].OccupiedBy;
                }
                else{
                    this.canAttack[3] = undefined;
            }
        }
            let i = 0;
            while(i<3 && this.attacking === undefined){
                this.attacking = this.canAttack[i];
                i++;
            }
    }
}