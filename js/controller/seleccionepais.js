var seleccione_pais_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    initialize: function(id) {
        console.log('seleccione_pais_controller:initialize(' + id + ')');
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            $(seleccione_pais_div).fadeIn();
            $(logos_div).fadeIn();
        }, 444);
    }
};
