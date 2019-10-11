export default class Casilla extends Phaser.GameObjects.Sprite {
    constructor(scene, positionArray, exists) {
      let x = 0, y = 0;  
      super(scene,x,y, 'casilla');

      this.stats = {
          exists : exists,
          type : 'empty',
          position : positionArray, 
          owner: undefined,
          image: undefined

      }

    }
    
}