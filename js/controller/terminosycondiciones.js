var terminosycondiciones_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('terminosycondiciones_controller:initialize(' + id + ')');
        var aceptado = LocalStorageGetValue(TERMINOS_ACEPTADOS);
        //console.log("aceptado? "+ aceptado);
        if(aceptado == null)
        {
            console.log("no:null");
            terminosycondiciones_controller.show();
        }
        else
        {
            index_controller.show();
            //farmacias_controller.show();
        }
    },
    aceptarterminos:function()
    {
        LocalStorageCreateKey(TERMINOS_ACEPTADOS, "666");
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(terminosycondiciones_div).html(HTML_terminosycondiciones_template);
            $(terminosycondiciones_div).fadeIn();
        }, 444);
    }
};
