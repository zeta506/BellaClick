var controldetoma_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('controldetoma_controller:initialize(' + id + ')');
        //controldetoma_controller.crearalarma(123,"daily","default init alarm");
    },
    crearnotificacion: function()
    {
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
    },
    crearalarma: function(name, date, repeat, message) {
        console.log('controldetoma_controller:crearalarma(' + name + date + repeat + message+')');
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            $(controldetoma_div).fadeIn();
        }, 444);
    }
};
