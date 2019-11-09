export default class Estructura extends Phaser.GameObjects.Sprite {
    constructor( spriteName, hp, owner, tabPos, x, y, scene) {
      super(scene, x, y, 'estructura');

      this.position = { x: tabPos[0], y: tabPos[1]};
      this.owner = owner;
      this.hp = hp;
      this.sprite = scene.add.image(tabPos[0] * scene.squareSize + scene.offset, tabPos[1] * scene.squareSize + scene.offset, spriteName);

    }
}