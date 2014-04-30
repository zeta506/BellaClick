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
    catalogo_controller.show();
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

/* --------------------------------- Control de Toma Event Registration -------------------------------- */
$(submit_crear_alarma).click(function(){
    var datetime = $(datetime_picker).val();
    //console.log("datetimepicker - "+datetime);
    var date = new Date($(datetime_picker).val());
    //console.log("date - "+date);
    var date222 = convertUTCDateToLocalDate(new Date(date.toString()));
    console.log("TODO: Crear Alert Here - "+date222);
    controldetoma_controller.crearnotificacion();
    //controldetoma_controller.crearalarma("nombre",date222,"daily","BellaClick recuerda tomar tu pastilla!");
});
/* --------------------------------- Terminos y Condiciones Event Registration -------------------------------- */
$(button_aceptar_terminos).click(function(){
    terminosycondiciones_controller.aceptarterminos();
});
$(button_declinar_terminos).click(function(){
    console.log("TODO: Alert Here");
});