import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
  constructor(scene, positionx, positiony, owner) {

    if (owner.color === "red"){
      super(scene, positionx, positiony, 40, 'worker', owner);
    }
    else{
      super(scene, positionx, positiony, 40, 'blueWorker', owner);
    }
    
    this.timesMoved = 0;

    this.sprite.setInteractive();
    this.sprite.on('pointerdown', () => {
      if (this.scene.selection !== this){
        if(this.owner.color == "red" && !this.scene.blueTurn && this.timesMoved === 0){
          this.scene.workerSelected(this);
        }
        else if(this.owner.color == "blue" && this.scene.blueTurn && this.timesMoved === 0){
          this.scene.workerSelected(this);
        }
        
      }
    })
    this.moveIndicator;
    this.indicatorCreated = false;
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
    this.positionx = x;
    this.positiony = y;
    //this.movetheIndicator();
    //this.hideIndicator();
    this.timesMoved++;
    this.scene.unselect();
   
    
  }

  printIndicator(){
    this.moveIndicator = this.scene.add.image(this.positionx * this.scene.squareSize + this.scene.offset + 30,
      this.positiony * this.scene.squareSize + this.scene.offset + -40, 'canMove');
      this.indicatorCreated = true;
  }

  movetheIndicator(){
    this.moveIndicator.x = this.positionx * this.scene.squareSize + this.scene.offset + 30;
    this.moveIndicator.y = this.positiony * this.scene.squareSize + this.scene.offset + -40;
  }

  showIndicator(){
    this.moveIndicator.visible = true;
  }

  hideIndicator(){
    this.moveIndicator.visible = false;
  }

  passTurn(){
    //this.manageIndicator();
  }
  
  // manageIndicator(){
  //   if (this.owner.color === "red")
  //   {
  //     if(this.scene.blueTurn){
  //         if(!this.indicatorCreated)this.printIndicator();
  //         this.showIndicator();
  //     }
  //     else{
  //       if(this.indicatorCreated)this.hideIndicator();

  //     }
  //   }
  //   else{
  //     if(this.scene.blueTurn){
  //       if(this.indicatorCreated)this.hideIndicator();

  //     }
  //     else{
  //         if(!this.indicatorCreated)this.printIndicator();
  //         this.showIndicator();

  //     }

  //   }

  // }
  
}
