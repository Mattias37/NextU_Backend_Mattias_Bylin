//Filtros
//Import
var bodyParser = require('body-parser')
    http       = require('http')
    express    = require('express')
    Router     = express.Router()
    jQuery     = require('jquery')
    io         = require('socket.io')
    Almacenamiento = require('../Almacenamiento')
//Filtrar las ciudades de get info de almacenamiento que a su vez traen la info de data.json
Router.get("/ciudades", function(req, res){
  Almacenamiento.getInfo('ciudades').then(console.log('ciudad bro'))
                .then(function(ciudades){
                  console.log('CIUDADES!!!')
                  var ciudadesUnique = [];
                  ciudades.forEach(function(o){
                    if(ciudadesUnique.indexOf(o.Ciudad)<0){
                      ciudadesUnique.push(o.Ciudad);
                    }
                  })
                  res.json(ciudadesUnique)
                })
                .catch(function(error){
                  res.sendStatus(500).json(error);
                  console.log('error filto ciudades')
                })

})
Router.get("/data", (req, res)=>{
  Almacenamiento.getInfo('data')
          .then(casas=>{
            res.json(casas)
          })
          .catch(error=>{
            res.sendStatus(500).json(error);
          })
})

module.exports = Router;
