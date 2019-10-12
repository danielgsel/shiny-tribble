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
    //Tipos de casilla
    this.load.image('casilla', 'assets/imagenes/Casilla.png');
    this.load.image('casillaRed', 'assets/imagenes/CasillaRed.png');
    this.load.image('casillaBlue', 'assets/imagenes/CasillaBlue.png');
    this.load.image('casillaForest', 'assets/imagenes/CasillaForest.png');
    this.load.image('casillaSuperForest', 'assets/imagenes/CasillaSuperForest.png');
    this.load.image('casillaMountain', 'assets/imagenes/CasillaMountain.png');
    this.load.image('casillaSuperMountain', 'assets/imagenes/CasillaSuperMountain.png');


    this.load.image('pava',' assets/imagenes/Pava.png' );

  }

  create() {

      this.tablero = new Tablero(this);

      for (let i = 0; i < 9; i++){
        for (let j = 0; j < 11; j++){
          //Comprobar que la casilla está dentro del tablero
          if (this.tablero.casillas[i][j].stats.exists){
            //Dibujar la casilla dependiendo de su tipo
            let squareSize = 100;
            let offset = 150;
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
      }

      this.workers = [];

      this.keyF = this.input.keyboard.addKey('F');
     

  }

  update(time, delta) {

      if(this.keyF.isDown) {

        this.workers.push(new Trabajador(this, 3, 3));
      };


      for (let i = 0; i < this.workers.length; i++){
        this.add.image(this.workers[i].stats.position.positionx*this.squareSize + this.offset ,this.workers[i].stats.position.positiony*this.squareSize + this.offset ,'pava');
      }

      //this.add.image(this.worker.stats.position.positionx*this.squareSize + this.offset ,this.worker.stats.position.positiony*this.squareSize + this.offset ,'pava');


  }
}