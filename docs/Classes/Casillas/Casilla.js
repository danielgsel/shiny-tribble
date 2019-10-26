export default class Casilla extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      
      super(scene, x, y ,'casilla');
      
      this.sprite = undefined;
      this.OccupiedBy = undefined;
    }

    print(x, y){
      this.scene.add.image(x, y, this.sprite);
    }
    
}

