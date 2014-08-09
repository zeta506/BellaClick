var terminosycondiciones_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('terminosycondiciones_controller:initialize(' + id + ')');
        var aceptado = LocalStorageGetValue(TERMINOS_ACEPTADOS);
        console.log("aceptado? "+ aceptado);
        if(aceptado == null)
        {
            console.log("no:null");
            seleccione_pais_controller.show();
            setTimeout(function() {
                $(seleccione_pais_div).fadeOut();
                terminosycondiciones_controller.show();
            }, 2444);
        }
        else
        {
            $(terminosycondiciones_div).fadeOut();
            index_controller.show();
            console.log("yes:"+aceptado);
            //farmacias_controller.show();
        }
    },
    aceptarterminos:function()
    {
        LocalStorageCreateKey(TERMINOS_ACEPTADOS, "666");
        $(terminosycondiciones_div).fadeOut();
        //index_controller.show();
        //
        // Inmediatly calling create user account screen
        //
        crear_cuenta_controller.show();
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            $(terminosycondiciones_content_div).html(terminosycondiciones_latino); //show the content
            $(terminosycondiciones_div).fadeIn();
            $(logos_div).fadeIn();
        }, 444);
    }
};
