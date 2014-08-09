var controldetoma_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
      $('#lista_medicamentos').on('change', function() {
        var selectedPID = this.value;
        console.log( selectedPID); // or $(this).val()
        $('#hiddenMedicamentoSeleccionado').val(selectedPID);
      });
        console.log('controldetoma_controller:initialize(' + id + ')');
        //controldetoma_controller.crearalarma(123,"daily","default init alarm");
    },
    crearnotificacion: function(id, alertBody, alertText)
    {
        localNotifier.addNotification({
                fireDate        : Math.round(new Date().getTime()/1000 + 8),
                alertBody       : alertBody,
                repeatInterval  : 1,
                soundName       : "horn.caf",
                badge           : 1,
                notificationId  : 123,
                foreground      : function(notificationId){ 
                    alert(alertText); 
                },
                background  : function(notificationId){
                    alert(alertText);
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
