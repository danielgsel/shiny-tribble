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
  this.moveIndicator;
  //this.printIndicator();
    

    this.positionx = positionx;
    this.positiony = positiony;
    this.moveDone = false;
  }
  
  moveWorker(x, y){
    this.scene.tablero.casillas[x][y].OccupiedBy = this;
    this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
    this.moveUnit(x, y);
    this.scene.mueveMenusWorker(this);
    this.destroyIndicator();
    this.timesMoved++;
    this.scene.unselect();
    this.positionx = x;
    this.positiony = y;
  }

  selected(){
    console.log("selected worker " + this.positionx + " " + this.positiony);
    
  }

  onSelected(){

  }

  printIndicator(){
    this.moveIndicator = this.scene.add.image(this.positionx * this.scene.squareSize + this.scene.offset + 30,
      this.positiony * this.scene.squareSize + this.scene.offset + -40, 'canMove');
  }

  destroyIndicator(){
    try{
    this.moveIndicator.destroy();
    }
    catch{
      
    }
  }

  unselected(){
      console.log("unselected worker " + this.positionx + " " + this.positiony);
    
  }

  passTurn(){
    if (this.owner.color === "red" && this.scene.blueTurn){
      this.printIndicator();
    }
    if (this.owner.color === "blue" && !this.scene.blueTurn){
      this.printIndicator();
    }

    if(this.owner.color === "blue" && this.scene.blueTurn){
      this.destroyIndicator();
    }

    if(this.owner.color === "red" && !this.scene.blueTurn){
      this.destroyIndicator();
    }
  }
}