var farmacias_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('farmacias_controller:initialize(' + id + ')');
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(farmacias_div).html(HTML_farmacias_template);
            $(farmacias_div).fadeIn();
        }, 444);
    }
};
