import Defensa from "./Defensa.js";

export default class Mortero extends Defensa{
    constructor(owner, tabPos, x, y, scene){
        let sprite = undefined;
        if (owner === 'blue') sprite = 'blueMortar';
        else sprite = 'redMortar';
        super(sprite, 20, 1, 35, owner, tabPos, x, y, scene);
    }
} 