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

    } else if(this.customSearch == true) {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch();


(function(document, window, undefined, $){
  (function(){
    return Filtros = {
      //io: io(),
      $clasificadoTemp: $("div[name='clasificado']").clone(),
      //Init es la función constructura
      Init: function(){
        console.log('hola2');
        var self = this;
        self.cargaCiudades();

        $("div[name='clasificado']").empty("");
        $("#buscar").click(function(){
          self.cargarCasas();
          var ciudad = $("#ciudad").val();
          var precio = $('#rangoPrecio').val();
          var filter = {Ciudad: ciudad, /*Tipo: tipo,*/ Precio: precio}
          self.customSearch(filter);
        })
        $("#tipo, #ciudad, #rangoPrecio").change(()=>{
          var ciudad = $("#ciudad").val();
          //var tipo = $("#tipo").val();
          var precio = $("#rangoPrecio").val();
          var filter = {Ciudad: ciudad, Tipo: tipo, Precio: precio}
          self.customSearch(filter);
        })
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
            .done(function(data){
              console.log(data);

              $.each(data, function(i, ciudad){
                $('#ciudad').append(`<option value="${ciudad}">${ciudad}</option>`);
                var $ciudades = $("#ciudad");
              })
            }).fail(function(err){
              console.log(err);
            })
      },
      cargarCasas: function(){
        var self = this;
        self.ajaxRequest('/Filtros/data', 'GET', {})
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
      },
      customSearch: function(filter){
        var self = this;
        self.ajaxRequest('/Filtros/data', 'GET', {})
            .done(function(data){
              var $casas = $("#casas");
              $casas.html("");
              $.each(data, (i,casa)=>{
                var htmlNew = self.$clasificadoTemp.html().replace(":Direccion:",casa.Direccion)
                                                       .replace(":Ciudad:",casa.Ciudad)
                                                       .replace(":Telefono:",casa.Telefono)
                                                       .replace(":Codigo_Postal:",casa.Codigo_Postal)
                                                       .replace(":Precio:",casa.Precio)
                                                       .replace(":Tipo:",casa.Tipo);
                 var $control = self.$clasificadoTemp.clone().html(htmlNew);
                 if (filter === undefined) {
                   alert('busca mas info');
                 }else{
                   console.log(filter)
                   var show = (filter.Ciudad ===undefined || filter.Ciudad =="" || filter.Ciudad == casa.Ciudad);
                   var precio = filter.Precio.split(";");
                   var precioCasa = casa.Precio.replace("$","").replace(",","");
                   var show = show && ( precioCasa >= precio[0] && precioCasa <= precio[1]);
                   console.log(`Ciudad:${filter.Ciudad}, Tipo: ${filter.Tipo}, Precio: ${precio}, precioCasa: ${precioCasa}, Show: ${show}`);
                   if (show) {
                     $casas.append( $control );
                   }
                 }

             })

            })
            .fail(function(err){
              console.log(err);
            });

      }
    }
  })()
  Filtros.Init()
})(document,window, document, jQuery);
