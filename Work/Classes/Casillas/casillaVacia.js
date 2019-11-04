import Casilla from "./Casilla.js";

export default class CasillaVacia extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casilla';
      this.vacia = true;
    }
  
    construyeCanon(){
  
    }
  
    construyeTorre(){
  
    }
  
    construyeMortero(){
  
    }
  }