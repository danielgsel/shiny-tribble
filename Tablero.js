import Casilla from "./Casilla.js";

export default class Tablero extends Phaser.GameObjects.Sprite {
    constructor(scene) {

      let x = 0, y = 0;  
      super(scene,x,y, 'tablero');

      //INICIALIZACIÓN DE TABLERO (NO INTENTAR COMPRENDER SI NO QUIERES QUE TE DUELA LA CABEZA)
      this.casillas = new Array(9);

      for (let i = 0; i < 9; i++){
        
          this.casillas[i] = new Array(11);
        
      }
      for (let i = 0; i < 9; i++){
        for (let j= 0; j < 11; j++){

          if (( i === 0 && ( j > 2 && j < 8 )) || (i === 1 && ( j > 1 && j < 9)) || (i === 2 && (j > 0 && j < 10)) 
          || ( i === 3) || i === 4 || i === 5 || 
          (i === 6 && (j > 0 && j < 10)) || (i === 7 && ( j > 1 && j < 9)) || ( i === 8 && ( j > 2 && j < 8 )) )

              this.casillas[i][j] = new Casilla(scene, {i,j}, true);

          else this.casillas[i][j] = new Casilla(scene, {i,j}, false);
        }
      }

      //Decide casillas forest (de un lado)
      this.DecideForests();

      //Decide casillas mountain (de un lado)
      this.DecideMountains();



      this.casillas[4][3].stats.type = 'superForest';
      this.casillas[4][7].stats.type = 'superMountain';

      for (let j = 3; j < 8; j++ ){
        this.casillas[8][j].stats.type = 'redBase';
      }

      for (let j = 3; j < 8; j++ ){
        this.casillas[0][j].stats.type = 'blueBase';
      }



      //FIN DE INICIALIZACIÓN

    }


    DecideForests(){
      //Mitad superior

      for (let a = 0; a < 3; a++ ){

        let i = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        let j = Math.floor(Math.random() * (8 - 2 + 1)) + 2;


        if (this.casillas[i][j].stats.type !== 'forest'){ 

            this.casillas[i][j].stats.type = 'forest';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type);
        }
        else {a--;}
      }

      //Mitad inferior
      for (let a = 0; a < 3; a++ ){

        let i = Math.floor(Math.random() * (7 - 5 + 1)) + 5;
        let j = Math.floor(Math.random() * (8 - 2 + 1)) + 2;


        if (this.casillas[i][j].stats.type !== 'forest'){ 

            this.casillas[i][j].stats.type = 'forest';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type);
        }
        else {a--;}
      }


    }

    DecideMountains(){

      //Mitad superior
      for (let a = 0; a < 3; a++ ){

        let i = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        let j = Math.floor(Math.random() * (8 - 2 + 1)) + 2;

        if (this.casillas[i][j].stats.type !== 'forest' && this.casillas[i][j].stats.type !== 'mountain' ){

            this.casillas[i][j].stats.type = 'mountain';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type );
        }
        else {
          a--;
        }
      }


      //Mitad inferior
      for (let a = 0; a < 3; a++ ){

        let i = Math.floor(Math.random() * (7 - 5 + 1)) + 5;
        let j = Math.floor(Math.random() * (8 - 2 + 1)) + 2;

        if (this.casillas[i][j].stats.type !== 'forest' && this.casillas[i][j].stats.type !== 'mountain' ){

            this.casillas[i][j].stats.type = 'mountain';
            console.log(i + ' ' + j + ' ' + this.casillas[i][j].stats.type );
        }
        else {
          a--;
        }
      }
    }
    
}