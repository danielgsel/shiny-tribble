import Casilla from "./Casilla.js";

export default class CasillaSuperMountain extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaSuperMountain';
      this.resources = true
    }
  
    construyeGranMina(){
  
    }
  }