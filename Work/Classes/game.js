import Tablero from "./Tablero.js";
import Estructura from "./Estructuras/Estructura.js";
import Unidad from "./Unidades/Unidad.js";
import MenuConstruir from "./Menus/menuConstruir.js"
import MenuMovimiento from "./Menus/menuMovimiento.js"
import Trabajador from "./Unidades/Trabajador.js";
import Archer from "./Unidades/Atacantes/Archer.js";
import Tank from "./Unidades/Atacantes/Tank.js"
import Soldier from "./Unidades/Atacantes/Soldier.js"
import Cannon from "./Estructuras/Cannon.js"
import Tower from "./Estructuras/Torre.js"
import Mortar from "./Estructuras/Morterto.js"

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

    //Estructuras
    this.load.image('redCannon', 'assets/imagenes/redCannon.png');
    this.load.image('blueCannon', 'assets/imagenes/blueCannon.png');
    this.load.image('blueMortar', 'assets/imagenes/blueMortar.png');
    this.load.image('redMortar', 'assets/imagenes/redMortar.png');
    this.load.image('blueTower', 'assets/imagenes/blueTower.png');
    this.load.image('redTower', 'assets/imagenes/redTower.png');
      
    //Unidad(es)
    this.load.image('worker',' assets/imagenes/worker.png' );
    this.load.image('workerSelected',' assets/imagenes/workerSelected.png' );
    this.load.image('blueArcher', 'assets/imagenes/BlueArcher.png');
    this.load.image('blueTank', 'assets/imagenes/BlueTank.png');
    this.load.image('blueSoldier', 'assets/imagenes/BlueSoldier.png');

    this.load.image('redTank', 'assets/imagenes/RedTank.png');
    this.load.image('redSoldier', 'assets/imagenes/RedSoldier.png');
    this.load.image('redArcher', 'assets/imagenes/RedArcher.png');


    //Menus
    this.load.image('movingMenu', 'assets/imagenes/MovingMenu.png');
    this.load.image('constructionMenuAv', 'assets/imagenes/MenuConstructionAv.png');
    this.load.image('constructionMenuUnav', 'assets/imagenes/MenuConstructionUnav.png');
    this.load.image('factoryMenuAv', 'assets/imagenes/FactoryMenuAvailable.png');
    this.load.image('factoryMenuUnav', 'assets/imagenes/FactoryMenuUnavailable.png');

    this.load.image('nextTurn', 'assets/imagenes/NextTurn.png')

    this.load.image('healthBar', 'assets/imagenes/health.png');
    this.load.image('blueHealthBar', 'assets/imagenes/blueHealth.png');

    this.load.image('cannonMenu', 'assets/imagenes/cannonMenu.png');
    this.load.image('towerMenu', 'assets/imagenes/towerMenu.png');
    this.load.image('mortarMenu', 'assets/imagenes/mortarMenu.png');
    
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
      this.menuConstruir.depth = 1;
      this.menuMovimiento = new MenuMovimiento(this, 0, 0); //Menu flechas Trabajador
      this.menuMovimiento.depth = 1;


      // TEST TRABAJADORES
      // this.workers = [];
      // this.workers.push(new Trabajador(this, 5, 0));
      // this.workers.push(new Trabajador(this, 5, 10, 100, "red"));
      // this.tablero.casillas[5][0].OccupiedBy = this.workers[0];
      // this.tablero.casillas[5][10].OccupiedBy = this.workers[0];
      

      //TEST DE UNIDADES


      //Esta manera de inicializar cosas es un puto lio, pero es porque es test
      //Cuando los generemos correctamente en la creacion in - game serán parametros y será automático

      //azules
      this.blueUnits = [];
      this.blueUnits.push(new Tank(this, 4,4,100, "blueTank", "down", "blue"));
      this.tablero.casillas[4][4].OccupiedBy = this.blueUnits[0];

      //rojos
      this.redUnits = [];
      this.redUnits.push(new Tank(this, 6,9,100, "redTank", "up", "red"));
      this.tablero.casillas[6][9].OccupiedBy = this.redUnits[0];


      this.redUnits.push(new Trabajador(this, 6, 10, 50, "red")); //Los trabajadores van en el mismo array que los atacantes para facilitar la destruccion
      this.tablero.casillas[6][10].OccupiedBy = this.redUnits[0];

      this.redUnits.push(new Trabajador(this, 5, 10, 50, "red"));
      this.tablero.casillas[5][10].OccupiedBy = this.redUnits[0];
      

      this.KeyB = this.input.keyboard.addKey('B');
      this.KeyR = this.input.keyboard.addKey('R');

      this.blueTurn = false;
      this.redTurn = false;

      //TEST DE ESTRUCTURAS

      this.blueDefenses = [];

      this.redDefenses = [];

  }

  update(time, delta) {

    this.checkMouseInput();

    this.updateMenus();

    //PLAYTEST DE TURNOS 
    {
    if(this.KeyR.isDown&& !this.redTurn)  {
      this.passTurn("red");
      this.redTurn = true
     
    }
    if(this.KeyB.isDown&& !this.blueTurn)  {
      this.passTurn("blue");
      this.blueTurn = true
     
    }

    if(this.KeyR.isUp){
      this.redTurn = false;
    }
    if(this.KeyB.isUp){
      this.blueTurn = false;
    }
    }

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

    this.menuConstruir.updateMenu();
  }

  updateMenus(){
    if(this.selection !== undefined){
      this.menuMovimiento.updateMenu();
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

  moveSelected(){
    if (this.selection !== undefined && this.mouse.leftButtonDown() && this.mouseAvaliable){
      //mover unidad seleccionada
      let x = Math.floor(this.mouse.worldX/this.squareSize -1);
      let y = Math.floor(this.mouse.worldY/this.squareSize -1);

      if (x < this.anchoMundo && x >= 0 && y >= 0 && y < this.altoMundo)
      this.selection.move(x,y);
      
      this.mouseAvaliable = false;
    }
  }

  //Esto se usa una vez. Solo utilizar en debug. Mala idea.
  printWorkers(){
    for (let i = 0; i < this.workers.length; i++){
      this.workers[i].stats.image = this.add.image(this.workers[i].stats.position.positionx*this.squareSize + this.offset ,this.workers[i].stats.position.positiony*this.squareSize + this.offset ,'worker');
    }
  }


  //Estoy haciendolo con el blueUnits por defecto, habria que recibir quien pasa el turno para mover sus unidades, no las del contrincante
  passTurn(player){
    if(player === "blue"){
      for (let i = 0; i < this.blueUnits.length; i++){
        this.blueUnits[i].passTurn();
      }

      for (let i = 0; i < this.blueDefenses.length; i++){
        this.blueDefenses[i].passTurn();
      }
    }
    else if(player === "red"){
      for (let i = 0; i < this.redUnits.length; i++){
        this.redUnits[i].passTurn();
      }

      for (let i = 0; i < this.redDefenses.length; i++){
        this.redDefenses[i].passTurn();
      }
    }
    
  }

  deleteUnit(owner){
    if(owner === "red"){
      let deleted = false;
      let i = 0;
      while(i < this.redUnits.length && !deleted){
        if(this.redUnits[i].deleteMe){
          this.redUnits.splice(i,1);
          deleted = true;
        }
        i++;
      }
    }
    else{
      let deleted = false;
      let i = 0;
      while(i < this.blueUnits.length && !deleted){
        if(this.blueUnits[i].deleteMe){
          this.blueUnits.splice(i,1);
          deleted = true;
        }
        i++;
      }
  }
}

buildStructure(i){
  switch(i){
    case 0:   //Cannon
      this.redDefenses.push(new Cannon(this.selection.owner, [this.selection.position.x, this.selection.position.y], 0, 0, this));
      this.tablero.casillas[this.selection.position.x][this.selection.position.y].estructurePlaced = this.blueDefenses[this.blueDefenses.length - 1];
      this.selection.destroyMe();
      break;
    case 1:   //Tower
      this.redDefenses.push(new Tower(this.selection.owner, [this.selection.position.x, this.selection.position.y], 0, 0, this));
      this.tablero.casillas[this.selection.position.x][this.selection.position.y].estructurePlaced = this.blueDefenses[this.blueDefenses.length - 1];
      this.selection.destroyMe();
      break;
    case 2:   //Mortar
      this.redDefenses.push(new Mortar(this.selection.owner, [this.selection.position.x, this.selection.position.y], 0, 0, this));
      this.tablero.casillas[this.selection.position.x][this.selection.position.y].estructurePlaced = this.blueDefenses[this.blueDefenses.length - 1];
      this.selection.destroyMe();
      break;
    case 3:   //Recursos
      
      break;
  }

  this.selectionIcon.visible = false;
  this.menuConstruir.visible = false;
  this.menuMovimiento.visible = false;
}

}