import Tablero from "./Tablero.js";
import MenuConstruir from "./Menus/menuConstruir.js"
import MenuMovimiento from "./Menus/menuMovimiento.js"
import Player from "./Player.js"
import MenuPasarTurno from "./Menus/menuPasarTurno.js";
import MenuNewWorker from "./Menus/menuNewWorker.js";

const direccion = 'localhost';
const puerto = 8080;
const socket = io('http://' + direccion + ':' + puerto);

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
    this.load.image('redCannon', 'assets/imagenes/redCannon2.png');
    this.load.image('blueCannon', 'assets/imagenes/blueCannon2.png');
    this.load.image('blueMortar', 'assets/imagenes/blueHQ.png');
    this.load.image('redMortar', 'assets/imagenes/redHQ.png');
    this.load.image('blueTower', 'assets/imagenes/blueTower2.png');
    this.load.image('redTower', 'assets/imagenes/redTower2.png');
    this.load.image('redFlag', 'assets/imagenes/redFlag.png');
    this.load.image('blueFlag', 'assets/imagenes/blueFlag.png');

    this.load.image('redHQ', 'assets/imagenes/redHQ2.png');
    this.load.image('blueHQ', 'assets/imagenes/blueHQ2.png');

      
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
      //this.input.addMoveCallback(p, this);

      this.mouseAvaliable = true;
      this.input.on('pointerup', pointer => {if (pointer.leftButtonReleased()) {this.mouseAvaliable = true;} });

      //this.tablero = new Tablero(this, 0, 0);
      this.tablero = undefined;

      this.selection = undefined;
      this.selectionIcon = this.add.image(0, 0, 'selectionIcon').setScale(1.3);
      this.selectionIcon.visible = false;

      this.menuConstruir = new MenuConstruir(this, 0, 0); //Menu 1 Trabajador 
      this.menuConstruir.depth = 1;
      this.menuMovimiento = new MenuMovimiento(this, 0, 0); //Menu flechas Trabajador 
      this.menuMovimiento.depth = 1;

      this.menuHQ = undefined;     

      this.newWorkers = undefined;

      this.blueTurnImage = this.add.image(300, 100, 'blueTurn').setScale(0.6);
      this.redTurnImage = this.add.image(300, 100, 'redTurn').setScale(0.6);
      this.blueTurnImage.visible = false;

      this.nextTurnButton = undefined;

      
      this.bluePlayer = new Player(this, 'blue');
      this.redPlayer = new Player(this, 'red');

      this.KeyN = this.input.keyboard.addKey('N');

      this.blueTurn = false;
      this.myTurn = undefined;
      
      {
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
      }
      
      this.canPassTurn = true;

      this.color = undefined;

      socket.emit('joinedGame');

      socket.on('setColor', color => {
        if (color === 'red'){
          console.log("soy color rojo");
          this.color = color;
        }
        else{
          console.log('soy color azul');
          this.color = color;
        }
      });
      
      socket.on('giveMeBoard', () =>{
        this.tablero = new Tablero(false, undefined, this, 0, 0);
        socket.emit('board', this.tablero.casillasCod);
      });
      
      socket.on('board', board =>{
        this.tablero = new Tablero(true, board, this, 0, 0);
        socket.emit('ready');
      });

      socket.on('startGame', () => {
        this.tablero.printTablero();
        this.newWorkers = new MenuNewWorker(this);
        this.nextTurnButton = new MenuPasarTurno(this, 50,620);
        if (this.color === 'red') {
          this.myTurn = true;
        }
        else{
          this.myTurn = false;
        } 
      });

      socket.on('myTurn', () =>{
        console.log("your turn");
        let player;
        if(this.color === 'red'){
          this.redTurnImage.visible = true;
          this.blueTurnImage.visible = false;
          this.unselect();
          player = this.redPlayer;
          for(let i = 0; i < this.redPlayer.Units.length; i++){
            this.redPlayer.Units[i].timesMoved = 0;
          }
  
        }
        else{
          this.redTurnImage.visible = false;
          this.blueTurnImage.visible = true;
          this.unselect();
          player = this.bluePlayer;
          for(let i = 0; i < this.bluePlayer.Units.length; i++){
            this.bluePlayer.Units[i].timesMoved = 0;
          }
        }

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
        this.myTurn = true;
      });

      socket.on('selection', selection =>{
        this.selection = this.tablero.casillas[selection.x][selection.y].OccupiedBy;
      });

      socket.on('buildStructure', info =>{
        if(this.color === 'red'){
          this.bluePlayer.newStructure(info);
        }
        else{
          this.redPlayer.newStructure(info);
        }
      });

      socket.on('moveWorker', info =>{
        if(this.color === 'red'){
          this.selection.moveWorker(info.x, info.y);
        }
        else{
          this.selection.moveWorker(info.x, info.y);
        }
      });

      socket.on('newWorker', info =>{
        if(this.color === 'red'){
          this.bluePlayer.pushWorker(info.x, info.y);
        }
        else{
          this.redPlayer.pushWorker(info.x, info.y);
        }
      });

      socket.on('newUnit', info =>{
        if(this.color === 'red'){
          this.bluePlayer.newUnit(info.x, info.y, info.unitType, info.direction);
        }
        else{
          this.redPlayer.newUnit(info.x, info.y, info.unitType, info.direction);
        }
      })
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
      this.load.spritesheet('arrowup', 'assets/imagenes/arrowup.png', {
        frameWidth: 44,
        frameHeight: 63
      });

      this.load.spritesheet('arrowupleft', 'assets/imagenes/arrowupleft.png', {
        frameWidth: 50,
        frameHeight: 50
      });
      this.load.spritesheet('arrowupright', 'assets/imagenes/arrowupright.png', {
        frameWidth: 50,
        frameHeight: 50
      });

      this.load.spritesheet('arrowright', 'assets/imagenes/arrowright.png', {
        frameWidth: 50,
        frameHeight: 44
      });

  }

  workerSelected(unit){
    if(this.selection !== undefined) this.selection.unselected();
    this.selection = unit;
    var selection = {
      x : this.selection.position.x,
      y : this.selection.position.y
    };
    socket.emit('selection', selection);

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
    if (this.myTurn){
        socket.emit('passTurn', this.color);
        let player;
        if(this.color === 'red'){
          this.redTurnImage.visible = false;
          this.blueTurnImage.visible = true;
          this.unselect();
          player = this.bluePlayer;
          for(let i = 0; i < this.redPlayer.Units.length; i++){
            this.redPlayer.Units[i].timesMoved = 0;
          }
  
        }
        else{
          this.redTurnImage.visible = true;
          this.blueTurnImage.visible = false;
          this.unselect();
          player = this.redPlayer;
          for(let i = 0; i < this.bluePlayer.Units.length; i++){
            this.bluePlayer.Units[i].timesMoved = 0;
          }
        }

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
        this.myTurn = false;
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

//--------------------------------SERVER------------------------------------>

  newStructure(info){
    socket.emit('newStructure', info);
  }

  newWorker(x, y){
    var info = {
      x : x,
      y : y
    };
    socket.emit('newWorker', info);
  }

  moveWorker(x, y){
    var info = {
      x : x,
      y : y
    };
    socket.emit('moveWorker', info);
  }

  newUnit(x, y, unitType, direction){
    var info = {
      x : x,
      y : y,
      unitType : unitType,
      direction : direction
    };
    socket.emit('newUnit', info);
  }
}