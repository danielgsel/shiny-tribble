import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
    constructor(scene, positionx, positiony, game) {

      super(scene, positionx,positiony, 100, 1);
      
      this.stats = {
        type : 'empty',
        position : {positionx, positiony}, 
        owner: undefined,
        selected: undefined,
        image: undefined

        }

      this.game = scene;  

    }
 
    
    move(x,y){
        //mover unidad seleccionada
        if(this.game.tablero.casillas[y][x].stats.exists === true && this.game.tablero.casillas[y][x].stats.type !== 'mountain' &&  this.game.tablero.casillas[y][x].stats.type !== 'superMountain'&&
          Math.abs(x-this.stats.position.positionx) <= 1 && Math.abs(y-this.stats.position.positiony) <= 1){
          if (x>= 0 && x <= 10 && y >= 1 && y <= 7){
              if(this.game.tablero.casillas[y][x].stats.unit === undefined){


                this.game.tablero.casillas[this.stats.position.positiony][this.stats.position.positionx].stats.unit = undefined;
                
                this.game.tablero.casillas[y][x].stats.unit = this;

                

                this.stats.position.positionx = x;
                this.stats.position.positiony = y;
                this.stats.image.destroy();

                this.stats.image = this.game.add.image(this.stats.position.positionx*this.squareSize + this.offset ,this.stats.position.positiony*this.squareSize + this.offset ,'worker');



                this.game.tablero.casillas[y][x].stats.unit.stats.selected = false;

                this.game.selected = undefined;
                this.game.flecha.exists = false;
                this.game.flecha.image.destroy();


                
              }
          }
        }
      }
    }