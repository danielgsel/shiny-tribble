import Casilla from "./Casilla.js";

export default class Tablero extends Phaser.GameObjects.Sprite {
    constructor(scene) {
      let x = 0, y = 0; 

      super(scene,x,y, 'tablero'); 

      this.game = scene;

      //INICIALIZACIÓN DE TABLERO (NO INTENTAR COMPRENDER SI NO QUIERES QUE TE DUELA LA CABEZA)
      this.casillas = new Array(this.game.altoMundo);

      for (let i = 0; i < this.game.altoMundo; i++){
        
          this.casillas[i] = new Array(this.game.anchoMundo);
        
      }
      for (let i = 0; i < this.game.altoMundo; i++){
        for (let j= 0; j < this.game.anchoMundo; j++){

          if (( i === 0 && ( j > 2 && j < 8 )) || (i === 1 && ( j > 1 && j < 9)) || (i === 2 && (j > 0 && j < 10))  //"escaleras" parte superior
          || (i >= 3 && i < this.game.altoMundo - 3) ||                                                                    //Mitad mapa
          (i === this.game.altoMundo - 3 && (j > 0 && j < this.game.anchoMundo - 1)) || (i === this.game.altoMundo - 2 && ( j > 1 && j < this.game.anchoMundo - 2)) || ( i === this.game.altoMundo - 1 && ( j > 2 && j < this.game.anchoMundo - 3 )) )    //"escaleras" parte inferior
          {
            this.casillas[i][j] = new Casilla(scene, {i,j}, true);    //crea casilla que existe
          }
          else this.casillas[i][j] = new Casilla(scene, {i,j}, false);  //casilla no existente
        }
      }

      //Decide casillas forest (de un lado)
      this.DecideForests();

      //Decide casillas mountain (de un lado)
      this.DecideMountains();

      this.casillas[Math.floor(this.game.altoMundo / 2)][Math.floor(this.game.anchoMundo / 3)].stats.type = 'superForest';   //SuperForest
      this.casillas[Math.floor(this.game.altoMundo / 2)][Math.floor((this.game.anchoMundo / 3) * 2)].stats.type = 'superMountain'; //SuperMountain

      for (let j = 3; j < this.game.anchoMundo - 3; j++ ){     //BaseRoja
        this.casillas[this.game.altoMundo - 1][j].stats.type = 'redBase';
      }

      for (let j = 3; j < this.game.anchoMundo - 3; j++ ){     //BaseAzul
        this.casillas[0][j].stats.type = 'blueBase';
      }

      //FIN DE INICIALIZACIÓN

    }


    DecideForests(){
      //Mitad superior

      for (let a = 0; a < this.game.numEstructurasRecursos; a++ ){

        let i = Math.floor(Math.random() * 3) + 1;
        let j = Math.floor(Math.random() * (this.game.anchoMundo - 1));


        if (this.casillas[i][j].stats.type !== 'forest'){ 

            this.casillas[i][j].stats.type = 'forest';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type);
        }
        else a--;
      }

      //Mitad inferior
      for (let a = 0; a < this.game.numEstructurasRecursos; a++ ){

        let i = (this.game.altoMundo - 1) - (Math.floor(Math.random() * 3) + 1);
        let j = Math.floor(Math.random() * (this.game.anchoMundo - 1));

        if (this.casillas[i][j].stats.type !== 'forest'){ 

            this.casillas[i][j].stats.type = 'forest';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type);
        }
        else {a--;}
      }


    }

    DecideMountains(){

      //Mitad superior
      for (let a = 0; a < this.game.numEstructurasRecursos; a++ ){

        let i = Math.floor(Math.random() * 3) + 1;
        let j = Math.floor(Math.random() * (this.game.anchoMundo - 1));

        if (this.casillas[i][j].stats.type !== 'forest' && this.casillas[i][j].stats.type !== 'mountain' ){

            this.casillas[i][j].stats.type = 'mountain';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type );
        }
        else {
          a--;
        }
      }


      //Mitad inferior
      for (let a = 0; a < this.game.numEstructurasRecursos; a++ ){

        let i = (this.game.altoMundo - 1) - (Math.floor(Math.random() * 3) + 1);
        let j = Math.floor(Math.random() * (this.game.anchoMundo - 1));

        if (this.casillas[i][j].stats.type !== 'forest' && this.casillas[i][j].stats.type !== 'mountain' ){

            this.casillas[i][j].stats.type = 'mountain';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type );
        }
        else {
          a--;
        }
      }
    }


    printTablero(){
      for (let i = 0; i < this.game.altoMundo; i++){
        for (let j = 0; j < this.game.anchoMundo; j++){
          //Comprobar que la casilla está dentro del tablero
          if (this.casillas[i][j].stats.exists){
            //Dibujar la casilla dependiendo de su tipo
            let squareSize = this.game.squareSize;
            let offset = this.game.offset;
            switch(this.casillas[i][j].stats.type){
              case 'empty':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casilla');
                  break;
              case 'forest':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaForest');
                  break;
              case 'superForest':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperForest');
                  break;
              case 'mountain':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaMountain');
                  break;
              case 'superMountain':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperMountain');
                  break;
              case 'blueBase':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaBlue');
                  break;
              case 'redBase':
                this.casillas[i][j].stats.image = this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaRed');
                  break;
            }
          }

        }
      }

    }

    printCasilla(i, j){
      let squareSize = this.game.squareSize;
      let offset = this.game.offset;

      switch(this.tablero.casillas[i][j].stats.type){
        case 'empty':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casilla');
            break;
        case 'forest':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaForest');
            break;
        case 'superForest':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperForest');
            break;
        case 'mountain':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaMountain');
            break;
        case 'superMountain':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaSuperMountain');
            break;
        case 'blueBase':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaBlue');
            break;
        case 'redBase':
            this.game.add.image(j*squareSize + offset ,i*squareSize + offset ,'casillaRed');
            break;
      }

    }

    
}