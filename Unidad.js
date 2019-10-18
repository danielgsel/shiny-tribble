export default class Unidad extends Phaser.GameObjects.Sprite {
  constructor(scene, position, hp, speed) {
    super(scene, position[0], position[1], 'unit');

    this.stats = {
      hp: hp,
      speed: speed,
      owner: undefined,
      position: position
    }

  }
   

    Move(destiny){
      
    
    }

    Damage(damage){

    }

}