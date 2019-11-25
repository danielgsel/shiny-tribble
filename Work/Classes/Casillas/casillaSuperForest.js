import Casilla from "./Casilla.js";

export default class CasillaSuperForest extends Casilla{
    constructor(scene, x, y){
      super(scene, x, y);
  
      this.sprite = 'casillaSuperForest';
      this.resources = true;

      this.type="superForest";

    }
  
    construyeGranAserradero(){
  
    }
  }