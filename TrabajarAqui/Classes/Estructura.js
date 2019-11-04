export default class Estructura extends Phaser.GameObjects.Sprite {
    constructor(scene) {


      let x = 0, y = 0;  
      super(scene,x,y, 'estructura');


      this.stats = {
        position: undefined,
        owner: undefined,
        hp: undefined
      }

    }
    
}