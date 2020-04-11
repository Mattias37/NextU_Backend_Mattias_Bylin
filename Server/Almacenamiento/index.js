//Almacenamiento
var path = require('path')
    fs   = require('fs')
    $    = require('jquery')

    module.exports = {
      getInfo: function(dataType){
        var dataPath = path.join(__dirname, './data.json');
        return new Promise( function(resolve, reject){
          fs.readFile(dataPath, 'utf8', function(err, readInfo){
            if(err) reject(err)
            resolve(JSON.parse(readInfo))
          })
        })
      }
    }
