import Casilla from "./Casilla.js";

export default class CasillaInexistente extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaInexistente';
      this.inexistente = true;
    }
  }