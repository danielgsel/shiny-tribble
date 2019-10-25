export default class Unidad extends Phaser.GameObjects.Sprite {
  constructor(scene, position, hp){
    super(scene, position[0], position[1], 'unit');

    this.stats = {
      hp: hp,
      owner: undefined,
      position: position
    }

  }
   

    Move(destiny){
      
    
    }

    Damage(damage){

    }

}