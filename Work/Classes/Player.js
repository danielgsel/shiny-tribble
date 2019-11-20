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
        this.Perturn = {
            wood : 0,
            steel : 0
        }
        this.woodIcon;
          this.woodNumberMenu;

          this.steelIcon;
          this.steelNumberMenu ;

        
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

        if (color === "blue"){
            this.h = 1250;
        }
        else{
            this.h = 50;
        }
        this.loadResourcesMenus();
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

      loadResourcesMenus(){
          this.woodIcon = this.scene.add.image(950,this.h, 'woodIcon').setScale(0.2);
          this.woodNumberMenu = this.scene.add.text(1020, this.h -50,  this.Resources.wood , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });

          this.steelIcon = this.scene.add.image(1150,this.h+5, 'steelIcon').setScale(0.12);
          this.steelNumberMenu = this.scene.add.text(1200, this.h - 50,  this.Resources.steel , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });

      }

      updateResourcesMenus(){
          this.woodNumberMenu.destroy();
          this.woodNumberMenu =this.scene.add.text(1020, this.h - 50,  this.Resources.wood , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });

          this.steelNumberMenu.destroy();
          this.steelNumberMenu = this.scene.add.text(1200, this.h - 50,  this.Resources.steel , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });

      }

      passTurn(){
          this.Resources.wood = this.Resources.wood + this.Perturn.wood;
          this.Resources.steel = this.Resources.steel + this.Perturn.steel;

          this.updateResourcesMenus();
      }

 


}