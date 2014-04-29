/* --------------------------------- Index View Event Registration -------------------------------- */
$(button_view_index).click(function(){
    index_controller.show();
});
$(button_view_controldetoma).click(function(){
    control_de_toma_controller.show();
});

/* --------------------------------- Terminos y Condiciones Event Registration -------------------------------- */
$(button_aceptar_terminos).click(function(){
    terminosycondiciones_controller.aceptarterminos();
});
$(button_declinar_terminos).click(function(){
    console.log("TODO: Alert Here");
});