const app = require('express')(); // servidor de aplicaciones
const http = require('http').createServer(app); // servidor HTTP
const io = require('socket.io')(http); // Importamos `socket.io`

const port = 8080; // El puerto
var clients = [];
var redJoined = false;
var blueJoined = false;
var matchEnded = false;

var redPlayer = undefined;
var bluePlayer = undefined;

var turn = 'red';

//Carga de archivos para el servidor
{
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
//----------------------------Classes--------------------->

app.get('/Classes/game.js', function(req, res){
  res.sendFile(__dirname + '/Classes/game.js');
});
app.get('/phaser.min.js', function(req, res){
  res.sendFile(__dirname + '/phaser.min.js');
});
app.get('/Classes/winnermenu.js', function(req, res){
  res.sendFile(__dirname + '/Classes/winnermenu.js');
});
app.get('/Classes/menu.js', function(req, res){
  res.sendFile(__dirname + '/Classes/menu.js');
});
app.get('/Classes/Boton.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Boton.js');
});
app.get('/Classes/Player.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Player.js');
});
app.get('/Classes/Tablero.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Tablero.js');
});
//-----------------------------Casillas------------------------>
app.get('/Classes/Casillas/base.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/base.js');
});
app.get('/Classes/Casillas/Casilla.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/Casilla.js');
});
app.get('/Classes/Casillas/CasillaBlue.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/CasillaBlue.js');
});
app.get('/Classes/Casillas/casillaForest.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaForest.js');
});
app.get('/Classes/Casillas/casillaInexistente.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaInexistente.js');
});
app.get('/Classes/Casillas/casillaMountain.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaMountain.js');
});
app.get('/Classes/Casillas/casillaRed.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaRed.js');
});
app.get('/Classes/Casillas/casillaSuperForest.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaSuperForest.js');
});
app.get('/Classes/Casillas/casillaSuperMountain.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaSuperMountain.js');
});
app.get('/Classes/Casillas/casillaVacia.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Casillas/casillaVacia.js');
});
//-------------------------Estructuras------------------------------->
app.get('/Classes/Estructuras/Aserradero.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Aserradero.js');
});
app.get('/Classes/Estructuras/cannon.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/cannon.js');
});
app.get('/Classes/Estructuras/Cuartel.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Cuartel.js');
});
app.get('/Classes/Estructuras/Defensa.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Defensa.js');
});
app.get('/Classes/Estructuras/Estructura.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Estructura.js');
});
app.get('/Classes/Estructuras/Mina.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Mina.js');
});
app.get('/Classes/Estructuras/SuperAserradero.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/SuperAserradero.js');
});
app.get('/Classes/Estructuras/SuperMina.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/SuperMina.js');
});
app.get('/Classes/Estructuras/Torre.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Torre.js');
});
app.get('/Classes/Estructuras/Mortero.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/Mortero.js');
});
app.get('/Classes/Estructuras/morterto.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Estructuras/morterto.js');
});
//--------------------------Menus----------------------------->
app.get('/Classes/Menus/menuConstruir.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Menus/menuConstruir.js');
});
app.get('/Classes/Menus/menuCuartel.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Menus/menuCuartel.js');
});
app.get('/Classes/Menus/menuMovimiento.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Menus/menuMovimiento.js');
});
app.get('/Classes/Menus/menuNewWorker.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Menus/menuNewWorker.js');
});
app.get('/Classes/Menus/menuPasarTurno.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Menus/menuPasarTurno.js');
});
app.get('/Classes/Menus/menuTropaCuartel.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Menus/menuTropaCuartel.js');
});
//------------Unidades--------------------------------------------->
app.get('/Classes/Unidades/Atacante.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Atacante.js');
});
app.get('/Classes/Unidades/Trabajador.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Trabajador.js');
});
app.get('/Classes/Unidades/Unidad.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Unidad.js');
});
app.get('/Classes/Unidades/Atacantes/Archer.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Atacantes/Archer.js');
});
app.get('/Classes/Unidades/Atacantes/Archer.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Atacantes/Archer.js');
});
app.get('/Classes/Unidades/Atacantes/Soldier.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Atacantes/Soldier.js');
});
app.get('/Classes/Unidades/Atacantes/Tank.js', function(req, res){
  res.sendFile(__dirname + '/Classes/Unidades/Atacantes/Tank.js');
});
//-----------------------Imagenes-------------------------------->

