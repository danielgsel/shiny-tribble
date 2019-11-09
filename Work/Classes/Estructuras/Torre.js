import Defensa from "./Defensa.js";

export default class Torre extends Defensa{
    constructor(owner, tabPos, x, y, scene){
        super('tower', 10, 2, 30, owner, tabPos, x, y, scene);
    }
} 