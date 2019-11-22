import Atacante from "../Atacante.js";


export default class Archer extends Atacante{
    constructor(scene, positionx, positiony, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,30,unitSpriteName, facing, owner);

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;

        this.canAttack = [];
        this.attacking = undefined;


        this.damage = 15;
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

    checkAttack(){ //Ataca en cruz
        
        if(this.casillaValid(this.position.x -1,this.position.y)){
            if(this.scene.tablero.casillas[this.position.x -1][this.position.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x -1][this.position.y].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[0] = this.scene.tablero.casillas[this.position.x -1][this.position.y].OccupiedBy;
                
            }
            else if(this.scene.tablero.casillas[this.position.x -1][this.position.y].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x -1][this.position.y].estructurePlaced.owner !== this.owner){

                    this.canAttack[0] = this.scene.tablero.casillas[this.position.x -1][this.position.y].estructurePlaced;
            }
            else{
                this.canAttack[0] = undefined;
            }
        }

        if(this.casillaValid(this.position.x +1,this.position.y)){
            if(this.scene.tablero.casillas[this.position.x + 1][this.position.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x + 1][this.position.y].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[1] = this.scene.tablero.casillas[this.position.x + 1][this.position.y].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x + 1][this.position.y].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x + 1][this.position.y].estructurePlaced.owner !== this.owner){

                this.canAttack[1] = this.scene.tablero.casillas[this.position.x + 1][this.position.y].estructurePlaced;
            }
            else{
                this.canAttack[1] = undefined;
            }
        }

        if(this.casillaValid(this.position.x,this.position.y-1)){
            if(this.scene.tablero.casillas[this.position.x][this.position.y - 1].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y - 1].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[2] = this.scene.tablero.casillas[this.position.x][this.position.y - 1].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x][this.position.y - 1].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y - 1].estructurePlaced.owner !== this.owner){

                this.canAttack[2] = this.scene.tablero.casillas[this.position.x][this.position.y - 1].estructurePlaced;
            }
            else{
                this.canAttack[2] = undefined;
                }
        }
        if(this.casillaValid(this.position.x ,this.position.y+1)){
            if(this.scene.tablero.casillas[this.position.x][this.position.y + 1].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y + 1].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[3] = this.scene.tablero.casillas[this.position.x][this.position.y + 1].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x][this.position.y + 1].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y + 1].estructurePlaced.owner !== this.owner){

                this.canAttack[3] = this.scene.tablero.casillas[this.position.x][this.position.y + 1].estructurePlaced;
            }
            else{
            this.canAttack[3] = undefined;
            }
        }

        //// Ahora la distancia 2

        if(this.casillaValid(this.position.x -2,this.position.y)){
            if(this.scene.tablero.casillas[this.position.x -2][this.position.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x -2][this.position.y].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[4] = this.scene.tablero.casillas[this.position.x -2][this.position.y].OccupiedBy;  //error con la y
                
            }
            else if (this.scene.tablero.casillas[this.position.x -2][this.position.y].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x -2][this.position.y].estructurePlaced.owner !== this.owner){

                this.canAttack[4] = this.scene.tablero.casillas[this.position.x -2][this.position.y].estructurePlaced;
            }
            else{
                this.canAttack[4] = undefined;
            }
        }

        if(this.casillaValid(this.position.x +2,this.position.y)){
            if(this.scene.tablero.casillas[this.position.x + 2][this.position.y].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x + 2][this.position.y].OccupiedBy.owner !== this.owner) {
                    
                    this.canAttack[5] = this.scene.tablero.casillas[this.position.x + 2][this.position.y].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x + 2][this.position.y].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x + 2][this.position.y].estructurePlaced.owner !== this.owner){

                this.canAttack[5] = this.scene.tablero.casillas[this.position.x + 2][this.position.y].estructurePlaced;
            }
            else{
                this.canAttack[5] = undefined;
            }
        }

        if(this.casillaValid(this.position.x,this.position.y-2)){
            if(this.scene.tablero.casillas[this.position.x][this.position.y - 2].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y - 2].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[6] = this.scene.tablero.casillas[this.position.x][this.position.y - 2].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x][this.position.y - 2].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y - 2].estructurePlaced.owner !== this.owner){

                this.canAttack[6] = this.scene.tablero.casillas[this.position.x][this.position.y - 2].estructurePlaced;
            }
            else{
                this.canAttack[6] = undefined;
            }
        }
        if(this.casillaValid(this.position.x ,this.position.y+2)){
            if(this.scene.tablero.casillas[this.position.x][this.position.y + 2].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y + 2].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[7] = this.scene.tablero.casillas[this.position.x][this.position.y + 2].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x][this.position.y + 2].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x][this.position.y + 2].estructurePlaced.owner !== this.owner){

                this.canAttack[7] = this.scene.tablero.casillas[this.position.x][this.position.y + 2].estructurePlaced;
            }
            else{
                this.canAttack[7] = undefined;
            }
        }


        let i = 0;
        let attackingSomeOne = false;
        while(i<8 && !attackingSomeOne){
            this.attacking = this.canAttack[i];
            if(this.canAttack[i] !== undefined) {
                attackingSomeOne = true;
            }
            i++;
        }
    }
}