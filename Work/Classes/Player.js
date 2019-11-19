import Trabajador from "./Unidades/Trabajador.js"
import Archer from "./Unidades/Atacantes/Archer.js"
import Tank from "./Unidades/Atacantes/Tank.js"
import Soldier from "./Unidades/Atacantes/Soldier.js"
import Cannon from "./Estructuras/Cannon.js"
import Tower from "./Estructuras/Torre.js"
import Mortar from "./Estructuras/Morterto.js"

export default class Player{
    constructor(game, color){
        this.scene = game;
        this.Units = [];
        this.Structures = [];
        this.Resources = {
            wood : 0,
            steel : 0
        }
        
        this.color = color;
        if(color === "blue"){
            this.SpriteArcher = "blueArcher";
            this.SpriteWorker = "blueWorker";
            this.SpriteSoldier = "blueSoldier";
            this.SpriteTank = "blueTank";
        }
        else{
            this.SpriteArcher = "redArcher";
            this.SpriteWorker = "redWorker";
            this.SpriteSoldier = "redSoldier";
            this.SpriteTank = "redTank"; 
        }
    }

    newUnit(x,y,hp,unitType,direction){
        if(unitType === 'worker'){
            this.Units.push(new Trabajador(this.scene, x,y,hp, this));
            this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
        }
        else if (unitType === 'archer'){
            this.Units.push(new Archer(this.scene, x,y,hp, this.SpriteArcher, direction, this));
            this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
        }
        else if (unitType === 'soldier'){
            this.Units.push(new Soldier(this.scene, x,y,hp, this.SpriteSoldier, direction, this));
            this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
        }
        else if (unitType === 'tank'){
            this.Units.push(new Tank(this.scene, x,y,hp, this.SpriteTank, direction, this));
            this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
        }


        
    }

    newStructure(i){
        switch(i){
          case 0:   //Cannon
            this.Structures.push(new Cannon(this, [this.scene.selection.position.x, this.scene.selection.position.y], 0, 0, this.scene));
            this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
            this.scene.selection.destroyMe();
            break;
          case 1:   //Tower
          this.Structures.push(new Tower(this, [this.scene.selection.position.x, this.scene.selection.position.y], 0, 0, this.scene));
          this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
          this.scene.selection.destroyMe();
            break;
          case 2:   //Mortar
          this.Structures.push(new Mortar(this, [this.scene.selection.position.x,this.scene.selection.position.y], 0, 0, this.scene));
          this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
          this.scene.selection.destroyMe();
            break;
          case 3:   //Recursos
            
            break;
        }
      
        this.scene.selectionIcon.visible = false;
        this.scene.menuConstruir.visible = false;
        this.scene.menuMovimiento.visible = false;
      
        this.scene.selection = undefined;
      }

}