import Unidad from "./Unidad.js";

export default class Trabajador extends Unidad {
  constructor(scene, positionx, positiony, hp) {

    super(scene, positionx, positiony, hp, 'worker');
      
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', () => {
      if (this.scene.selection !== this){
        this.scene.workerSelected(this);
        this.selected();
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
  }

  selected(){
    console.log("selected worker " + this.positionx + " " + this.positiony);
    
  }

  onSelected(){

  }

  unselected(){
      console.log("unselected worker " + this.positionx + " " + this.positiony);
    
  }
}