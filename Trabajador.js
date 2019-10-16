import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
    constructor(scene, positionx, positiony) {

      super(scene, positionx,positiony, 100, 1);
      
      this.stats = {
        type : 'empty',
        position : {positionx, positiony}, 
        owner: undefined,
        selected: undefined,
        image: undefined

        }

        

    }
    
}