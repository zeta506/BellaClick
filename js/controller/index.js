/* ---------------------------------- Local Variables ---------------------------------- */
var index_div = "#index_div";
//var HTML_index_template = "<h1>Index</h1>";

var index_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        /*if (navigator.notification) { // Override default HTML alert with native dialog
            navigator.notification.alert("PhoneGap is working", function(){}, "", "");
        }*/
        
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(index_div).html(HTML_index_template);
            $(index_div).fadeIn();
        }, 444);
    }
};
