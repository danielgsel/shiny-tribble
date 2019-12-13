import Unidad from "./Unidad.js";



export default class Atacante extends Unidad{
    constructor(scene, positionx, positiony, unitHP, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,unitHP,unitSpriteName, owner);

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;
        this.owner = owner;

        if (this.owner.color ==="red"){
            this.enemyColor = "blue";
        }
        else{
            this.enemyColor = "red";
        }
        this.facingRel = this.facingTo();
    }

    // passTurn(){
    //     this.moveAuto();
    // }

    moveAuto(){
       let x= this.position.x + this.facingRel.x;
       let y =this.position.y + this.facingRel.y;
        if(!this.casillaValid(x,y)){
            if(x<this.position.x){
                x = this.position.x + 1;
                this.facingRel.x = 1;
            }
            else if(x > this.position.x){
                x = this.position.x - 1;
                this.facingRel.x = -1;

            }
            if(y > this.position.y){
                y = this.position.y -1;
                this.facingRel.y = -1;

            }
            else if(y < this.position.y){
                y = this.position.y +1;
                this.facingRel.y = 1;

            }
        }
        if(this.scene.tablero.casillas[x][y].OccupiedBy === undefined){
                this.scene.tablero.casillas[x][y].OccupiedBy = this;
                this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
                this.moveUnit(x, y);
                // this.position.x = x;
                // this.position.y = y;
            

            // else if(this.scene.tablero.casillas[x][y].OccupiedBy.owner !== this.owner){
            //     console.log(" un rojo");
            // }
        }
    }

    casillaValid(x, y){
        return((x < this.scene.anchoMundo && x >= 0) && (y < this.scene.altoMundo && y>= 0) && (!this.scene.tablero.casillas[x][y].inexistente)
        && (!this.scene.tablero.casillas[x][y].base));

    }

    facingTo(){
        let x = 0;
        let y = 0;

                
         switch(this.facing){
            case "up":
                y--;
                break;
            case "down":
                y++;
                break;
            case "left":
                x--;
                break;
            case "right":
                x++
                break;
            case "upright":
                x++;
                y--;
                break;
            case "downright":
                x++;
                y++;
                break;
            case "upleft":
                x--;
                y--;
                break;
            case "downleft":
                x--;
                y++;
                break;         
            }

        let facingTo = {x: x, y: y}
        return facingTo;
    }

    TryAttack(xSum, ySum){
        try{
        if(this.casillaValid(this.position.x + xSum ,this.position.y + ySum)){
            if(this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].OccupiedBy !== undefined
                && this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].OccupiedBy.owner !== this.owner) {
                    
                this.canAttack[this.canAttack.length] = this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].OccupiedBy;
                }
            else if(this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].estructurePlaced !== undefined
                && this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].estructurePlaced.owner !== this.owner){

                this.canAttack[this.canAttack.length] = this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].estructurePlaced;
            }
            else{
                this.canAttack[this.canAttack.length] = undefined;
            }
        }
        else if((this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].base &&
            this.scene.tablero.casillas[this.position.x + xSum][this.position.y + ySum].owner === this.enemyColor)){

            this.scene.attackBase(this.owner);
            this.attackingSomeOne = true;
        }
    }
    catch{
        console.log("mirando fuera");
    }
    }
    

}