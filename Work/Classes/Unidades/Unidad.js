export default class Unidad extends Phaser.GameObjects.Sprite {
  constructor(scene, positionx, positiony, unitHP, unitSpriteName, owner){
    super(scene, positionx, positiony, 'unit');

    this.hp = unitHP;   //vida  
    this.owner = owner;   //Jugador
    this.position = {x: positionx, y: positiony};   //posicion
    this.spriteName = unitSpriteName;   //Nombre de su sprite en la escena
    this.sprite = scene.add.image(positionx * scene.squareSize + scene.offset, positiony * scene.squareSize + scene.offset, unitSpriteName);  //Referencia a su imagen en la escena
    this.scene = scene;
  }
   
  moveUnit(x, y){   //Mover unidad a unas coordenadas dadas
    this.position = {x, y};
    this.sprite.x = x * this.scene.squareSize + this.scene.offset;
    this.sprite.y = y * this.scene.squareSize + this.scene.offset;
  }

  receiveDamage(damage){
    this.hp -= damage;
    console.log(this.hp)
    if (this.hp <= 0) {
      this.sprite.destroy();
      this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
    }
  }

}