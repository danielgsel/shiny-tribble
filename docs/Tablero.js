import CasillaVacia from "./Casillas/casillaVacia.js";
import CasillaForest from "./Casillas/casillaForest.js";
import CasillaMountain from "./Casillas/casillaMountain.js";
import CasillaSuperForest from "./Casillas/casillaSuperForest.js";
import CasillaSuperMountain from "./Casillas/casillaSuperMountain.js";
import CasillaBlue from "./Casillas/casillaBlue.js";
import CasillaRed from "./Casillas/casillaRed.js";
import CasillaInexistente from "./Casillas/casillaInexistente.js";


export default class Tablero extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene,x,y, 'tablero'); 

      //INICIALIZACIÓN DE TABLERO 
      this.casillas = new Array(this.scene.altoMundo);

      for (let i = 0; i < this.scene.altoMundo; i++){
        this.casillas[i] = new Array(this.scene.anchoMundo);
      }

      //Decide casillas forest (de un lado)
      this.DecideForests();

      //Decide casillas mountain (de un lado)
      this.DecideMountains();

      for (let i = 0; i < this.scene.altoMundo; i++){
        for (let j= 0; j < this.scene.anchoMundo; j++){

          if (( i === 0 && ( j > 2 && j < 8 )) || (i === 1 && ( j > 1 && j < 9)) || (i === 2 && (j > 0 && j < 10))  //"escaleras" parte superior
          || (i >= 3 && i < this.scene.altoMundo - 3) ||                                                                    //Mitad mapa
          (i === this.scene.altoMundo - 3 && (j > 0 && j < this.scene.anchoMundo - 1)) || (i === this.scene.altoMundo - 2 && ( j > 1 && j < this.scene.anchoMundo - 2)) || ( i === this.scene.altoMundo - 1 && ( j > 2 && j < this.scene.anchoMundo - 3 )))  //"escaleras" parte superior
          {
            if (this.casillas[i][j] === undefined) this.casillas[i][j] = new CasillaVacia(scene, i, j);    //crea casilla que existe
          }
          else this.casillas[i][j] = new CasillaInexistente(scene, i, j);  //casilla no existente
        }
      }

      let posX = Math.floor(this.scene.altoMundo / 2);
      let posY = Math.floor(this.scene.anchoMundo / 3);
      this.casillas[posX][posY] = new CasillaSuperForest(scene, x, y);   //SuperForest

      posY = Math.floor((this.scene.anchoMundo / 3) * 2);
      this.casillas[posX][posY] = new CasillaSuperMountain(scene, x, y);  //SuperMountain

      for (let j = 3; j < this.scene.anchoMundo - 3; j++ ){     //BaseRoja
        this.casillas[this.scene.altoMundo - 1][j] = new CasillaRed(scene, this.scene.altoMundo - 1, j);
      }

      for (let j = 3; j < this.scene.anchoMundo - 3; j++ ){     //BaseAzul
        this.casillas[0][j] = new CasillaBlue(scene, 0, j);
      }
      //FIN DE INICIALIZACIÓN

    }

    DecideForests(){    //cambiar fors por whiles!!!!!!!!!!
      //Mitad superior

      for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

        let i = Math.floor(Math.random() * 3) + 1;
        let j = Math.floor(Math.random() * (this.scene.anchoMundo - 1));


        if (this.casillas[i][j] === undefined){ 
          this.casillas[i][j] = new CasillaForest(this.scene, i, j);
        }
        else a--;
      }

      //Mitad inferior
      for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

        let i = (this.scene.altoMundo - 1) - (Math.floor(Math.random() * 3) + 1);
        let j = Math.floor(Math.random() * (this.scene.anchoMundo - 1));

        if (this.casillas[i][j] === undefined){ 
          this.casillas[i][j] = new CasillaForest(this.scene, i, j);
        }
        else a--;
      }

    }

    DecideMountains(){

      //Mitad superior
      for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

        let i = Math.floor(Math.random() * 3) + 1;
        let j = Math.floor(Math.random() * (this.scene.anchoMundo - 1));

        if (this.casillas[i][j] === undefined){
          this.casillas[i][j] = new CasillaMountain(this.scene, i, j);
        }
        else a--;
      }


      //Mitad inferior
      for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

        let i = (this.scene.altoMundo - 1) - (Math.floor(Math.random() * 3) + 1);
        let j = Math.floor(Math.random() * (this.scene.anchoMundo - 1));

        if (this.casillas[i][j] === undefined){
          this.casillas[i][j] = new CasillaMountain(this.scene, i, j);
        }
        else a--;
      }
    }

    printTablero(){
      for (let i = 0; i < this.scene.altoMundo; i++){
        for (let j = 0; j < this.scene.anchoMundo; j++){
          //Dibujar la casilla dependiendo de su tipo
          let squareSize = this.scene.squareSize;
          let offset = this.scene.offset;

          this.casillas[i][j].print(j*squareSize + offset ,i*squareSize + offset, j*squareSize + offset ,i*squareSize + offset);

            /*switch(this.casillas[i][j].stats.type){
              case 'empty':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casilla');
                  break;
              case 'forest':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaForest');
                  break;
              case 'superForest':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperForest');
                  break;
              case 'mountain':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaMountain');
                  break;
              case 'superMountain':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperMountain');
                  break;
              case 'blueBase':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaBlue');
                  break;
              case 'redBase':
                this.casillas[i][j].stats.image = this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaRed');
                  break;
            }*/
          }
        }

      }

    /*printCasilla(i, j){
      let squareSize = this.scene.squareSize;
      let offset = this.scene.offset;

      switch(this.tablero.casillas[i][j].stats.type){
        case 'empty':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casilla');
            break;
        case 'forest':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaForest');
            break;
        case 'superForest':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperForest');
            break;
        case 'mountain':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaMountain');
            break;
        case 'superMountain':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperMountain');
            break;
        case 'blueBase':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaBlue');
            break;
        case 'redBase':
            this.scene.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaRed');
            break;
      }

    }*/


}