import Casilla from "./Casilla.js";

export default class CasillaMountain extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaMountain';
      this.resources = true;
    }
  
    construyeMina(){
  
    }
  }