import Tablero from "./Tablero.js";
import Estructura from "./Estructura.js";
import Unidad from "./Unidad.js";
import Trabajador from "./Trabajador.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.squareSize = 100;
    this.offset = 150;
    this.anchoMundo = 11;
    this.altoMundo = 11;
    this.numEstructurasRecursos = 2;
  }

  preload() {  
    this.loadImages();
    
  }

  create() {

      this.input.mouse.disableContextMenu();

      this.tablero = new Tablero(this);

      this.tablero.printTablero();

      this.workers = [];

      this.mouse = this.input.activePointer;
     

      //-------------------------Trabajadora de prueba ||DEBUG||----
      this.workers.push(new Trabajador(this, 5, 5));
      this.tablero.casillas[5][5].stats.unit = this.workers[this.workers.length-1]
      this.printWorkers();
      //------------------------------------------------------------

      this.selectedUnit = undefined;

      this.flecha ={
        positionx : undefined,
        positiony : undefined,
        exists : false,
        image: undefined
      }

      

  }

  update(time, delta) {
      


    this.checkForSelection();

    this.processSelection();

    //this.printArrow(); 

    //this.moveSelected();
      
      

  }


//--------------------------METODOS------------------------------------------

  loadImages(){
      //Casillas
      this.loadCasillas();
      
      //Unidad(es)
      this.load.image('worker',' assets/imagenes/worker.png' );
      this.load.image('workerSelected',' assets/imagenes/workerSelected.png' );

      //Menus
      this.load.image('arrowMenu', ' assets/imagenes/MenuFlecha.png');
  }

  loadCasillas(){
      //Tipos de casilla
      this.load.image('casilla', 'assets/imagenes/Casilla.png');
      this.load.image('casillaRed', 'assets/imagenes/CasillaRed.png');
      this.load.image('casillaBlue', 'assets/imagenes/CasillaBlue.png');
      this.load.image('casillaForest', 'assets/imagenes/CasillaForest.png');
      this.load.image('casillaSuperForest', 'assets/imagenes/CasillaSuperForest.png');
      this.load.image('casillaMountain', 'assets/imagenes/CasillaMountain.png');
      this.load.image('casillaSuperMountain', 'assets/imagenes/CasillaSuperMountain.png');
      this.load.image('arrowleft', 'assets/imagenes/arrowleft.png');
      this.load.image('arrowup', 'assets/imagenes/arrowup.png');
      this.load.image('arrowdown', 'assets/imagenes/arrowdown.png');
      this.load.image('arrowright', 'assets/imagenes/arrowright.png');
      this.load.image('arrowupright', 'assets/imagenes/arrowupright.png');
      this.load.image('arrowdownright', 'assets/imagenes/arrowdownright.png');
      this.load.image('arrowupleft', 'assets/imagenes/arrowupleft.png');
      this.load.image('arrowdownleft', 'assets/imagenes/arrowdownleft.png');
  }
    
  checkForSelection(){
    if(this.mouse.leftButtonDown()){

      let x = Math.floor(this.mouse.worldX/this.squareSize -1);
      let y = Math.floor(this.mouse.worldY/this.squareSize -1);

      if (x>= 0 && x <= this.anchoMundo - 1 && y >= 1 && y <= this.altoMundo - 2 && this.tablero.casillas[y][x].stats.unit !== this.selectedUnit){

        if (this.selectedUnit !== undefined) this.selectedUnit.unselected();    //OJO

        this.selectedUnit = this.tablero.casillas[y][x].stats.unit;
        // else{
        //   this.selected = undefined;
        //   this.flecha.image.destroy();
        // }
      }
    }
    else if(this.mouse.rightButtonDown()){

      if (this.selectedUnit !== undefined) this.selectedUnit.unselected();

      this.selectedUnit = undefined;
      //this.flecha.image.destroy();
    }
  }

  moveSelected(){
    if (this.selectedUnit !== undefined && this.mouse.leftButtonDown()){
      //mover unidad seleccionada
      let x = Math.floor(this.mouse.worldX/this.squareSize -1);
      let y = Math.floor(this.mouse.worldY/this.squareSize -1);

      if (x < this.anchoMundo && x >= 0 && y >= 0 && y < this.altoMundo)
      this.selectedUnit.move(x,y);
      
    }
  }

  // printTablero(){
  //   this.tablero.printTablero();
  // }

  printArrow(){
      if (this.selectedUnit !== undefined){
        let x = Math.floor(this.mouse.worldX/this.squareSize -1);
        let y = Math.floor(this.mouse.worldY/this.squareSize -1);
        if (x>= 0 && x <= this.anchoMundo - 1 && y >= 1 && y <= this.altoMundo - 2){

          //Pintar flecha de casilla a la que mover

          if(this.tablero.casillas[y][x].stats.exists === true && this.tablero.casillas[y][x].stats.type !== 'mountain' &&  this.tablero.casillas[y][x].stats.type !== 'superMountain'&&
          Math.abs(x-this.selectedUnit.stats.position.positionx) <= 1 && Math.abs(y-this.selectedUnit.stats.position.positiony) <= 1){

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

      }
  }


  //Esto se usa una vez. Solo utilizar en debug. Mala idea.
  printWorkers(){
      for (let i = 0; i < this.workers.length; i++){
        this.workers[i].stats.image = this.add.image(this.workers[i].stats.position.positionx*this.squareSize + this.offset ,this.workers[i].stats.position.positiony*this.squareSize + this.offset ,'worker');
      }
  }

  processSelection(){
    if (this.selectedUnit !== undefined ){
      switch(this.selectedUnit.stats.type){
        case 'Trabajador':
          this.selectedUnit.selected('arrowMenu', 'arrowMenu', 'arrowMenu');
          break;
      }
    }
  }

}