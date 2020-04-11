//Modulos
var bodyParser = require('body-parser')
    http = require('http')
    express = require('express')
    socketio = require('socket.io')
    path = require('path')
    filtro = require('./Filtros')


//Variables
var PORT = 4200
    app = express()
    Server = http.createServer(app)
    io = socketio(Server)

//App Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')))
//app.use('/Filtros', filtro)

Server.listen(PORT, function(){
  console.log('Ya esta disponible: '+ PORT)
})
