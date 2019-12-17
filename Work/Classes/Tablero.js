import CasillaVacia from "./Casillas/casillaVacia.js";
import CasillaForest from "./Casillas/casillaForest.js";
import CasillaMountain from "./Casillas/casillaMountain.js";
import CasillaSuperForest from "./Casillas/casillaSuperForest.js";
import CasillaSuperMountain from "./Casillas/casillaSuperMountain.js";
import CasillaBlue from "./Casillas/casillaBlue.js";
import CasillaRed from "./Casillas/casillaRed.js";
import CasillaInexistente from "./Casillas/casillaInexistente.js";


export default class Tablero extends Phaser.GameObjects.Sprite {
  constructor(copia, tab, scene, x, y) {
    super(scene,x,y, 'tablero'); 

    if(copia){
      this.casillas = new Array(this.scene.anchoMundo);

      for (let i = 0; i < this.scene.altoMundo; i++){
        this.casillas[i] = new Array(this.scene.altoMundo);
      }

      this.copiaTablero(tab);
    }
    else{
      //INICIALIZACIÓN DE TABLERO 
    this.casillas = new Array(this.scene.anchoMundo);
    this.casillasCod = new Array(this.scene.anchoMundo);

    for (let i = 0; i < this.scene.altoMundo; i++){
      this.casillas[i] = new Array(this.scene.altoMundo);
      this.casillasCod[i] = new Array(this.scene.altoMundo);
    }
    
    for (let i = 0; i < this.scene.altoMundo; i++){
      for (let j= 0; j < this.scene.anchoMundo; j++){

        if (( i === 0 && ( j > 2 && j < 8 )) || (i === 1 && ( j > 1 && j < 9)) || (i === 2 && (j > 0 && j < 10))  //"escaleras" parte superior
        || (i >= 3 && i < this.scene.altoMundo - 3) ||                                                                    //Mitad mapa
        (i === this.scene.altoMundo - 3 && (j > 0 && j < this.scene.anchoMundo - 1)) ||
        (i === this.scene.altoMundo - 2 && ( j > 1 && j < this.scene.anchoMundo - 2)) || ( i === this.scene.altoMundo - 1 && ( j > 2 && j < this.scene.anchoMundo - 3 )))  //"escaleras" parte superior
        {
          if (this.casillas[i][j] === undefined){    //crea casilla que existe
            this.casillas[i][j] = new CasillaVacia(scene, x, y);
            this.casillasCod[i][j] = 1;  
          } 
        }
        else{
          this.casillas[i][j] = new CasillaInexistente(scene, x, y); 
          this.casillasCod[i][j] = 0; 
        } 
      }
    }

    //Decide casillas forest (de un lado)
    this.DecideForests();

    //Decide casillas mountain (de un lado)
    this.DecideMountains();

    let posX = Math.floor(this.scene.anchoMundo / 3);
    let posY = Math.floor(this.scene.altoMundo / 2);
    this.casillas[posX][posY] = new CasillaSuperForest(scene, x, y); this.casillasCod[posX][posY] = 3;   //SuperForest

    posX = Math.floor((this.scene.altoMundo / 3) * 2);
    this.casillas[posX][posY] = new CasillaSuperMountain(scene, x, y);  this.casillasCod[posX][posY] = 5; //SuperMountain

    for (let j = 3; j < this.scene.anchoMundo - 3; j++ ){     //BaseRoja
      this.casillas[j][this.scene.altoMundo - 1] = new CasillaRed(scene, x, y); this.casillasCod[j][this.scene.altoMundo - 1] = 6; 
    }

    for (let j = 3; j < this.scene.anchoMundo - 3; j++ ){     //BaseAzul
      this.casillas[j][0] = new CasillaBlue(scene, x, y); this.casillasCod[j][0] = 7; 
    }
    //FIN DE INICIALIZACIÓN
    }
    
  }

  DecideForests(){  
    //Mitad superior

    for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

      let i = Math.floor(Math.random() * (this.scene.anchoMundo - 1));
      let j = Math.floor(Math.random() * 3) + 1;


      if (this.casillas[i][j].inexistente === false && this.casillas[i][j].vacia){ 
        this.casillas[i][j] = new CasillaForest(this.scene, i, j);  this.casillasCod[i][j] = 2; 
      }
      else a--;
    }

    //Mitad inferior
    for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

      let i = Math.floor(Math.random() * (this.scene.anchoMundo - 1));
      let j = (this.scene.altoMundo - 1) - (Math.floor(Math.random() * 3) + 1);

      if (this.casillas[i][j].inexistente === false && this.casillas[i][j].vacia){ 
        this.casillas[i][j] = new CasillaForest(this.scene, i, j);  this.casillasCod[i][j] = 2; 
      }
      else a--;
    }

  }

  DecideMountains(){

    //Mitad superior
    for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

      let i = Math.floor(Math.random() * (this.scene.anchoMundo - 1));
      let j = Math.floor(Math.random() * 3) + 1;

      if (this.casillas[i][j].inexistente === false && this.casillas[i][j].vacia){
        this.casillas[i][j] = new CasillaMountain(this.scene, i, j);  this.casillasCod[i][j] = 4; 
      }
      else a--;

      
    }


    //Mitad inferior
    for (let a = 0; a < this.scene.numEstructurasRecursos; a++ ){

      let i = Math.floor(Math.random() * (this.scene.anchoMundo - 1));
      let j = (this.scene.altoMundo - 1) - (Math.floor(Math.random() * 3) + 1);

      if (this.casillas[i][j].inexistente === false && this.casillas[i][j].vacia){
        this.casillas[i][j] = new CasillaMountain(this.scene, i, j);  this.casillasCod[i][j] = 4; 
      }
      else a--;
    }
  }

  printTablero(){
    let squareSize = this.scene.squareSize;
    let offset = this.scene.offset;

    for (let i = 0; i < this.scene.altoMundo; i++){
      for (let j = 0; j < this.scene.anchoMundo; j++){
        //Dibujar la casilla dependiendo de su tipo

        if (this.casillas[i][j] !== undefined) this.casillas[i][j].print(i * squareSize + offset , j * squareSize + offset);
      }
    }
  }

  copiaTablero(cas){
    for (let i = 0; i < this.scene.altoMundo; i++){
      for (let j= 0; j < this.scene.anchoMundo; j++){
        switch(cas[i][j]){
          case 0:
            this.casillas[i][j] = new CasillaInexistente(this.scene, this.x, this.y);
            break;
          case 1:
            this.casillas[i][j] = new CasillaVacia(this.scene, this.x, this.y);
            break;
          case 2:
            this.casillas[i][j] = new CasillaForest(this.scene, this.x, this.y);
            break;
          case 3:
            this.casillas[i][j] = new CasillaSuperForest(this.scene, this.x, this.y);
            break;
          case 4:
            this.casillas[i][j] = new CasillaMountain(this.scene, this.x, this.y);
            break;
          case 5:
            this.casillas[i][j] = new CasillaSuperMountain(this.scene, this.x, this.y);
            break;
          case 6:
            this.casillas[i][j] = new CasillaRed(this.scene, this.x, this.y);
            break;
          case 7:
            this.casillas[i][j] = new CasillaBlue(this.scene, this.x, this.y);
            break;
        }
      }
    }
    console.log('tablero copiado');
  }

}