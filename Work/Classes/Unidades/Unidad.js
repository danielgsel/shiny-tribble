export default class Unidad extends Phaser.GameObjects.Sprite {
  constructor(scene, positionx, positiony, unitHP, unitSpriteName, owner){
    super(scene, positionx, positiony, 'unit');

    this.hp = unitHP;   //vida  
    this.owner = owner;   //Jugador
    this.position = {x: positionx, y: positiony};   //posicion
    this.spriteName = unitSpriteName;   //Nombre de su sprite en la escena
    this.sprite = scene.add.image(positionx * scene.squareSize + scene.offset, positiony * scene.squareSize + scene.offset, unitSpriteName);  //Referencia a su imagen en la escena
    this.scene = scene;


    this.deleteMe= false;

    if(this.owner === "red"){
      this.healthbar = scene.add.image(positionx * scene.squareSize + scene.offset, positiony * scene.squareSize + scene.offset - 40, "healthBar").setVisible(false);
  
    }
    else {
      this.healthbar = scene.add.image(positionx * scene.squareSize + scene.offset, positiony * scene.squareSize + scene.offset - 40, "blueHealthBar").setVisible(false);
    }
  }
    
   
  moveUnit(x, y){   //Mover unidad a unas coordenadas dadas
    this.position = {x, y};
    this.sprite.x = x * this.scene.squareSize + this.scene.offset;
    this.sprite.y = y * this.scene.squareSize + this.scene.offset;
    this.healthbar.x = this.position.x * this.scene.squareSize + this.scene.offset;
    this.healthbar.y = this.position.y * this.scene.squareSize + this.scene.offset - 40;
  }

  destroyMe(){    //Para los workers
    this.sprite.destroy();
    this.healthbar.destroy(); 
    this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;

    this.deleteMe = true;
    this.scene.deleteUnit(this.owner);
  }

  receiveDamage(damage){  
    this.hp -= damage;
    console.log(this.hp)
    this.healthbar.x = this.position.x * this.scene.squareSize + this.scene.offset;
    this.healthbar.y = this.position.y * this.scene.squareSize + this.scene.offset - 40;

    
    this.healthbar.setVisible(true);
    this.healthbar.scaleX = this.hp/100;

    if (this.hp <= 0) {   //Por alguna razon no puedo llamar a destroyMe desde aqui ¿?
      this.sprite.destroy();
      this.healthbar.destroy(); 
      this.scene.tablero.casillas[this.position.x][this.position.y].OccupiedBy = undefined;
      this.scene.selection = undefined;

      this.deleteMe = true;
      this.scene.deleteUnit(this.owner);
    }
  }

}