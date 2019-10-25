export default class Casilla extends Phaser.GameObjects.Sprite {
    constructor(scene, positionArray, exists) {
      
      super(scene, positionArray[0],positionArray[1] ,'casilla');
      
      this.stats = {
        exists : exists,
        resourcePos: false,
        type : 'empty',
        position : positionArray, //?
        owner: undefined,
        unit: undefined,
        image: undefined

    }

    }
    
}