const recursosDeLosVagos = [
'/assets/fonts/8bitlim.ttf',
'/assets/imagenes/arrowdown.png',
'/assets/imagenes/arrowdownleft.png',
'/assets/imagenes/arrowdownright.png',
'/assets/imagenes/arrowleft.png',
'/assets/imagenes/arrowright.png',
'/assets/imagenes/arrowup.png',
'/assets/imagenes/arrowupleft.png',
'/assets/imagenes/arrowupright.png',
'/assets/imagenes/BlueArcher.png',
'/assets/imagenes/blueCannon2.png',
'/assets/imagenes/blueFlag.png',
'/assets/imagenes/blueHealth.png',
'/assets/imagenes/blueHealthBase.png',
'/assets/imagenes/blueHQ2.png',
'/assets/imagenes/blueHQ.png',
'/assets/imagenes/BlueSoldier.png',
'/assets/imagenes/BlueTank.png',
'/assets/imagenes/BlueTower.png',
'/assets/imagenes/blueTower2.png',
'/assets/imagenes/blueTurn.png',
'/assets/imagenes/BlueWorker.png',
'/assets/imagenes/blured.png',
'/assets/imagenes/blured2.png',
'/assets/imagenes/bowMenu.png',
'/assets/imagenes/canMoveIndicator.png',
'/assets/imagenes/cannonMenu.png',
'/assets/imagenes/Casilla.png',
'/assets/imagenes/CasillaBlue.png',
'/assets/imagenes/CasillaForest.png',
'/assets/imagenes/CasillaInexistente.png',
'/assets/imagenes/CasillaMountain.png',
'/assets/imagenes/CasillaRed.png',
'/assets/imagenes/CasillaSuperForest.png',
'/assets/imagenes/CasillaSuperMountain.png',
'/assets/imagenes/continue.png',
'/assets/imagenes/CosasAntiguas',
'/assets/imagenes/Creditos.txt',
'/assets/imagenes/dog.jpg',
'/assets/imagenes/FactoryMenuAvailable.png',
'/assets/imagenes/FactoryMenuUnavailable.png',
'/assets/imagenes/Folder.jpg',
'/assets/imagenes/health.png',
'/assets/imagenes/knightMenu.png',
'/assets/imagenes/logo.png',
'/assets/imagenes/MenuConstructionAv.png',
'/assets/imagenes/MenuConstructionUnav.png',
'/assets/imagenes/menuHQAv.png',
'/assets/imagenes/menuHQUnav.png',
'/assets/imagenes/mortarMenu.png',
'/assets/imagenes/MovingMenu.png',
'/assets/imagenes/NextTurn.png',
'/assets/imagenes/RedArcher.png',
'/assets/imagenes/redCannon2.png',
'/assets/imagenes/redFlag.png',
'/assets/imagenes/redHealthBase.png',
'/assets/imagenes/redHQ.png',
'/assets/imagenes/redHQ2.png',
'/assets/imagenes/RedSoldier.png',
'/assets/imagenes/RedTank.png',
'/assets/imagenes/redTower.png',
'/assets/imagenes/redTower2.png',
'/assets/imagenes/redTurn.png',
'/assets/imagenes/Reference Sheet.png',
'/assets/imagenes/SelectionIcon.png',
'/assets/imagenes/soldierMenu.png',
'/assets/imagenes/start.png',
'/assets/imagenes/SteelIcon.png',
'/assets/imagenes/templateMenus.png',
'/assets/imagenes/Tower.png',
'/assets/imagenes/towerMenu.png',
'/assets/imagenes/trlogo.png',
'/assets/imagenes/WoodIcon.png',
'/assets/imagenes/worker.png',
'/assets/imagenes/workerSelected.png',
'/assets/imagenes/iconoCarga.png',
'/assets/imagenes/pantallaDeCarga.png',
'/assets/imagenes/panelTRIVALS.png'
]

for(const elQueToca of recursosDeLosVagos) {
  app.get(elQueToca, function(req, res){
    res.sendFile(__dirname + elQueToca);
  });
}

}

io.on('connection', socket => {
  console.log('a user connected');
  clients.push(socket); // metemos el socket en el array

  var color;

  socket.on('joinedGame', () => {
    if (!redJoined){
      console.log('red player');
  
      color === 'red';
      socket.emit('setColor', 'red');
  
      redPlayer = socket;
      redJoined = true;
    }
    else if(!blueJoined){
      console.log('blue player');
  
      color === 'blue';
      socket.emit('setColor', 'blue');

      bluePlayer = socket;
      blueJoined = true;

      redPlayer.emit('giveMeBoard');
    }
    else {
      console.log('Limit of players in the game reached');
    }
    

    socket.on('ready', () =>{
      redPlayer.emit('startGame');
      bluePlayer.emit('startGame');
      matchEnded = false;
    });

    socket.on('board', board => {
      bluePlayer.emit('board', board);
    });
    
  });

  socket.on('passTurn', color => {
    if(color === 'red'){
      bluePlayer.emit('myTurn');
      turn = 'blue';
    } 
    else{
      redPlayer.emit('myTurn');
      turn = 'red';
    } 
  });

  socket.on('selection', selection => {
    if(turn === 'red') bluePlayer.emit('selection', selection);
    else redPlayer.emit('selection', selection);
  });

  socket.on('moveWorker', info =>{
    if(turn === 'red') bluePlayer.emit('moveWorker', info);
    else redPlayer.emit('moveWorker', info);
  })

  socket.on('newWorker', info => {
    if(turn === 'red') bluePlayer.emit('newWorker', info);
    else redPlayer.emit('newWorker', info);
  });

  socket.on('newStructure', info =>{
    if(turn === 'red') bluePlayer.emit('buildStructure', info);
    else redPlayer.emit('buildStructure', info);
  });

  socket.on('newUnit', info =>{
    if(turn === 'red') bluePlayer.emit('newUnit', info);
    else redPlayer.emit('newUnit', info);
  });

  socket.on('gameEnded', () => {
    //clients.splice(clients.indexOf(bluePlayer), 1);
    //clients.splice(client.indexOf(redPlayer), 1);
    matchEnded = true;
    blueJoined = false;
    redJoined = false;

    console.log('----------Game ended, waiting for new players----------------');
  });

  socket.on('disconnect', () => {
    if (socket === redPlayer && !matchEnded){
      console.log('red player disconected');
      bluePlayer.emit('oponentLeft');
      blueJoined = false;
      redJoined = false;
    } 
    else if (socket === bluePlayer && !matchEnded){
      console.log('blue player disconected');
      redPlayer.emit('oponentLeft');
      blueJoined = false;
      redJoined = false;
    } 
    else{
      console.log('a user disconnected');
    } 
    
    clients.splice(clients.indexOf(socket), 1); 
  });
});

// Creación del servidor en sí (por HTTP)
http.listen(port, () => {
  console.log('Servidor escuchando en el puerto', port);
});
