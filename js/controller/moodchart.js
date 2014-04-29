var moodchart_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('moodchart_controller:initialize(' + id + ')');
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(moodchart_div).html(HTML_moodchart_template);
            $(moodchart_div).fadeIn();
        }, 444);
    }
};
