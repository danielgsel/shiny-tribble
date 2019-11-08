export default class Estructura extends Phaser.GameObjects.Sprite {
    constructor(x, y, scene) {
      super(scene, x, y, 'estructura');

      this.stats = {
        position: { x: undefined, y: undefined},
        owner: undefined,
        hp: undefined
      }

    }
    
}