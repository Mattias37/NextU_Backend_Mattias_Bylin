//Almacenamiento
var path = require('path')
    fs   = require('fs')
    $    = require('jquery')

    module.exports = {
      getInfo: function(dataType){
        var dataPath = path.join(__dirname, './data.json');
        return new Promise( function(res, rej){
          fs.readFile(dataPath, 'utf8', function(err, readInfo){
            if(err) rej(err)
            res(JSON.parse(readInfo))
          })
        })
      }
    }
