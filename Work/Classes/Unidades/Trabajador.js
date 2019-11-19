import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
  constructor(scene, positionx, positiony, hp, owner) {

    if (owner.color === "red"){
      super(scene, positionx, positiony, hp, 'worker', owner);
    }
    else{
      super(scene, positionx, positiony, hp, 'blueWorker', owner);
    }
    
    this.timesMoved = 0;

    this.sprite.setInteractive();
    this.sprite.on('pointerdown', () => {
      if (this.scene.selection !== this){
        if(this.owner.color == "red" && !this.scene.blueTurn && this.timesMoved === 0){
          this.scene.workerSelected(this);
          this.selected();
        }
        else if(this.owner.color == "blue" && this.scene.blueTurn && this.timesMoved === 0){
          this.scene.workerSelected(this);
          this.selected();
        }
        
      }
    })

    this.positionx = positionx;
    this.positiony = positiony;
    this.moveDone = false;
  }
  
  moveWorker(x, y){
    this.scene.tablero.casillas[x][y].OccupiedBy = this;
    this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
    this.moveUnit(x, y);
    this.scene.mueveMenusWorker(this);

    this.timesMoved++;
    this.scene.selection = undefined;
    this.scene.selectionIcon.visible = false;
    this.scene.menuConstruir.visible = false;
    this.scene.menuMovimiento.visible = false;
  }

  selected(){
    console.log("selected worker " + this.positionx + " " + this.positiony);
    
  }

  onSelected(){

  }

  unselected(){
      console.log("unselected worker " + this.positionx + " " + this.positiony);
    
  }

  passTurn(){
    
  }
}