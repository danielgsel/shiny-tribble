import Tablero from "./Tablero.js";
import Estructura from "./Estructura.js";
import Unidad from "./Unidades/Unidad.js";
import Trabajador from "./Unidades/Trabajador.js";

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
    //Casillas
    this.loadCasillas();
      
    //Unidad(es)
    this.load.image('worker',' assets/imagenes/worker.png' );
    this.load.image('workerSelected',' assets/imagenes/workerSelected.png' );

    //Menus
    this.load.image('movingMenu', 'assets/imagenes/MovingMenu.png');
    this.load.image('constructionMenuAv', 'assets/imagenes/MenuConstructionAv.png');
    this.load.image('constructionMenuUnav', 'assets/imagenes/MenuConstructionUnav.png');
    this.load.image('factoryMenuAv', 'assets/imagenes/FactoryMenuAvailable.png');
    this.load.image('factoryMenuUnav', 'assets/imagenes/FactoryMenuUnavailable.png');
    
    //Seleccion
    this.load.image('selectionIcon', 'assets/imagenes/SelectionIcon.png');
  }

  create() {

      this.input.mouse.disableContextMenu();
      this.mouse = this.input.activePointer;
      this.mouseAvaliable = true;
      this.input.on('pointerup', pointer => {if (pointer.leftButtonReleased()) {this.mouseAvaliable = true;} });

      this.tablero = new Tablero(this, 0, 0);
      this.tablero.printTablero();

      this.selectedUnit = undefined;
      this.selectionIcon = this.add.image(0, 0, 'selectionIcon').setScale(1.3);
      this.selectionIcon.visible = false;

      this.workers = [];
      this.workers.push(new Trabajador(this, 5, 1));
      this.workers.push(new Trabajador(this, 5, 7));
      this.tablero.casillas[5][5].OccupiedBy = this.workers[0];
      
      /*
      this.flecha ={
        positionx : undefined,
        positiony : undefined,
        exists : false,
        image: undefined
      }
      
      //-------------------------Trabajadora de prueba ||DEBUG||----
      this.workers.push(new Trabajador(this, 5, 5));
      this.tablero.casillas[5][5].stats.unit = this.workers[this.workers.length-1]
      this.printWorkers();
      //------------------------------------------------------------
      */
  }

  update(time, delta) {

    this.checkMouseInput();

    if(this.selectedUnit !== undefined) this.selectedUnit.onSelected();
    //this.processSelection();

  }


//--------------------------METODOS------------------------------------------
  
  loadCasillas(){
      //Tipos de casilla
      this.load.image('casilla', 'assets/imagenes/Casilla.png');
      this.load.image('casillaRed', 'assets/imagenes/CasillaRed.png');
      this.load.image('casillaBlue', 'assets/imagenes/CasillaBlue.png');
      this.load.image('casillaForest', 'assets/imagenes/CasillaForest.png');
      this.load.image('casillaSuperForest', 'assets/imagenes/CasillaSuperForest.png');
      this.load.image('casillaMountain', 'assets/imagenes/CasillaMountain.png');
      this.load.image('casillaSuperMountain', 'assets/imagenes/CasillaSuperMountain.png');
      this.load.image('casillaInexistente', 'assets/imagenes/CasillaInexistente.png');

      //Arrows
      this.load.image('arrowleft', 'assets/imagenes/arrowleft.png');
      this.load.image('arrowup', 'assets/imagenes/arrowup.png');
      this.load.image('arrowdown', 'assets/imagenes/arrowdown.png');
      this.load.image('arrowright', 'assets/imagenes/arrowright.png');
      this.load.image('arrowupright', 'assets/imagenes/arrowupright.png');
      this.load.image('arrowdownright', 'assets/imagenes/arrowdownright.png');
      this.load.image('arrowupleft', 'assets/imagenes/arrowupleft.png');
      this.load.image('arrowdownleft', 'assets/imagenes/arrowdownleft.png');
  }

  unitSelected(unit){
    if(this.selectedUnit !== undefined) this.selectedUnit.unselected();
    this.selectedUnit = unit;

    //Mueve el icono de seleccion hacia el objetivo y lo hace visible
    this.selectionIcon.x = unit.sprite.x;
    this.selectionIcon.y = unit.sprite.y;
    this.selectionIcon.visible = true;
  }

  checkMouseInput(){

    /*if(this.mouse.leftButtonDown() && this.mouseAvaliable){

      let x = Math.floor(this.mouse.worldX/this.squareSize - 1);
      let y = Math.floor(this.mouse.worldY/this.squareSize - 1);

      if (x >= 0 && x < this.anchoMundo && y >= 0 && y < this.altoMundo && this.tablero[x][y] !== undefined){

        if (this.selectedUnit !== undefined) this.selectedUnit.unselected();    //OJO solo los constructores tienen unselect() de momento

        this.selectedUnit = this.tablero.casillas[y][x].OccupiedBy;
      }
      this.mouseAvaliable = false;
    }
    else if(this.mouse.rightButtonDown()){

      if (this.selectedUnit !== undefined) this.selectedUnit.unselected();  //Mas de lo mismo que arriba

      this.selectedUnit = undefined;
    }*/

    if (this.mouse.rightButtonDown()){
      console.log("yay");
      if(this.selectedUnit !== undefined) this.selectedUnit.unselected();
      this.selectedUnit = undefined;
      this.selectionIcon.visible = false;
    } 

  }

  processSelection(){
    if (this.selectedUnit !== undefined ){
      switch(this.selectedUnit.stats.type){
        case 'Trabajador':
          if (!this.selectedUnit.stats.selected){
            this.selectedUnit.selected();
          }
          else if (this.selectedUnit.stats.moving){
            this.printArrow(); 
            this.moveSelected();
          }
        break;
      }
    }
  }

  moveSelected(){
    if (this.selectedUnit !== undefined && this.mouse.leftButtonDown() && this.mouseAvaliable){
      //mover unidad seleccionada
      let x = Math.floor(this.mouse.worldX/this.squareSize -1);
      let y = Math.floor(this.mouse.worldY/this.squareSize -1);

      if (x < this.anchoMundo && x >= 0 && y >= 0 && y < this.altoMundo)
      this.selectedUnit.move(x,y);
      
      this.mouseAvaliable = false;
    }
  }

  // printTablero(){
  //   this.tablero.printTablero();
  // }

  //Esto se usa una vez. Solo utilizar en debug. Mala idea.
  printWorkers(){
    for (let i = 0; i < this.workers.length; i++){
      this.workers[i].stats.image = this.add.image(this.workers[i].stats.position.positionx*this.squareSize + this.offset ,this.workers[i].stats.position.positiony*this.squareSize + this.offset ,'worker');
    }
  }
}