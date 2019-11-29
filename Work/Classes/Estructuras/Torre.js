import Defensa from "./Defensa.js";

export default class Torre extends Defensa{
    constructor(owner, tabPos, x, y, scene){
        let sprite = undefined;
        if (owner.color === 'blue') sprite = 'blueTower';
        else sprite = 'redTower';
        super(sprite, 10, 2, 50, owner, tabPos, x, y, scene);
    }
} 