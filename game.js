import Tablero from "./Tablero.js";
import Estructura from "./Estructura.js";
import Unidad from "./Unidad.js";
import Trabajador from "./Trabajador.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.squareSize = 100;
    this.offset = 150;
  }

  preload() {  
    this.loadImages();
    
  }

  create() {

      this.input.mouse.disableContextMenu();

      this.tablero = new Tablero(this);

      this.printTablero();

      this.workers = [];

      this.mouse = this.input.activePointer;
     

      //Trabajadora de prueba
      this.workers.push(new Trabajador(this, 5, 4));
      this.tablero.casillas[4][5].stats.unit = this.workers[this.workers.length-1]
      this.printWorkers();

      //

      this.selected = undefined;
      this.flecha ={
        positionx : undefined,
        positiony : undefined,
        exists : false,
        image: undefined
      }

      

  }

  update(time, delta) {
      
      this.moveSelected();

      this.checkForSelection();
      
      this.printArrow();   

    }

    loadImages(){
      //Casillas
      this.loadCasillas();
      
      //Unidad(es)
      this.load.image('worker',' assets/imagenes/worker.png' );
      this.load.image('workerSelected',' assets/imagenes/workerSelected.png' );
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
        if (x>= 0 && x <= 10 && y >= 1 && y <= 7){
            if(this.tablero.casillas[y][x].stats.unit !== undefined){
              this.tablero.casillas[y][x].stats.unit.stats.selected = true;
              this.selected = this.tablero.casillas[y][x].stats.unit;

              this.selected.stats.image.destroy();
              this.selected.stats.image = this.add.image(this.selected.stats.position.positionx*this.squareSize + this.offset ,this.selected.stats.position.positiony*this.squareSize + this.offset ,'workerSelected');

            }
            // else{
            //   this.selected = undefined;
            //   this.flecha.image.destroy();
            // }

        }
      }
      if(this.mouse.rightButtonDown()){

        if (this.selected !== undefined){
        this.selected.stats.image.destroy();
        this.selected.stats.image = this.add.image(this.selected.stats.position.positionx*this.squareSize + this.offset ,this.selected.stats.position.positiony*this.squareSize + this.offset ,'worker');
      }
        this.selected = undefined;
        this.flecha.image.destroy();


      }

    }

    moveSelected(){
      if (this.selected !== undefined){
        let x = Math.floor(this.mouse.worldX/this.squareSize -1);
        let y = Math.floor(this.mouse.worldY/this.squareSize -1);
        //mover unidad seleccionada
        if(this.mouse.leftButtonDown()){
          if(this.tablero.casillas[y][x].stats.exists === true && this.tablero.casillas[y][x].stats.type !== 'mountain' &&  this.tablero.casillas[y][x].stats.type !== 'superMountain'&&
          Math.abs(x-this.selected.stats.position.positionx) <= 1 && Math.abs(y-this.selected.stats.position.positiony) <= 1){
          if (x>= 0 && x <= 10 && y >= 1 && y <= 7){
              if(this.tablero.casillas[y][x].stats.unit === undefined){
                this.selected.stats.image.destroy();
                this.tablero.casillas[this.selected.stats.position.positiony][this.selected.stats.position.positionx].stats.unit = undefined;
                this.tablero.casillas[y][x].stats.unit = this.selected;

                //this.printCasilla(this.selected.stats.position.positiony, this.selected.stats.position.positionx);
                

                this.selected.stats.position.positionx = x;
                this.selected.stats.position.positiony = y;
                this.selected.stats.image.destroy();

                this.selected.stats.image = this.add.image(this.selected.stats.position.positionx*this.squareSize + this.offset ,this.selected.stats.position.positiony*this.squareSize + this.offset ,'worker');



                this.tablero.casillas[y][x].stats.unit.stats.selected = false;
                this.selected = undefined;
                this.flecha.exists = false;
                this.flecha.image.destroy();


                
              }
          }
        }
      }
    }
    }
    printTablero(){
      for (let i = 0; i < 9; i++){
        for (let j = 0; j < 11; j++){
          //Comprobar que la casilla está dentro del tablero
          if (this.tablero.casillas[i][j].stats.exists){
            //Dibujar la casilla dependiendo de su tipo
            let squareSize = this.squareSize;
            let offset = this.offset;
            switch(this.tablero.casillas[i][j].stats.type){
              case 'empty':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casilla');
                  break;
              case 'forest':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaForest');
                  break;
              case 'superForest':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperForest');
                  break;
              case 'mountain':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaMountain');
                  break;
              case 'superMountain':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperMountain');
                  break;
              case 'blueBase':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaBlue');
                  break;
              case 'redBase':
                this.tablero.casillas[i][j].stats.image = this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaRed');
                  break;
            }
          }

        }
      }

    }

    printArrow(){
      if (this.selected !== undefined){
        let x = Math.floor(this.mouse.worldX/this.squareSize -1);
        let y = Math.floor(this.mouse.worldY/this.squareSize -1);
        if (x>= 0 && x <= 10 && y >= 1 && y <= 7){

          //Pintar flecha de casilla a la que mover

          if(this.tablero.casillas[y][x].stats.exists === true && this.tablero.casillas[y][x].stats.type !== 'mountain' &&  this.tablero.casillas[y][x].stats.type !== 'superMountain'&&
          Math.abs(x-this.selected.stats.position.positionx) <= 1 && Math.abs(y-this.selected.stats.position.positiony) <= 1){

            if ((this.flecha.positionx !== x || this.flecha.positiony !== y) && x === this.selected.stats.position.positionx ){
              if (y < this.selected.stats.position.positiony){
                
                // this.deleteFlecha();
                // this.flecha.positionx = x;
                // this.flecha.positiony = y;
                // this.flecha.exists = true;
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowup');
              }

              else if (y > this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowdown');

              }
            }
            else if ((this.flecha.positionx !== x || this.flecha.positiony !== y) && (x > this.selected.stats.position.positionx ) ){
              if (y === this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowright');

              }
              else if (y < this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowupright');

              }
              else if (y > this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowdownright');

              }

            }

            else if ((this.flecha.positionx !== x || this.flecha.positiony !== y) && x < this.selected.stats.position.positionx ){
              if (y === this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowleft');

              }
              else if (y < this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowupleft');

              }
              else if (y > this.selected.stats.position.positiony){
                if (this.flecha.image !== undefined) {this.flecha.image.destroy();}
                this.flecha.image = this.add.image(x*this.squareSize + this.offset ,y*this.squareSize + this.offset ,'arrowdownleft');

              }

            }
          }
        }

      }
    }

    // deleteArrow(){
    //   if(this.flecha.exists){
    //     this.printCasilla(this.flecha.positiony,this.flecha.positionx);
    //   }
    // }

    printWorkers(){
      for (let i = 0; i < this.workers.length; i++){
        this.workers[i].stats.image = this.add.image(this.workers[i].stats.position.positionx*this.squareSize + this.offset ,this.workers[i].stats.position.positiony*this.squareSize + this.offset ,'worker');
      }
    }


    printCasilla(i, j){
      let squareSize = this.squareSize;
            let offset = this.offset;

      switch(this.tablero.casillas[i][j].stats.type){
        case 'empty':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casilla');
            break;
        case 'forest':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaForest');
            break;
        case 'superForest':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperForest');
            break;
        case 'mountain':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaMountain');
            break;
        case 'superMountain':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperMountain');
            break;
        case 'blueBase':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaBlue');
            break;
        case 'redBase':
            this.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaRed');
            break;
      }

    }
    


}