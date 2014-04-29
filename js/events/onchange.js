/* ---------------------------------- Local Variables ---------------------------------- */

/* --------------------------------- Event Registration -------------------------------- */

/* --------------------------------- Checkbox ------------------------------ */
$(checkbox_sample).on('change', function() {
    var value = this.checked;
    //console.log( checkbox_sample + "on.change.begin");
    forms_controller.updateGUI();
    console.log('on.change.end.');
});
/* --------------------------------- Select -------------------------------- */
$(dropdown_sample).on('change', function() {
    //console.log( dropdown_sample + " Click <-- ");
    forms_controller.updateGUI();
});
/* --------------------------------- Radio buttons ------------------------- */
$(radio_A).on('change', function() {
    //console.log( radio_A + "Click");
    forms_controller.updateGUI();
});
$(radio_B).on('change', function() {
    //console.log( radio_B + "Click");
    forms_controller.updateGUI();
});
$(radio_C).on('change', function() {
    //console.log( radio_C + "Click");
    forms_controller.updateGUI();
});

/* --------------------------------- Event Registration -------------------------------- */
console.log('onchange.Registration Done.');
