import Defensa from "./Defensa.js";

export default class Torre extends Defensa{
    constructor(owner, tabPos, x, y, scene){
        let sprite = undefined;
        if (owner === 'blue') sprite = 'blueTower';
        else sprite = 'redTower';
        super(sprite, 10, 2, 30, owner, tabPos, x, y, scene);
    }
} 