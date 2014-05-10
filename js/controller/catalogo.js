var fileURLStatic = "cdvfile://localhost/persistent/";
var fileURL = "cfr/apps/bellaclick/downloads/catalogos/Bender_Retina.jpeg";
var fileURLForDownload=fileURLStatic+fileURL;

function ReadSavedFile() {
    console.log("requestFileSystem...");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

    function gotFS(fileSystem) {
        console.log("gotFS...");
        //var fileURL = "cfr/apps/bellaclick/downloads/catalogos/CLIQ_CHAT_IMAGE_POST_ID_116.json";
        fileSystem.root.getFile(fileURL, null, gotFileEntry, fail);
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
                var image = document.getElementById('myImage666');
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

var catalogo_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        console.log('catalogo_controller:initialize(' + id + ')');
    },
    save: function (packageId, soundId, soundPath)
    {
        console.log("catalogo_controller:save");
        var previousInfo = RetrieveLogInfo(SOUND_PACKAGE+packageId);
        var CSVItem = packageId + "_" + soundId + "_" + soundPath;
        var value = "";
        //console.log("previousInfo => "+previousInfo);
        
        if(previousInfo == null)
            value = CSVItem;
        else
            value = CSVItem + "," + previousInfo;
        
        console.log("Package (sound) added ==> " + CSVItem);
        
        LocalStorageCreateKey(SOUND_PACKAGE+packageId, value);
    },
    sync666: function()
    {
        // !! Assumes variable fileURL contains a valid URL to a path on the device,
        //    for example, cdvfile://localhost/persistent/path/to/downloads/
//var fileURL = "cdvfile://localhost/persistent/cfr/apps/bellaclick/downloads/catalogos/CLIQ_CHAT_IMAGE_POST_ID_116.json";

var bender_image_uri = "http://3.bp.blogspot.com/-otDesu1073I/Ueq9O75eWgI/AAAAAAAAFLk/riXFKCuJB8g/s1600/iphone+5+retina+display+wallpapers+(1).jpeg";
var json_image_uri = "http://public.aeonitgroup.com/CFR/CLIQ_CHAT_IMAGE_POST_ID_116.json";

        var fileTransfer = new FileTransfer();
        var uri = encodeURI(bender_image_uri);
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
        fileTransfer.download(
            uri,
            fileURLForDownload,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
                //ReadSavedFile();
                var image = document.getElementById('myImage666');
                image.src = fileURLForDownload;
                console.log("image.src ---> "+image.src );
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
    sync: function(uri, fileName, fileType)
    {
        // !! Assumes filePath is a valid path on the device

        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://public.aeonitgroup.com/CFR/CLIQ_CHAT_IMAGE_POST_ID_116.json");
        var filePath = "CLIQ_CHAT_IMAGE_POST_ID_116.json"; // the key factor !!!
        console.log("filePath ---> "+ filePath);
        fileTransfer.download(
            uri,
            filePath,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
                /*
                                    //
                    //SAVING LOCAL REF OF FILE
                    //
                    //AddSoundToPackage(1,"download2",entry.toURL);
                    catalogo_controller.save(1,fileName,downloadPath);
                    if(fileType == "jpg")
                    {
                       var image = document.getElementById('myImage666');
                        image.src = downloadPath;
                    }
                    else
                    {
                        alert("cant process type "+ fileType);
                    }
                        //
                    $('#catalogo_div').fadeIn();
                    */
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
        console.log("FT END");
    },
    refresh: function()
    {
        console.log("checking if file exists...");
        var latestExist = true;
        if(latestExist)
            ReadSavedFile();
        else
            catalogo_controller.sync666();
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            //$(catalogo_div).html(HTML_catalogo_template);
            $(catalogo_div).fadeIn();
        }, 444);
    }
};
