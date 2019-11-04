import Casilla from "./Casilla.js";

export default class CasillaRed extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaRed';
      this.base = true;
    }
  }