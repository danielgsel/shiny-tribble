import Estructura from "./Estructura.js";

export default class Defensa extends Estructura{
    constructor( spriteName, damage, range, hp, owner, tabPos, x, y, scene){
        super(spriteName, hp, owner, tabPos, x, y, scene);
        
        this.range = range;
        this.unitAttached = undefined;
        this.damage = damage;
    }

    passTurn(){
        this.checkUnitAvaliable();

        if (this.unitAttached === undefined) this.checkUnits();

        this.attackUnit();
    }

    checkUnits(){   //Comprueba si hay alguna tropa a rango y asigna la mas debil a unitAttached
        let enemiesFound = new Array(0);

        for (let x = -this.range; x <= this.range; x++){
            for (let y = -this.range; y <= this.range; y++){
                let pos = {x : this.position.x + x, y : this.position.y + y};

                if (pos.x >= 0 && pos.x < this.scene.anchoMundo && pos.y >= 0 && pos.y < this.scene.altoMundo &&
                    this.scene.tablero.casillas[pos.x][pos.y].OccupiedBy !== undefined && this.scene.tablero.casillas[pos.x][pos.y].OccupiedBy.owner !== this.owner){
                        enemiesFound.push(this.scene.tablero.casillas[pos.x][pos.y].OccupiedBy);
                }
            }
        }

        //console.log('encontrados ' + enemiesFound.length + ' enemigos');

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

    checkUnitAvaliable(){   //Comprueba que la tropa fijada anteriormente sigue en rango y sigue viva
        if (this.unitAttached !== undefined) {
            if (!(Math.abs(this.unitAttached.position.x - this.position.x) <= this.range && Math.abs(this.unitAttached.position.y - this.position.y) <= this.range)
                 || !(this.unitAttached.hp > 0)){    //ha salido de rango o ha muerto 
                this.unitAttached = undefined;
            }
        }
    }

    attackUnit(){   //Realiza el daño a la unidad
        if (this.unitAttached !== undefined && !this.destroyMe){
            this.unitAttached.receiveDamage(this.damage);
            console.log('enemigo atacado (-' + this.damage + ')');
        }
    }
}