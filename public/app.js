//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()


(function(document, window, undefined, $){
  (function(){
    return Filtros = {
      io: io(),
      $clasificadoTemp: $("div[name='clasificado']").clone(),
      //Init es la función constructura
      Init: function(){
        var self = this;
        self.cargaCiudades();
        self.cargarCasas();
        $("div[name='clasificado']").empty("");
        $("#buscar").click(function(){
          var ciudad = $("#ciudad").val();
          var filter = {Ciudad: ciudad, Tipo: tipo, Precio: precio}
          self.customSearch(filter);
        })
        $("#tipo, #ciudad, #rangoPrecio").change(()=>{
          var ciudad = $("#ciudad").val();
          var tipo = $("#tipo").val();
          var precio = $("#rangoPrecio").val();
          var filter = {Ciudad: ciudad, Tipo: tipo, Precio: precio}
          self.customSearch(filter);
        }
      },
      ajaxRequest: function(url, type, data){
        return $.ajax({
          url: url,
          type: type,
          data: data
        })
      },
      cargaCiudades: function(){
        var self = this;
        self.ajaxRequest('/Filtros/ciudades', 'GET', {})
            .done()
      },
      cargarCasas: function(){
        var self = this;
        self.ajaxRequest('/Filtros/casas', 'GET', {})
            .done(data=>{
              var $casas = $("#casas");
               $.each(data, (i,casa)=>{
                 var htmlNew = self.$clasificadoTemp.html().replace(":Direccion:",casa.Direccion)
                                                        .replace(":Ciudad:",casa.Ciudad)
                                                        .replace(":Telefono:",casa.Telefono)
                                                        .replace(":Codigo_Postal:",casa.Codigo_Postal)
                                                        .replace(":Precio:",casa.Precio)
                                                        .replace(":Tipo:",casa.Tipo);
                  var $control = self.$clasificadoTemp.clone().html(htmlNew);
                 $casas.append( $control );
              })
            })
            .fail(err=>{
              console.log(err);
            });
      }
    }
  })()
  Filtros.Init()
})(document,window, document, jQuery);
