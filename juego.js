var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const ANCHO_TAB = 11;
const LARGO_TAB = 9;
var tablero = new Array(ANCHO_TAB);
function Casilla(activa, tipo, ocupacion, color){
    this.activa = activa;
}


for (i = 0; i < tablero.length; i++) tablero[i] = new Array(LARGO_TAB);

var game = new Phaser.Game(config);

function preload(){
    this.load.image('im', 'assets/google.jpg');
}

function create(){
    this.add.image(400, 300, 'im');
}

function update(){

}