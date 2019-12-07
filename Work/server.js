const app = require('express')(); // servidor de aplicaciones
const http = require('http').createServer(app); // servidor HTTP
const io = require('socket.io')(http); // Importamos `socket.io`

const port = 3000; // El puerto
var clients = [];
let socket1;
let socket2;

let yaHayUnCliente = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', socket => {
    if(yaHayUnCliente) {
            // ...
            socket.emit('slave')
    }
    else {
        yaHayUnCliente = true
        socket.emit('master')
        socket1 = socket


    }

  console.log('a user connected');
  clients.push(socket); // metemos el socket en el array

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    clients.splice(clients.indexOf(socket), 1); // lo sacamos del array
  });

  socket.on('precios', mensaje => {
    socket.emit('precios', mensaje);
  });
});

// Creación del servidor en sí (por HTTP)
http.listen(port, () => {
  console.log('Servidor escuchando en el puerto', port);
});
