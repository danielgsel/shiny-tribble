import Unidad from "../Unidad.js";

//El codigo entre atacantes es casi igual, habria que moverlo (O igual no, una vez estén las funcionalidades de ataques ya será más distinto)

export default class Archer extends Unidad{
    constructor(scene, positionx, positiony, unitHP, unitSpriteName, facing){

        super(scene,positionx,positiony,unitHP,unitSpriteName)


        this.numMovs = 1; //nadie se mueve dos en realidad creo no??
        this.position = {x: positionx, y: positiony};   
        this.scene = scene;
        this.facing = facing;
    }

    //Esto deberia estar en otro sitio, es comun a todos los atacantes (cambia solo el numMovs, que n esta en la propia funcion)
    //Falta que pare si hay un enemigo delante 
    moveAuto(){
        for(let i = 0; i < this.numMovs; i++){ //No hace falta si decidimos que todos se muevan 1xturno
            
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
            if((x < this.scene.anchoMundo && x >= 0) && (y < this.scene.altoMundo && y>= 0) && (!this.scene.tablero.casillas[x][y].inexistente)){
                this.scene.tablero.casillas[x][y].OccupiedBy = this;
                this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
                this.moveUnit(x, y);
            }
        }

    }

}