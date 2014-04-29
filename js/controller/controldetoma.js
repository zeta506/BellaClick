/* ---------------------------------- Local Variables ---------------------------------- */
var controldetoma_div = "#control_de_toma_div";
var HTML_controldetoma_template = "<h1>Control de Toma</h1>";

var controldetoma_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('controldetoma_controller:initialize(' + id + ')');
        if (navigator.localNotifier) {
            localNotifier.addNotification({
                fireDate        : Math.round(new Date().getTime()/1000 + 5),
                alertBody       : "This is a new local notification.",
                repeatInterval  : 1,
                soundName       : "horn.caf",
                badge           : 0,
                notificationId  : 123,
                foreground      : function(notificationId){ 
                    alert("Hello World! This alert was triggered by notification " + notificationId); 
                },
                background  : function(notificationId){
                    alert("Hello World! This alert was triggered by notification " + notificationId);
                }           
            });
        }
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            $(controldetoma_div).html(HTML_controldetoma_template);
            $(controldetoma_div).fadeIn();
        }, 444);
    }
};
