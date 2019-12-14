import Trabajador from "./Unidades/Trabajador.js"
import Archer from "./Unidades/Atacantes/Archer.js"
import Tank from "./Unidades/Atacantes/Tank.js"
import Soldier from "./Unidades/Atacantes/Soldier.js"
import Cannon from "./Estructuras/Cannon.js"
import Tower from "./Estructuras/Torre.js"
import Mortar from "./Estructuras/Morterto.js"
import Cuartel from "./Estructuras/Cuartel.js"
import Base from "./Casillas/base.js"
import Mina from "./Estructuras/Mina.js"
import SuperMina from "./Estructuras/SuperMina.js"
import Aserradero from "./Estructuras/Aserradero.js"
import SuperAserradero from "./Estructuras/SuperAserradero.js"

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
        this.perTurnWoodMenu;

        this.steelIcon;
        this.steelNumberMenu ;
        this.perTurnSteelMenu;

        this.base = new Base(this);
        
        this.color = color;
        if(color === "blue"){
            this.SpriteArcher = "blueArcher";
            this.SpriteWorker = "blueWorker";
            this.SpriteSoldier = "blueSoldier";
            this.SpriteTank = "blueTank";
            this.HealthBase = "blueHealthBase";
            this.h = 50;
            this.HealthH = 150;
        }
        else{
            this.SpriteArcher = "redArcher";
            this.SpriteWorker = "redWorker";
            this.SpriteSoldier = "redSoldier";
            this.SpriteTank = "redTank"; 
            this.HealthBase = "redHealthBase"
            this.h = 1250;
            this.HealthH = 1150;
        }

        this.health = 3;

        this.loadHealthBase();
        this.loadResourcesMenus();

    }

    loadHealthBase(){
        this.health1 = this.scene.add.image(180, this.HealthH, this.HealthBase).setScale(0.7);
        this.health2 = this.scene.add.image(250, this.HealthH, this.HealthBase).setScale(0.7);
        this.health3 = this.scene.add.image(320, this.HealthH, this.HealthBase).setScale(0.7);

    }

    updateHealthBase(){
        if(this.health === 3){
            this.health3.destroy();
        }
        if(this.health === 2){
            this.health2.destroy();
        }
        if(this.health === 1){
            this.health1.destroy();
            this.lose();
        }
        this.health--;
    }

    newUnit(x,y,unitType,direction){
        console.log("esoo");
        if(this.Resources.steel >= 5){
    
            if (unitType === 'archer'){
                this.Units.push(new Archer(this.scene, x,y, this.SpriteArcher, direction, this));
                this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
            }
            else if (unitType === 'soldier'){
                this.Units.push(new Soldier(this.scene, x,y, this.SpriteSoldier, direction, this));
                this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
            }
            else if (unitType === 'tank'){
                this.Units.push(new Tank(this.scene, x,y, this.SpriteTank, direction, this));
                this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
        }
        this.Resources.steel -= 5;
        this.updateResourcesMenus();

        if(this.scene.color === this.color){
            console.log("entra a eso");
            this.scene.newUnit(x, y, unitType, direction);
        } 
    }
        
    }

    newWorker(){
        if(this.Resources.wood >= 2 && this.Resources.steel >= 2){
                
            let x, y;
            let canPlace = false;
            if(this.color === "red"){
                y = 10;
            }
            else{
                y = 0;
            }
            for(let i = 3; (i < 8) && !canPlace; i++){
                if(this.scene.tablero.casillas[i][y].OccupiedBy === undefined){ 
                    x = i;
                    canPlace = true;
                }
            }
            if(canPlace){
                this.pushWorker(x, y);
                if(this.scene.color === this.color) this.scene.newWorker(x, y);
            }    
        }
    }
    
    pushWorker(x, y){
        this.Units.push(new Trabajador(this.scene, x,y, this));
        this.scene.tablero.casillas[x][y].OccupiedBy = this.Units[this.Units.length - 1];
        this.Resources.wood = this.Resources.wood - 2;
        this.Resources.steel = this.Resources.steel - 2;
        this.updateResourcesMenus();
    }

    newStructure(i){
        switch(i){
          case 0:   //Cannon
            this.Structures.push(new Cannon(this, [this.scene.selection.position.x, this.scene.selection.position.y], 0, 0, this.scene));
            this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
            this.scene.selection.destroyMe();
            this.Resources.wood -= 5;

            break;
          case 1:   //Tower
          this.Structures.push(new Tower(this, [this.scene.selection.position.x, this.scene.selection.position.y], 0, 0, this.scene));
          this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
          this.scene.selection.destroyMe();
          this.Resources.wood -= 5;

            break;
          case 2:   //Mortar
          this.Structures.push(new Mortar(this, [this.scene.selection.position.x,this.scene.selection.position.y], 0, 0, this.scene));
          this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
          this.scene.selection.destroyMe();
          this.Resources.wood -= 5;

            break;
          case 3:   //Recursos
            let castype = this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].type;
            if(castype === "wood") {
                this.Perturn.wood += 2;
                this.Structures.push(new Aserradero(this, [this.scene.selection.position.x,this.scene.selection.position.y], 0, 0, this.scene))
                this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
            }
            else if (castype === "steel"){
                this.Perturn.steel += 2;
                this.Structures.push(new Mina(this, [this.scene.selection.position.x,this.scene.selection.position.y], 0, 0, this.scene));
                this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];

            }
            else if (castype === "superSteel"){
                this.Perturn.steel += 3;
                this.Structures.push(new SuperMina(this, [this.scene.selection.position.x,this.scene.selection.position.y], 0, 0, this.scene))
                this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];

            }
            else if (castype === "superForest"){
                this.Perturn.steel += 3;
                this.Structures.push(new SuperAserradero(this, [this.scene.selection.position.x,this.scene.selection.position.y], 0, 0, this.scene))
                this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];

            }

            this.scene.selection.destroyMe();
            this.updateResourcesMenus();
            break;    
          case 4:
            //Cuarteles
            this.Structures.push(new Cuartel(this, [this.scene.selection.position.x, this.scene.selection.position.y], 0, 0, this.scene));
            this.scene.tablero.casillas[this.scene.selection.position.x][this.scene.selection.position.y].estructurePlaced = this.Structures[this.Structures.length - 1];
            this.scene.selection.destroyMe();
            break;
        }

        if(this.scene.color === this.color) this.scene.newStructure(i);
      
        this.scene.selectionIcon.visible = false;
        this.scene.menuConstruir.visible = false;
        this.scene.menuMovimiento.visible = false;
      
        this.scene.selection = undefined;
      }

      loadResourcesMenus(){
          this.woodIcon = this.scene.add.image(950,this.h, 'woodIcon').setScale(0.2);
          this.woodNumberMenu = this.scene.add.text(1020, this.h -50,  this.Resources.wood , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });
          this.perTurnWoodMenu = this.scene.add.text(1050, this.h + 20, "+ " + this.Perturn.wood , { fontFamily: 'Finger Paint', fontSize: 40, color: '#F08080' });

          this.steelIcon = this.scene.add.image(1150,this.h+5, 'steelIcon').setScale(0.12);
          this.steelNumberMenu = this.scene.add.text(1200, this.h - 50,  this.Resources.steel , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });
          this.perTurnSteelMenu = this.scene.add.text(1230, this.h + 20, "+ " +this.Perturn.steel , { fontFamily: 'Finger Paint', fontSize: 40, color: '#F08080' });

      }

      updateResourcesMenus(){
        this.woodNumberMenu.destroy();
        this.woodNumberMenu =this.scene.add.text(1020, this.h - 50,  this.Resources.wood , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });
        this.perTurnWoodMenu.destroy();
        this.perTurnWoodMenu = this.scene.add.text(1050, this.h + 20, "+ " + this.Perturn.wood , { fontFamily: 'Finger Paint', fontSize: 40, color: '#F08080' });


        this.steelNumberMenu.destroy();
        this.steelNumberMenu = this.scene.add.text(1200, this.h - 50,  this.Resources.steel , { fontFamily: 'Finger Paint', fontSize: 90, color: '#F08080' });
        this.perTurnSteelMenu.destroy();
        this.perTurnSteelMenu = this.scene.add.text(1230, this.h + 20, "+ " +this.Perturn.steel , { fontFamily: 'Finger Paint', fontSize: 40, color: '#F08080' });

      }

      passTurn(){
          this.Resources.wood = this.Resources.wood + this.Perturn.wood;
          this.Resources.steel = this.Resources.steel + this.Perturn.steel;

          this.updateResourcesMenus();
      }

      lose(){
        if(this.color === "blue"){
            this.scene.scene.start('winnermenu', {winner: 1});
        }
        else{
            this.scene.scene.start('winnermenu', {winner: 0});

        }

      }

 


}