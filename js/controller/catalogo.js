var fileURLStatic = "cdvfile://localhost/persistent";
var fileURL = "/cfr/apps/bellaclick/downloads/catalogos/";
var fileName = "666.jpeg";
var filePathForWriteRead = fileURLStatic + fileURL + fileName;
var TARGET_IMG_ID = 'myImage666';

function ReadSavedFile() {
    console.log("requestFileSystem...");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

    function gotFS(fileSystem) {
        console.log("gotFS...");
        filePathForWriteRead = fileURLStatic + fileURL + fileName;//refresh variable
        fileSystem.root.getFile(filePathForWriteRead, null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        latestExist = true;
        alert('gotFileEntry--->'+fileEntry);
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        console.log("gotFile...");
        readDataUrl(file);
        //readAsText(file);
    }

    function readDataUrl(file) {
        //console.log("readDataUrl file"+file);
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("evt.target.result: "+evt.target.result);
            if(evt.target.result == null) {
               // If you receive a null value the file doesn't exists
               console.log("file doesn't exists!");
            } else {
                // Otherwise the file exists
                console.log("file does exists :'D");
                console.log("Read as data URL");
                console.log(evt.target.result);
                //console.log("0000000000--->");
                var image = document.getElementById(TARGET_IMG_ID);
                image.src = evt.target.result;
            }
        };
        reader.readAsDataURL(file);
    }

    /*function readAsText(file) {
         //console.log("readAsText file"+file);
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            var content = evt.target.result;
            //console.log("content--->"+content);
            var findme = '"base64String":"';
            var indexOFB64SImage = content.indexOf(findme);
            console.log("indexOFB64SImage: "+indexOFB64SImage);
            var res = content.substring(indexOFB64SImage+32, content.length - 2);
            //console.log("res: "+res);
            var image = document.getElementById('myImage666');
            image.src = "data:image/jpeg;"+res;
            console.log("image.src ---> "+image.src )
        };
        reader.readAsText(file);
    }*/

    function fail(evt) {
        console.log("fail no evt");
        console.log(evt.target.error.code);
    }

///
/// Networking GET
///
function GetCatalogPages(catalogId, editionNumber)
{
  //http://webservices.aeonitgroup.com/CatalogService.svc/get-latest-edition/BellaClick
    var GET_CATALOG_PAGES_URL = "http://webservices.aeonitgroup.com/CatalogService.svc/get";
    var urlParams = "/" + catalogId + "/edition/"+ editionNumber;
    var $type = 'GET',
    $url = GET_CATALOG_PAGES_URL + urlParams,
    $data = "",
    $objJSON;
    
    console.log('Get Catalog Pages: Trying to connect webservice --> ' + GET_CATALOG_PAGES_URL);
    
    $objJSON = getJSONData($type, $url, $data);
    //
    // SERVER RESPONSE?
    //
    
    if ($objJSON == null) {
        
        CordovaDialog("Error", "Internet connection not found", "OK");
        
        return false;
        
        //
        // ELSE SERVER RESPONSE IS VALID
        //
    }
    else {
        
        console.log($objJSON);
        
        if($objJSON != false)
        {
            console.log("drawing catalog pages on screen...");
            //var $json = jQuery.parseJSON($objJSON);
            var counter = 1;
            
            var downloadURL = "";
            var fileName = "";
            var fileExt = "";
            var pageNo = "";
            $.each($objJSON, function (i, item) {
                   downloadURL = $objJSON[i].DownloadUrl;
                   fileName = $objJSON[i].FileName;
                   fileExt = $objJSON[i].FileExt;
                   pageNo = $objJSON[i].PageNo;
                   catalogo_controller.sync666(fileName+fileExt, downloadURL, "catalog_pagina_no_"+pageNo);
            });
        }
        else
        {
            html += "<h1>No pages were found</h1>";
        }

        $('#catalogPagesSection').html(html);
        //stopLoader();
    }
}

var catalogo_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('catalogo_controller:initialize(' + id + ')');
    },
    save: function (catalogId, pageId, downloadUrl, fileNameWext)
    {
        console.log("catalogo_controller:save");
        var previousInfo = RetrieveLogInfo("CATALOG_ID_"+catalogId);
        var CSVItem = pageId + "_" + soundId + "_" + fileNameWext;
        var value = "";
        //console.log("previousInfo => "+previousInfo);
        
        if(previousInfo == null)
            value = CSVItem;
        else
            value = CSVItem + "," + previousInfo;
        
        console.log("Catalog (page) added ==> " + CSVItem);
        
        LocalStorageCreateKey("CATALOG_ID_"+catalogId, value);
    },
    sync666: function(fn, imageUrl, html_image_id)
    {
        fileName = fn;
        // !! Assumes variable fileURL contains a valid URL to a path on the device,
        //    for example, cdvfile://localhost/persistent/path/to/downloads/
        //var fileURL = "cdvfile://localhost/persistent/cfr/apps/bellaclick/downloads/catalogos/CLIQ_CHAT_IMAGE_POST_ID_116.json";
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(imageUrl);
        fileTransfer.onprogress = function(progressEvent) {
            
            if (progressEvent.lengthComputable) {
                
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                $("#loaderDetails").html("<h1>" + perc + "%</h1>");
                //console.log(perc + "%");
                
            } else {
                
                $("#loaderDetails").append(".");
                //console.log(".");
                
            }
        };
        filePathForWriteRead = fileURLStatic + fileURL + fileName;//refresh variable
        fileTransfer.download(
            uri,
            filePathForWriteRead,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
                 //filePathForWriteRead = fileURLStatic + entry.fullPath;
                 //TARGET_IMG_ID = 'myImage666';
                //ReadSavedFile();
                var image = document.getElementById(html_image_id);
                image.src = imageUrl;
                console.log("image.src ---> "+image.src );
                save (catalogId, pageId, downloadUrl, fileNameWext);
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            },
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );
    },
    getcatalog: function(catalogId,editionId)
    {
        console.log("catalogo_controller.getcatalog");
        GetCatalogPages(catalogId,editionId);
        console.log("getcatalog END");
    },
    refresh: function()
    {
        catalogo_controller.getcatalog(1,1);
        /*var latestExist = false;
        if(latestExist)
            ReadSavedFile();
        else
            catalogo_controller.sync666("Bender_Retina.jpeg", "http://3.bp.blogspot.com/-otDesu1073I/Ueq9O75eWgI/AAAAAAAAFLk/riXFKCuJB8g/s1600/iphone+5+retina+display+wallpapers+(1).jpeg");
        */
        
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(catalogo_div).html(HTML_catalogo_template);
            $(catalogo_div).fadeIn();
        }, 444);
    }
};
