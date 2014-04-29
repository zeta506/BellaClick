var facturas_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('facturas_controller:initialize(' + id + ')');
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(facturas_div).html(HTML_facturas_template);
            $(facturas_div).fadeIn();
        }, 444);
    }
};
