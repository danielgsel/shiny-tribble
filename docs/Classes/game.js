import Tablero from "./Tablero.js";
import Estructura from "./Estructura.js";
import Unidad from "./Unidades/Unidad.js";
import MenuConstruir from "./Menus/menuConstruir.js"
import MenuMovimiento from "./Menus/menuMovimiento.js"
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

      this.selection = undefined;
      this.selectionIcon = this.add.image(0, 0, 'selectionIcon').setScale(1.3);
      this.selectionIcon.visible = false;

      this.menuConstruir = new MenuConstruir(this, 0, 0); //Menu 1 Trabajador
      this.menuMovimiento = new MenuMovimiento(this, 0, 0); //Menu flechas Trabajador

      this.workers = [];
      this.workers.push(new Trabajador(this, 5, 0));
      this.workers.push(new Trabajador(this, 5, 10));
      this.tablero.casillas[5][0].OccupiedBy = this.workers[1];
      this.tablero.casillas[5][10].OccupiedBy = this.workers[0];
  }

  update(time, delta) {

    this.checkMouseInput();

    this.updateMenus();

    if(this.selection !== undefined) this.selection.onSelected(); //como idea

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

  workerSelected(unit){
    if(this.selection !== undefined) this.selection.unselected();
    this.selection = unit;

    //Mueve el icono de seleccion hacia el objetivo y lo hace visible
    this.mueveMenusWorker(unit);
  }

  mueveMenusWorker(unit){
    this.selectionIcon.x = unit.sprite.x;
    this.selectionIcon.y = unit.sprite.y;
    this.selectionIcon.visible = true;

    this.menuMovimiento.x = unit.sprite.x;
    this.menuMovimiento.y = unit.sprite.y;
    this.menuMovimiento.visible = true;

    this.menuConstruir.x = unit.sprite.x;
    this.menuConstruir.y = unit.sprite.y;
    this.menuConstruir.visible = true;
  }

  updateMenus(){
    if(this.selection !== undefined){
      this.menuMovimiento.updateMenu();
      this.menuConstruir.updateMenu();
    }
  }

  checkMouseInput(){
    if (this.mouse.rightButtonDown()){
      if(this.selection !== undefined) this.selection.unselected();
      this.selection = undefined;
      this.selectionIcon.visible = false;
      this.menuConstruir.visible = false;
      this.menuMovimiento.visible = false;
    } 

  }
}