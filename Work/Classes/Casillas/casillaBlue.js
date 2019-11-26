import Casilla from "./Casilla.js";

export default class CasillaBlue extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaBlue';
      this.base = true;
      this.owner = "blue";
    }
  }