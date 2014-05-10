var facturas_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('facturas_controller:initialize(' + id + ')');
        //navigator_camera.initialize(id);
    },
    upload: function(id, imageData) {
        console.log('facturas_controller:uploadImage(' + id + ')');
        //console.log(imageData);
        var fileName = FACTURA_ID_+id;
        var factura = { id: id, fileName: fileName, fileExtension: 'jpg', base64String: imageData };
        var finalURL = FACTURAS_SERVICE_URL + 'uploadBase64String/' + FACTURAS_SERVICE_FOLDER + '/' + fileName;
        //var finalURL = FACTURAS_SERVICE_URL + 'uploadBase64String/' + fileName;
        console.log("ws call ---> "+ finalURL);
        app.hideAllDivs();
        $.ajax({
            url: finalURL,
            type: 'POST',
            dataType: "json",
            applicationType: 'application/json; charset=utf-8',
            data: JSON.stringify(factura),
            success: function (d)
            {
                console.log('server response: '+ d);
               if(d === true)
               {
                    //cordovaDialog('BellaClick', 'Upload Success','OK');
                }
               //
               // SERVER ERROR
               //
               else
               {
                    //cordovaDialog('BellaClick', d, 'OK');
                  }
                    console.log('success!');
                    facturas_controller.show();
               
               //
               //$('#loading_animation_div').fadeOut();
               //$('#main_div').fadeIn();
            },
            error: function (xhr, ajaxOptions, thrownError)
            {
                    console.log("error trying to upload image:");
                    console.log(xhr.status);
                    console.log(thrownError);
                    facturas_controller.show();
            }
        });
    },
    download: function(id)
    {
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
                //console.log("server response ---> "+response );
                $objJSON = jQuery.parseJSON(response);
                /*console.log("$json response ---> "+$objJSON );
                var justTheData = $objJSON.base64String;
                var img_tag = $objJSON.base64String ;
                console.log('drawing base64string image on ---> '+$('#'+FACTURA_ID_+id+''));
                $('#'+FACTURA_ID_+id+'').attr('src', img_tag);
                $('#'+FACTURA_ID_+id+'').attr('class', "");
                
                //SAVE_CHAT_POST_IMAGE(id,img_tag);
                //console.log('value updated');*/
           
           },
           error: function (response)
           {
                console.log("no img response: "+response);
                /*$('#'+FACTURA_ID_+id+'').attr('src', NO_IMG_FOUND_DATA);
                $('#'+FACTURA_ID_+id).fadeOut();
                */
           }
       });
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(facturas_div).html(HTML_facturas_template);
            $(facturas_div).fadeIn();
        }, 444);
    }
};
