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

function downloadCliqImage(cliqId)
{
    //console.log('downloadChatPostImage...');
    //$('#loading_animation_div').fadeIn();
    //$('#main_div').fadeOut();
    
    var $objJSON;
    var folderName = 'CliqApp_CliqChatImages';
    var fileName = "CLIQ_IMAGE_ID_"+cliqId;
    var targetURL = "http://cliq.aeonitgroup.com/FileUploaderService.svc/" + 'downloadBase64String/' + folderName + '/' + fileName;
    
    console.log("ws call ---> "+targetURL);
    
    $.ajax({
        url: targetURL ,
        type: 'GET',
        dataType: "json",
        applicationType: 'application/json; charset=utf-8',
        success: function (response)
        {
                console.log("img service response: "+response);
                $objJSON = jQuery.parseJSON(response);
                var justTheData = $objJSON.base64String;
                var img_tag = $objJSON.base64String ;
                console.log('drawing base64string image on ---> '+$('#'+FACTURA_ID_+cliqId+''));
                /*$('#'+CLIQ_IMAGE_ID_+cliqId+'').attr('src', img_tag);
                $('#'+CLIQ_IMAGE_ID_+cliqId+'').attr('class', "");
                SAVE_CLIQ_IMAGE(cliqId,img_tag);*/
           },
           error: function (response)
           {
                console.log("no img response: "+response);
                $('#'+FACTURA_ID_+cliqId+'').attr('src', NO_IMG_FOUND_DATA);
                $('#'+FACTURA_ID_+cliqId).fadeOut();

           }
           });
     
    
}

function downloadImage(id)
{
    //console.log('downloadChatPostImage...');
    //$('#loading_animation_div').fadeIn();
    //$('#main_div').fadeOut();
    
    var $objJSON;

    var fileName = FACTURA_ID_+id;
    var targetURL = FACTURAS_SERVICE_URL + 'downloadBase64String/' + FACTURAS_SERVICE_FOLDER + '/' + fileName;
    
    console.log("ws call ---> "+targetURL);
    
    $.ajax({
        url: targetURL ,
        type: 'GET',
        dataType: "json",
        applicationType: 'application/json; charset=utf-8',
        success: function (response)
        {
                //console.log("img service response: "+response);
                console.log("service response! ");
                $objJSON = jQuery.parseJSON(response);
                var justTheData = $objJSON.base64String;
                var img_tag = $objJSON.base64String ;
                console.log('drawing base64string image on ---> '+$('#'+FACTURA_ID_+id));
                $('#'+FACTURA_ID_+id+'').attr('src', img_tag);
                $('#'+FACTURA_ID_+id+'').attr('class', "");
                //SAVE_CLIQ_IMAGE(cliqId,img_tag);
           },
           error: function (response)
           {
                console.log("no img response: "+response);
                $('#'+FACTURA_ID_+id+'').attr('src', NO_IMG_FOUND_DATA);
                $('#'+FACTURA_ID_+id).fadeOut();

           }
           });
     
    
}

function uploadImageDATA(id, imageData) {
    //$('#loading_animation_div').fadeIn();
    //$('#main_div').fadeOut();
    
    console.log("uploading Photo ---> [DATA]");
    
    //var image = document.getElementById('myImage');
    //image.src = "data:image/jpeg;base64," + imageData;
    //console.log('base64String:' + imageData);
    
    var fileName = FACTURA_ID_+id;
    
    var credential = { clientId: 666,fileName: 888, fileExtension: 'jpg', base64String: imageData };
    var finalURL = FACTURAS_SERVICE_URL + 'uploadBase64String/' + FACTURAS_SERVICE_FOLDER + '/' + fileName;
    
    console.log("ws call ---> "+ finalURL);
    $.ajax({
        url: finalURL,
        type: 'POST',
        dataType: "json",
        applicationType: 'application/json; charset=utf-8',
        data: JSON.stringify(credential),
        success: function (d)
        {
                /*
                $.each(d, function (index, value)
                {
                $('#results').append('<p>' + value + '</p>');
                });
                */
                console.log('server response: '+ d);
           if(d === true)
           {
                console.log('Upload Success');
                //onViewCliq(_cliqId);
              }
           //
           // SERVER ERROR
           //
           else
           {
                console.log('Not Coded State ---> ' + d);
              }
                //stopLoader();
                //$('#view_cliq_div').fadeOut();
        },
        error: function (xhr, ajaxOptions, thrownError)
        {
                console.log("error trying to upload image:");
                console.log(xhr.status);
                console.log(thrownError);
                //stopLoader();
                //$('#view_cliq_div').fadeOut();
        }
    });

}
console.log('runtime.Registration Done.');
