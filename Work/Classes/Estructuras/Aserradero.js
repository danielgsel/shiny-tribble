import Estructura from "./Estructura.js";

export default class Aserradero extends Estructura {
    constructor(owner, tabPos, x, y, scene){
        let name;
        
        if (owner.color === 'blue') name = 'blueFlag';
        else name = 'redFlag';
        
        super(name, 50, owner, tabPos, x, y, scene);

    }
}