export default class Estructura extends Phaser.GameObjects.Sprite {
    constructor( spriteName, hp, owner, tabPos, x, y, scene) {
      super(scene, x, y, 'estructura');

      this.position = { x: tabPos[0], y: tabPos[1]};
      this.owner = owner;
      this.hp = hp;
      this.sprite = scene.add.image(tabPos[0] * scene.squareSize + scene.offset, tabPos[1] * scene.squareSize + scene.offset, spriteName);

      if(this.owner.color === "red"){
        this.healthbar = scene.add.image(tabPos[0] * scene.squareSize + scene.offset, tabPos[1] * scene.squareSize + scene.offset - 40, "healthBar").setVisible(false);
    
      }
      else {
        this.healthbar = scene.add.image(tabPos[0] * scene.squareSize + scene.offset, tabPos[1] * scene.squareSize + scene.offset - 40, "blueHealthBar").setVisible(false);
      }

      this.destroyMe = false;
    }

    receiveDamage(damage){
      this.hp -= damage;
      console.log(this.hp)
      this.healthbar.x = this.position.x * this.scene.squareSize + this.scene.offset;
      this.healthbar.y = this.position.y * this.scene.squareSize + this.scene.offset - 40;

    
      this.healthbar.setVisible(true);
      this.healthbar.scaleX = this.hp/100;

      if (this.hp <= 0) {
        this.sprite.destroy();
        this.healthbar.destroy(); 
        this.scene.tablero.casillas[this.position.x][this.position.y].estructurePlaced = undefined;
        this.scene.selection = undefined;

        try{
          this.lowerResources();
        }
        catch{
          
        }
        this.destroyMe = true;
        this.scene.deleteStructure(this.owner);
      }
    }
}