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
import Mortar from "./Estructuras/morterto.js"
import Player from "./Player.js"
import MenuPasarTurno from "./Menus/menuPasarTurno.js";
import MenuNewWorker from "./Menus/menuNewWorker.js";

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

    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    //Estructuras
    this.load.image('redCannon', 'assets/imagenes/redCannon.png');
    this.load.image('blueCannon', 'assets/imagenes/blueCannon.png');
    this.load.image('blueMortar', 'assets/imagenes/blueMortar.png');
    this.load.image('redMortar', 'assets/imagenes/redMortar.png');
    this.load.image('blueTower', 'assets/imagenes/blueTower2.png');
    this.load.image('redTower', 'assets/imagenes/redTower2.png');
    this.load.image('redFlag', 'assets/imagenes/redFlag.png');
    this.load.image('blueFlag', 'assets/imagenes/blueFlag.png');

    this.load.image('redHQ', 'assets/imagenes/redHQ.png');
    this.load.image('blueHQ', 'assets/imagenes/blueHQ.png');

      
    //Unidad(es)
    this.load.image('redWorker',' assets/imagenes/worker.png' );
    this.load.image('blueWorker',' assets/imagenes/BlueWorker.png' );
    this.load.image('workerSelected',' assets/imagenes/workerSelected.png' );


    //Azules
    this.load.image('blueArcher', 'assets/imagenes/BlueArcher.png');
    this.load.image('blueTank', 'assets/imagenes/BlueTank.png');
    this.load.image('blueSoldier', 'assets/imagenes/BlueSoldier.png');


    //Rojos
    this.load.image('redTank', 'assets/imagenes/RedTank.png');
    this.load.image('redSoldier', 'assets/imagenes/RedSoldier.png');
    this.load.image('redArcher', 'assets/imagenes/RedArcher.png');


    //Menus
    this.load.image('movingMenu', 'assets/imagenes/MovingMenu.png');
    this.load.image('constructionMenuAv', 'assets/imagenes/MenuConstructionAv.png');
    this.load.image('constructionMenuUnav', 'assets/imagenes/MenuConstructionUnav.png');
    this.load.image('factoryMenuAv', 'assets/imagenes/FactoryMenuAvailable.png');
    this.load.image('factoryMenuUnav', 'assets/imagenes/FactoryMenuUnavailable.png');
    this.load.image('HQMenuAv', 'assets/imagenes/menuHQAv.png');
    this.load.image('HQMenuUnav', 'assets/imagenes/menuHQUnav.png');
    this.load.image('bowMenu', 'assets/imagenes/bowMenu.png');
    this.load.image('knightMenu', 'assets/imagenes/knightMenu.png');
    this.load.image('soldierMenu', 'assets/imagenes/soldierMenu.png');

    this.load.image('nextTurn', 'assets/imagenes/NextTurn.png')

    this.load.image('healthBar', 'assets/imagenes/health.png');
    this.load.image('blueHealthBar', 'assets/imagenes/blueHealth.png');

    this.load.image('blueHealthBase', 'assets/imagenes/blueHealthBase.png');
    this.load.image('redHealthBase', 'assets/imagenes/redHealthBase.png');
    
    this.load.image('blured2', 'assets/imagenes/blured2.png');



    this.load.image('cannonMenu', 'assets/imagenes/cannonMenu.png');
    this.load.image('towerMenu', 'assets/imagenes/towerMenu.png');
    this.load.image('mortarMenu', 'assets/imagenes/mortarMenu.png');

    this.load.image('blueTurn', 'assets/imagenes/blueTurn.png');
    this.load.image('redTurn', 'assets/imagenes/redTurn.png');

    this.load.image('nextTurnBlue', 'assets/imagenes/nextTurn.png');
    this.load.image('nextTurnRed', 'assets/imagenes/nextTurn.png');



    this.load.image('woodIcon', 'assets/imagenes/WoodIcon.png');
    this.load.image('steelIcon', 'assets/imagenes/steelIcon.png');


    this.load.image('canMove', 'assets/imagenes/canMoveIndicator.png');


    //Seleccion
    this.load.image('selectionIcon', 'assets/imagenes/SelectionIcon.png');
  }

  create() {

      this.add.image(650,650,'blured2').setScale(5);



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

      this.menuHQ = undefined;     

      this.newWorkers = new MenuNewWorker(this);

      this.blueTurnImage = this.add.image(300, 100, 'blueTurn').setScale(0.6);
      this.redTurnImage = this.add.image(300, 100, 'redTurn').setScale(0.6);
      this.blueTurnImage.visible = false;

      this.nextTurnButton = new MenuPasarTurno(this, 50,620)

      
      this.bluePlayer = new Player(this, 'blue');
      this.redPlayer = new Player(this, 'red');
     
     
   

      //TEST DE UNIDADES

      // this.bluePlayer.newUnit(4,4, 'tank', 'upright');
      // this.bluePlayer.newUnit(2,7, 'worker', 'up');

      // this.redPlayer.newUnit(2,3, 'archer', 'downright');
      // this.redPlayer.newUnit(7,6, 'soldier', 'upleft');

      ///////////////////////////////////


      this.KeyN = this.input.keyboard.addKey('N');

      this.blueTurn = false;

      this.redPlayer.Resources.wood = 2;
      this.redPlayer.Resources.steel = 2;
      this.redPlayer.Perturn.wood = 1;
      this.redPlayer.Perturn.steel = 1;

      this.redPlayer.updateResourcesMenus();

      this.bluePlayer.Resources.wood = 2;
      this.bluePlayer.Resources.steel = 2;

      this.bluePlayer.Perturn.wood = 1;
      this.bluePlayer.Perturn.steel = 1;

      this.bluePlayer.updateResourcesMenus();



      this.canPassTurn = true;

  }

  update(time, delta) {

    this.checkMouseInput();

    this.updateMenus();

    //PLAYTEST DE TURNOS 

    if(this.KeyN.isDown && this.pasable){
      this.passTurn();
      this.pasable = false;
  }

    
  if(this.KeyN.isUp){
    this.pasable = true;
  }
    


    //if(this.selection !== undefined) this.selection.onSelected(); //como idea
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
    this.menuMovimiento.updateMenu();
  }

  HQSelected(HQmenu){
    if (this.menuHQ === undefined) this.menuHQ = HQmenu;
    else {
      this.menuHQ.unselected();
      this.menuHQ = HQmenu;
    }
  }

  HQUnselected(){
    this.menuHQ = undefined;
  }

  mueveMenusWorker(unit){
    this.selectionIcon.x = unit.sprite.x;
    this.selectionIcon.y = unit.sprite.y;
    
    this.menuMovimiento.x = unit.sprite.x;
    this.menuMovimiento.y = unit.sprite.y;
    
    this.menuConstruir.x = unit.sprite.x;
    this.menuConstruir.y = unit.sprite.y;
    
    this.menuConstruir.updateMenu();

    this.selectionIcon.visible = true;
    this.menuMovimiento.visible = true;
    this.menuConstruir.visible = true;
  }

  updateMenus(){
    if(this.selection !== undefined){
      this.menuMovimiento.updateMenu();
    }
    if (this.menuHQ !== undefined){
      this.menuHQ.updateMenu();
    }
  }

  checkMouseInput(){
    if (this.mouse.rightButtonDown()){
      this.unselect();
    } 
  }

  unselect(){
    this.selection = undefined;
    this.selectionIcon.visible = false;
    this.menuConstruir.visible = false;
    this.menuMovimiento.visible = false;
    if (this.menuMovimiento.arrowVisible !== undefined)this.menuMovimiento.arrowVisible.visible = false;
    this.menuMovimiento.arrowVisible = undefined;

    if(this.menuHQ !== undefined) {
      this.menuHQ.unselected();
      this.menuHQ = undefined;
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


  passTurn(){

    let player;
    if(this.pasable){
      if(this.blueTurn){
        this.blueTurn = false;
        this.redTurn = false;
        this.redTurnImage.visible = true;
        this.blueTurnImage.visible = false;
        this.unselect();
        player = this.bluePlayer;
        for(let i = 0; i < this.bluePlayer.Units.length; i++){
          this.bluePlayer.Units[i].timesMoved = 0;
        }

      }
      else if(!this.blueTurn){
        this.redTurn = true;
        this.blueTurn = true;
        this.redTurnImage.visible = false;
        this.blueTurnImage.visible = true;
        this.unselect();
        player = this.redPlayer;
        for(let i = 0; i < this.redPlayer.Units.length; i++){
          this.redPlayer.Units[i].timesMoved = 0;
        }
      }
      this.pasable = false;


      //Pasar Unidades
    
      for (let i = 0; i < player.Units.length; i++){
            player.Units[i].passTurn();
           
      }

      for (let i = 0; i < player.Structures.length; i++){
            try{
              player.Structures[i].passTurn();
            }
            catch{}  
      }
      player.passTurn(); 
    }
}
  deleteUnit(owner){
   // let deleted = false;
    let i = 0;
    while(i < owner.Units.length){
        if(owner.Units[i].deleteMe){
          owner.Units.splice(i,1);
          //deleted = true;
        }
        i++;
    }
}
    
  


  deleteStructure(owner){
    //let deleted = false;
      let i = 0;
      while(i < owner.Structures.length){
          if(owner.Structures[i].deleteMe){
            owner.Structures.splice(i,1);
            //deleted = true;
          }
          i++;
      }
    }

  buildStructure(i){
    this.selection.owner.newStructure(i);
  }

  attackBase(player){
    if(player.color === "blue"){
      this.redPlayer.base.recieveDamage();
    }
    else{
      this.bluePlayer.base.recieveDamage();
    }
  }



}