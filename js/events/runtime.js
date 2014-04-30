/* ---------------------------------- Local Variables ---------------------------------- */
function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    //var offset = date.getTimezoneOffset() / 60;
    //var hours = date.getHours();
    //newDate.setHours(hours - offset);
    
    //dealing with weird timezones
    newDate.setTime(date.getTime()+date.getTimezoneOffset()*60*1000);

    return newDate;   
}
/* --------------------------------- Event Registration -------------------------------- */
// process the confirmation dialog result
function onConfirm(buttonIndex) {
    console.log('You selected button ' + buttonIndex);
    //if(buttonIndex==1)
      //  TODO
}

// Show a custom confirmation dialog
//
function cordovaConfirm(title, message, btnLabelsCSV) {
    navigator.notification.confirm(
        message,  // message
        onConfirm,              // callback to invoke with index of button pressed
        title,            // title
        btnLabelsCSV          // buttonLabels
    );
}

function alertDismissed() {
    console.log("alertDismissed event.");
}

function cordovaDialog(title, message, buttonText)
{
	navigator.notification.alert(
                                 message,  // message
                                 alertDismissed,         // callback
                                 title,            // title
                                 buttonText                  // buttonName
                                 );
}

/* --------------------------------- Event Registration -------------------------------- */

function onHierarchyElementClick(number, symbol, name)
{
    //console.log('hierarchy_controller:onHierarchyElementClick(' + number + symbol + name + ')');
    element_controller.show(number,symbol,name);
}

console.log('runtime.Registration Done.');
