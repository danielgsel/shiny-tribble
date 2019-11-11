import Defensa from "./Defensa.js";

export default class Cannon extends Defensa{
    constructor(owner, tabPos, x, y, scene){
        let sprite = undefined;
        if (owner === 'blue') sprite = 'blueCannon';
        else sprite = 'redCannon';
        super(sprite, 30, 1, 50, owner, tabPos, x, y, scene);
    }
} 