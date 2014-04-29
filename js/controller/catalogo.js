var catalogo_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('catalogo_controller:initialize(' + id + ')');
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(catalogo_div).html(HTML_catalogo_template);
            $(catalogo_div).fadeIn();
        }, 444);
    }
};
