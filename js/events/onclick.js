/* --------------------------------- Index View Event Registration -------------------------------- */
$(button_view_index).click(function(){
    index_controller.show();
});
$(button_view_controldetoma).click(function(){
    $(datetime_picker).setNow();
    //var d = new Date();
    //$(datetime_picker).val(d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
    controldetoma_controller.show();
});
$(button_view_catalogo).click(function(){
    window.location.href = "imageViewerCarousel.html"
    //catalogo_controller.show();
});
$(button_view_facturas).click(function(){
    facturas_controller.show();
});
$(button_view_farmacias).click(function(){
    farmacias_controller.show();
});
$(button_view_moodchart).click(function(){
    moodchart_controller.show();
});
$(button_view_crear_cuenta).click(function(){
    crear_cuenta_controller.show();
});
$("#submit_actualizar_cuenta").click(function(){
    crear_cuenta_controller.show();
});
$("#submit_recomendar_whatsapp").click(function(){
    window.location.href = "whatsapp://send?text='Hola encontré esta app y me pareció que te podría gustar. [Link de descarga]'";
});
        // -----------------------------------------------------  EMAIL SEND CLICK    
        $('#submit_recomendar').click( function(event){
            var email = "";
            var subject = "BellaClick App";
            var emailBody = "Hola encontré esta app y me pareció que te podría gustar. [Link de descarga]"
            //console.log(email + subject + emailBody);
            if(subject!="" && emailBody!="")
              window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
            return false;
          });
/* --------------------------------- Control de Toma Event Registration -------------------------------- */
$(submit_crear_alarma).click(function(){
    var datetime = $(datetime_picker).val();
    //console.log("datetimepicker - "+datetime);
    var date = new Date($(datetime_picker).val());
    //console.log("date - "+date);
    var date222 = convertUTCDateToLocalDate(new Date(date.toString()));
    console.log("TODO: Crear Alert Here - "+date222);
    var selectedPID = $('#hiddenMedicamentoSeleccionado').val();
    controldetoma_controller.crearnotificacion(666, "Recuerda tomar tu " + selectedPID,"Control de toma de medicamentos. Recuerda tomar tu " + selectedPID);
    //controldetoma_controller.crearalarma("nombre",date222,"daily","BellaClick recuerda tomar tu pastilla!");
});
/* --------------------------------- Terminos y Condiciones Event Registration -------------------------------- */
$(button_aceptar_terminos).click(function(){
    console.log("TODO: Acektar Here");
    terminosycondiciones_controller.aceptarterminos();
});
$(button_declinar_terminos).click(function(){
    console.log("TODO: Alert Here");
});
/* --------------------------------- Catalogo Event Registration -------------------------------- */
$(button_sincronizar_catalogo).click(function(){
      console.log("Syncing Catalog...");
      catalogo_controller.refresh();
});
/* ----------------------------------  Crear Cuenta Event Registration ----------------------------- */
$(button_crear_cuenta).click(function(){
      console.log("button_crear_cuenta...");
      crear_cuenta_controller.crearcuenta();
});
/* ----------------------------------  Crear Cuenta Event Registration ----------------------------- */
$("#button_abrir_calendario").click(function(){
      console.log("button_abrir_calendario...");
      moodchart_controller.showCalendar();
});
$("#button_guardar_mood").click(function(){
      console.log("TODO: button_guardar_mood...");
});