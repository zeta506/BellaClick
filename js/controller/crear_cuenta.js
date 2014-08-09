var crear_cuenta_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    // Application Constructor
    initialize: function(id) {
        console.log('crear_cuenta_controller:initialize(' + id + ')');
    },
    crearcuenta:function()
    {
        //
        //read screen values
        //
        var nombre = $(textfield_nombre).val();
        var correo = $(textfield_correo).val();
        var contrasena = "p";//$(textfield_contrasena).val();
        var medico = $(textfield_medicoqueatiende).val();
        var telefono1 = $(textfield_telefono1).val();
        var telefono2 = "t2";//$(textfield_telefono2).val();
        console.log('crearcuenta form values: '+ correo + contrasena + nombre +medico +telefono1 +telefono2);
        //
        //web service call
        //
        //CreateBellaClickUser(string correo, string contrasena, string nombre, string telefono1, string telefono2)
        console.log("ws call ---> "+ CREAR_CUENTA_SERVICE_URL);
        $.ajax({
               type: "POST",
               url: CREAR_CUENTA_SERVICE_URL,
               data: JSON.stringify({ 
                                  correo: correo, 
                                  contrasena: contrasena,
                                  nombre: nombre,
                                  telefono1:telefono1,
                                  telefono2: telefono2,
                                    }),
               contentType: 'application/json; charset=utf-8',
               dataType: 'json',
               beforeSend: function (xhr) {
                    console.log("//xhr.setRequestHeader('Authorization', 'username password');");
                    //Possible to set any required headers here
                    //xhr.setRequestHeader('Authorization', 'username password');
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                  console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
               },
               success: function (data) {
                    console.log("server response success RAW ---> " + data);
                    
                    if(data != false)
                    {
                        //
                        //TODO: take care of registered users
                        //
                        //var _cliqId = data;
                        //console.log("cuenta id generated: "+_cliqId);
                        //
                        //TODO: clearfields after creation successfully                        
                        //
                        //crear_cuenta_controller.clearCreateCliqFields();
                        //LocalStorageCreateKey(CUENTA_EXISTE, "666");
                        //index_controller.show();
                        cordovaDialog("BellaClick App", "Cuenta registrada.", "Ok");
                        app.hideAllDivs();
                        setTimeout(function() {
                            index_controller.show();
                        }, 888);
                    }
                    else
                    {
                      console.log("server response error ---> " + data);
                    }
               }
         });
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            $(crear_cuenta_div).fadeIn();
        }, 444);
    }
};
