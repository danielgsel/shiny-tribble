import Estructura from "./Estructura.js";

export default class Defensa extends Estructura{
    constructor( damage, range, hp, owner, tabPos, x, y, scene){
        super(hp, owner, tabPos, x, y, scene);
        
        this.range = range;
        this.unitAttached = undefined;
        this.damage = damage;
    }

    passTurn(){
        checkUnitAvaliable();

        if (this.unitAttached === undefined) this.checkUnits();

        this.attackUnit();
    }

    checkUnits(){   //Comprueba si hay alguna tropa a rango y asigna la mas debil a unitAttached
        let enemiesFound = new Array(0);

        for (let x = -1; x <= range; x++){
            for (let y = -1; y <= this.range; y++){
                let pos = {x = this.position.x + x, y = this.position.y + y};

                if (pos.x >= 0 && pos.x < scene.anchoMundo && pos.y >= 0 && pos.y < scene.altoMundo &&
                    scene.tablero.casillas[x][y].OccupiedBy !== undefined){     //Añadir la comprobacion del owner <---------------
                        enemiesFound.push(scene.tablero.casillas[x][y].OccupiedBy);
                }
            }
        }

        if (enemiesFound.length > 0){
            let weakestAttacker = enemiesFound[0];
            for (let i = 1; i < enemiesFound.length; i++){
                if (enemiesFound[i].hp < weakestAttacker.hp){
                    weakestAttacker = enemiesFound[i];
                }
            }

            this.unitAttached = weakestAttacker;
        }
    }

    checkUnitAvaliable(){   //Comprueba que la tropa fijada anteriormente sigue en rango
        if (this.unitAttached !== undefined &&
            !(this.unitAttached.position.x - this.position.x <= range && this.unitAttached.position.y - this.position.y <= range)){    //no ha salido de rango
            this.unitAttached = undefined;
        }
    }

    attackUnit(){   //Realiza el daño a la unidad
        if (this.unitAttached !== undefined) this.unitAttached.receiveDamage(this.damage);
    }
}