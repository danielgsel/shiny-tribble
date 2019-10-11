export default class Unidad extends Phaser.GameObjects.Sprite {
  constructor(scene) {

    let x = 0, y = 0;  
    super(scene,x,y, 'unidad');

    this.stats = {
      hp: undefined,
      speed: undefined,
      owner: undefined,
      position: undefined
    }

  }

     

    Move(destiny){
      
    
    }

    Damage(damage){

    }

}