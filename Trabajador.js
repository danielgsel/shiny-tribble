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
          this.stats.image = this.game.add.image(this.stats.position.positionx*this.squareSize + this.game.offset ,this.stats.position.positiony*this.squareSize + this.game.offset ,'workerSelected');

          console.log("ya ta");
          //this.game.tablero.casillas[y][x].stats.unit.stats.selected = false;

          //this.stats.selected = false;    //OJO ??  <----------por que funciona esto??

          this.game.selectedUnit = undefined;   //Por que?  <----- y esto????
          this.unselected();
          this.game.flecha.exists = false;
          this.game.flecha.image.destroy();  
        }
      }
    }
  }

  selected(){

    this.stats.image.destroy();   //cambio de sprite al ser selecccionado
    this.stats.image = this.game.add.image(this.stats.position.positionx*this.game.squareSize + this.game.offset ,this.stats.position.positiony*this.game.squareSize + this.game.offset ,'workerSelected');

    {   //Se construye el menu de opciones
    this.menuOpciones.movementImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset - 55, this.stats.position.positiony*this.game.squareSize + this.game.offset - 55, 'movingMenu').setScale(0.75).setInteractive();
    this.menuOpciones.buildImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset - 55, 'constructionMenu').setScale(0.75).setInteractive();

    //Elije imagen dependiendo si esta sobre una casilla de recursos o no
    if (this.game.tablero.casillas[this.stats.position.positiony][this.stats.position.positionx].stats.resourcePos === true){
      this.menuOpciones.resourcesImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset + 55, 'factoryMenuAv').setScale(0.75).setInteractive();
    } else{
      this.menuOpciones.resourcesImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset + 55, 'factoryMenuUnav').setScale(0.75).setInteractive();
    }
    }

    this.menuOpciones.active = true;  //Comienza usando el menu opciones
    this.stats.selected = true;   //La tropa ha sido seleccionada

    this.menuOpciones.movementImage.on('pointerdown', pointer => this.movementMenuSelected());
    this.menuOpciones.buildImage.on('pointerdown', pointer => this.buildMenuSelected());
    this.menuOpciones.resourcesImage.on('pointerdown', pointer => this.resourcesMenuSelected());

    console.log("selected worker " + this.stats.position.positionx + " " + this.stats.position.positiony);
    
  }

  unselected(){
    if (this.stats.selected === true){
      this.stats.image.destroy();
      this.stats.image = this.game.add.image(this.stats.position.positionx*this.game.squareSize + this.game.offset ,this.stats.position.positiony*this.game.squareSize + this.game.offset ,'worker');

      
      if (this.menuOpciones.active === true) this.disableMenuOptions(); //Destruir imagenes del menu opciones
      else if (this.menuBuilding.active === true) this.disableMenuDefenses();   //Destruir imagenes del menu defensas
      else if (this.stats.moving === true) {
        this.game.flecha.exists = false;
        this.game.flecha.image.destroy(); 
      }

      this.stats.selected = false;
      this.game.usingMenu = false;
      this.stats.moving = false;

      console.log("unselected worker " + this.stats.position.positionx + " " + this.stats.position.positiony);
    }
  }

  movementMenuSelected(){
    if (this.stats.moving === false){
      console.log("Menu movimiento seleccionado");

      this.game.mouseController = false;

      this.game.usingMenu = false;
      this.menuOpciones.active = false;

      this.disableMenuOptions();    

      this.stats.moving = true;
    }
    
  }

  buildMenuSelected(){
    if (this.menuBuilding.active === false){
      console.log("Menu construccion defensas seleccionado");

      this.game.mouseController = false;
      this.game.usingMenu = true;

      this.disableMenuOptions();

      this.menuBuilding.canonImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset - 55, 'arrowMenu').setScale(2.5).setInteractive();
      this.menuBuilding.mortarImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset + 55, this.stats.position.positiony*this.game.squareSize + this.game.offset + 55, 'arrowMenu').setScale(2.5).setInteractive();
      this.menuBuilding.archerTowerImage = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset - 55, this.stats.position.positiony*this.game.squareSize + this.game.offset + 55, 'arrowMenu').setScale(2.5).setInteractive();
      this.menuBuilding.quarter = this.game.add.image(this.stats.position.positionx * this.game.squareSize + this.game.offset - 55, this.stats.position.positiony*this.game.squareSize + this.game.offset - 55, 'arrowMenu').setScale(2.5).setInteractive();

      this.menuBuilding.active = true;
    }
    
  }

  resourcesMenuSelected(){
    console.log("Menu construccion recursos seleccionado");
    this.game.mouseController = false;
    this.game.usingMenu = false;

    this.disableMenuOptions();
    this.menuOpciones.active = false;
  }

  disableMenuOptions(){
    this.menuOpciones.movementImage.destroy();
    this.menuOpciones.movementImage = undefined;
    this.menuOpciones.buildImage.destroy();
    this.menuOpciones.buildImage = undefined;
    this.menuOpciones.resourcesImage.destroy();
    this.menuOpciones.resourcesImage = undefined;
        
    this.menuOpciones.active = false;
  }

  disableMenuDefenses(){
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
}