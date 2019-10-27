import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
  constructor(scene, positionx, positiony, hp) {

    super(scene, positionx, positiony, hp, 'worker');
      
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', () => {
      this.scene.workerSelected(this);
      this.selected();
    })

    this.positionx = positionx;
    this.positiony = positiony;
    this.moveDone = false;
    this.spriteSelected = 'workerSelected';   //Provisional

    //MENUS
    /*this.menuOpciones = {
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
    */
  }
  
  moveWorker(x, y){
    this.moveUnit(x, y);
    this.scene.actualizaMenusWorker(this);
  }

  move(x,y){    
    //mover unidad seleccionada
    if(this.scene.tablero.casillas[y][x].stats.exists &&    //Existe la casilla
      Math.abs(x-this.stats.position.positionx) <= 1 && Math.abs(y-this.stats.position.positiony) <= 1 &&   //Esta a una distancia de 1
      (x>= 0 && x <= this.scene.anchoMundo - 1 && y >= 1 && y <= this.scene.altoMundo - 2) &&   //El cursor esta dentro del tablero
      this.scene.tablero.casillas[y][x].stats.unit === undefined){     //La casilla de destino esta libre
        this.scene.tablero.casillas[this.stats.position.positiony][this.stats.position.positionx].stats.unit = undefined;
                
        this.scene.tablero.casillas[y][x].stats.unit = this;

                
        this.stats.position.positionx = x;
        this.stats.position.positiony = y;
          
        this.stats.sprite.destroy();
        this.stats.sprite = this.scene.add.image(this.stats.position.positionx*this.squareSize + this.scene.offset ,this.stats.position.positiony*this.squareSize + this.scene.offset ,'workerSelected');
        //this.game.tablero.casillas[y][x].stats.unit.stats.selected = false;

        //this.stats.selected = false;    //OJO ??  <----------por que funciona esto??

        this.scene.selectedUnit = undefined;   //Por que?  <----- y esto????
        this.unselected();
        this.scene.flecha.exists = false;
        this.scene.flecha.image.destroy();
      }
    }

  selected(){

    //ESTO ES DE LOS MENUS
    /*{   //Se construye el menu de opciones
    this.menuOpciones.movementImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset - 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset - 55, 'movingMenu').setScale(0.75).setInteractive();
    
    Si esta en una casilla donde pueda construir estructuras se activa el menu
    if (!this.scene.tablero.casillas[this.stats.position.positiony][this.stats.position.positionx].stats.resourcePos){
      this.menuOpciones.buildImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset + 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset - 55, 'constructionMenuAv').setScale(0.75).setInteractive();
    } else {
      this.menuOpciones.buildImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset + 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset - 55, 'constructionMenuUnav').setScale(0.75).setInteractive();
    }
    
    //Elige imagen dependiendo si esta sobre una casilla de recursos o no
    if (this.scene.tablero.casillas[this.stats.position.positiony][this.stats.position.positionx].stats.resourcePos){
      this.menuOpciones.resourcesImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset + 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset + 55, 'factoryMenuAv').setScale(0.75).setInteractive();
    } else{
      this.menuOpciones.resourcesImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset + 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset + 55, 'factoryMenuUnav').setScale(0.75).setInteractive();
    }
    }

    this.menuOpciones.active = true;  //Comienza usando el menu opciones
    this.stats.selected = true;   //La tropa ha sido seleccionada

    this.menuOpciones.movementImage.on('pointerdown', pointer => this.movementMenuSelected());
    this.menuOpciones.buildImage.on('pointerdown', pointer => this.buildMenuSelected());
    this.menuOpciones.resourcesImage.on('pointerdown', pointer => this.resourcesMenuSelected());
    */
    console.log("selected worker " + this.positionx + " " + this.positiony);
    
  }

  onSelected(){

  }

  unselected(){
      /* MENUS
      if (this.menuOpciones.active) this.disableMenuOptions(); //Destruir imagenes del menu opciones
      else if (this.menuBuilding.active) this.disableMenuDefenses();   //Destruir imagenes del menu defensas
      else if (this.stats.moving) {
        this.scene.flecha.exists = false;
        this.scene.flecha.image.destroy(); 
      }

      this.stats.selected = false;
      this.scene.usingMenu = false;
      this.stats.moving = false;
      */
      console.log("unselected worker " + this.positionx + " " + this.positiony);
    
  }

  /*
  printArrow(){
      let x = Math.floor(this.mouse.worldX/this.scene.squareSize - 1);
      let y = Math.floor(this.mouse.worldY/this.scene.squareSize - 1);
      if (x >= 0 && x < this.scene.anchoMundo && y > 0 && y < this.scene.altoMundo){

        //Pintar flecha de casilla a la que mover

        if(this.scene.tablero.casillas[y][x] !== undefined && Math.abs(x-this.selectedUnit.stats.position.positionx) <= 1 && 
        Math.abs(y-this.selectedUnit.stats.position.positiony) <= 1){

          if ((this.flecha.positionx !== x || this.flecha.positiony !== y) && x === this.selectedUnit.stats.position.positionx ){
            if (y < this.selectedUnit.stats.position.positiony){
              
             
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowup');
            }

            else if (y > this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowdown');

            }
          }
          else if ((this.flecha.positionx !== x || this.flecha.positiony !== y) && (x > this.selectedUnit.stats.position.positionx ) ){
            if (y === this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowright');

            }
            else if (y < this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowupright');

            }
            else if (y > this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowdownright');

            }

          }

          else if ((this.flecha.positionx !== x || this.flecha.positiony !== y) && x < this.selectedUnit.stats.position.positionx ){
            if (y === this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowleft');

            }
            else if (y < this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowupleft');

            }
            else if (y > this.selectedUnit.stats.position.positiony){
              if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
              this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowdownleft');

            }
          }
        }
    }
}*/

//----------------------------MENUS----------------------------------

  movementMenuSelected(){
    if (!this.stats.moving){
      console.log("Menu movimiento seleccionado");

      this.scene.mouseController = false;

      this.scene.usingMenu = false;
      this.menuOpciones.active = false;

      this.disableMenuOptions();    

      this.stats.moving = true;
    }
    
  }

  buildMenuSelected(){
    if (!this.menuBuilding.active){
      console.log("Menu construccion defensas seleccionado");

      this.scene.mouseController = false;
      this.scene.usingMenu = true;

      this.disableMenuOptions();

      this.menuBuilding.canonImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset + 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset - 55, 'arrowMenu').setScale(2.5).setInteractive();
      this.menuBuilding.mortarImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset + 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset + 55, 'arrowMenu').setScale(2.5).setInteractive();
      this.menuBuilding.archerTowerImage = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset - 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset + 55, 'arrowMenu').setScale(2.5).setInteractive();
      this.menuBuilding.quarter = this.scene.add.image(this.stats.position.positionx * this.scene.squareSize + this.scene.offset - 55, this.stats.position.positiony*this.scene.squareSize + this.scene.offset - 55, 'arrowMenu').setScale(2.5).setInteractive();

      this.menuBuilding.active = true;
    }
    
  }

  resourcesMenuSelected(){
    console.log("Menu construccion recursos seleccionado");
    this.scene.mouseController = false;
    this.scene.usingMenu = false;

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