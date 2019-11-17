import Unidad from "./Unidad.js";



export default class Atacante extends Unidad{
    constructor(scene, positionx, positiony, unitHP, unitSpriteName, facing, owner){

        super(scene,positionx,positiony,unitHP,unitSpriteName, owner);

        this.numMovs = 1;
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;
        this.owner = owner;
    }

    // passTurn(){
    //     this.moveAuto();
    // }

    moveAuto(range){
       let facingTo = this.facingTo();
       let x= facingTo.x;
       let y = facingTo.y;
        if(this.casillaValid(x,y)){

            if(this.scene.tablero.casillas[x][y].OccupiedBy === undefined){
                this.scene.tablero.casillas[x][y].OccupiedBy = this;
                this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
                this.moveUnit(x, y);
            }

            // else if(this.scene.tablero.casillas[x][y].OccupiedBy.owner !== this.owner){
            //     console.log("Coño un rojo");
            // }
        }
    }

    casillaValid(x, y){
        return((x < this.scene.anchoMundo && x >= 0) && (y < this.scene.altoMundo && y>= 0) && (!this.scene.tablero.casillas[x][y].inexistente));

    }

    facingTo(){
        let x = this.position.x;
        let y = this.position.y;

                
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

    

}