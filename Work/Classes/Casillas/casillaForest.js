import Casilla from "./Casilla.js";

export default class CasillaForest extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaForest';
      this.resources = true;
      this.type ="wood";
    }
  

  }