import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
  constructor(scene, positionx, positiony, game) {

    super(scene, positionx,positiony, 100, 1);
      
    this.stats = {
      type : 'Trabajador',
      position : {positionx, positiony}, 
      owner: undefined,
      selected: false,
      moving : false,
      image: undefined
    }

    this.menuOpciones = {
      active : false,
      movementImage : undefined,
      buildImage :undefined,
      resourcesImage : undefined
    }

    this.menuBuilding = {
      active : false,
      canonImage : undefined,
      archerTowerImage : undefined,
      mortarImage : undefined,
      quarter : undefined
    }

    this.game = scene;  

  }
  
  move(x,y){
    //mover unidad seleccionada
    if(this.game.tablero.casillas[y][x].stats.exists === true && this.game.tablero.casillas[y][x].stats.type !== 'mountain' &&  this.game.tablero.casillas[y][x].stats.type !== 'superMountain'&&
      Math.abs(x-this.stats.position.positionx) <= 1 && Math.abs(y-this.stats.position.positiony) <= 1){
      if (x>= 0 && x <= this.game.anchoMundo - 1 && y >= 1 && y <= this.game.altoMundo - 2){
        if(this.game.tablero.casillas[y][x].stats.unit === undefined){

          this.game.tablero.casillas[this.stats.position.positiony][this.stats.position.positionx].stats.unit = undefined;
                
          this.game.tablero.casillas[y][x].stats.unit = this;

                
          this.stats.position.positionx = x;
          this.stats.position.positiony = y;
          this.stats.image.destroy();

          this.stats.image = this.game.add.image(this.stats.position.positionx*this.squareSize + this.game.offset ,this.stats.position.positiony*this.squareSize + this.game.offset ,'worker');


          //this.game.tablero.casillas[y][x].stats.unit.stats.selected = false;

          this.stats.selected = false;    //OJO ??

          this.game.selected = undefined;   //Por que?
          this.game.flecha.exists = false;
          this.game.flecha.image.destroy();  
        }
      }
    }
  }

  selected(movImage, buildImage, resImage){
    if (this.stats.selected === false){
      this.menuOpciones.movementImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset - 55, this.stats.position.positiony*this.game.squareSize + this.game.offset - 55, movImage).setScale(2.5);
      this.menuOpciones.buildImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset - 55, buildImage).setScale(2.5);
      this.menuOpciones.resourcesImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset + 55, resImage).setScale(2.5);

      this.stats.image.destroy();
      this.stats.image = this.game.add.image(this.stats.position.positionx*this.game.squareSize + this.game.offset ,this.stats.position.positiony*this.game.squareSize + this.game.offset ,'workerSelected');
    
      this.menuOpciones.active = true;
      this.stats.selected = true;

      console.log("selected worker " + this.stats.position.positionx + " " + this.stats.position.positiony);
    }
  }

  unselected(){
    if (this.stats.selected === true){
      this.stats.image.destroy();
      this.stats.image = this.game.add.image(this.stats.position.positionx*this.game.squareSize + this.game.offset ,this.stats.position.positiony*this.game.squareSize + this.game.offset ,'worker');

      if (this.menuOpciones.active === true){
        this.menuOpciones.movementImage.destroy();
        this.menuOpciones.movementImage = undefined;
        this.menuOpciones.buildImage.destroy();
        this.menuOpciones.buildImage = undefined;
        this.menuOpciones.resourcesImage.destroy();
        this.menuOpciones.resourcesImage = undefined;
        
        this.menuOpciones.active = false;
      }
      else if (this.menuBuilding.active === true){
        this.menuBuilding.canonImage.destroy();
        this.menuBuilding.canonImage = undefined;
        this.menuBuilding.mortarImage.destroy();
        this.menuBuilding.mortarImage = undefined;
        this.menuBuilding.archerTowerImage.destroy();
        this.menuBuilding.archerTowerImage = undefined;
        this.menuBuilding.quarter.destroy();
        this.menuBuilding.quarter = undefined;
        
        this.menuBuilding.active = false;
      }
      this.stats.selected = false;

      console.log("unselected worker " + this.stats.position.positionx + " " + this.stats.position.positiony);
    }
  }
}