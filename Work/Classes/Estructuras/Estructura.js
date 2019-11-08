export default class Estructura extends Phaser.GameObjects.Sprite {
    constructor( x, y, scene) {
      super(scene, x, y, 'estructura');

      this.stats = {
        position: { x: tabPos[0], y: tabPos[1]},
        owner: owner,
        hp: hp
      }

    }
}