import Defensa from "./Defensa.js";

export default class Mortero extends Defensa{
    constructor(owner, tabPos, x, y, scene){
        super('mortar', 20, 1, 35, owner, tabPos, x, y, scene);
    }
} 