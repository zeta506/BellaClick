/* ---------------------------------- Local Variables ---------------------------------- */
var index_div = "#index_div";
//var HTML_index_template = "<h1>Index</h1>";

var index_controller = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        /*if (navigator.notification) { // Override default HTML alert with native dialog
            navigator.notification.alert("PhoneGap is working", function(){}, "", "");
        }*/
        
    },
    show: function() {
        app.hideAllDivs();
        setTimeout(function() {
            $(index_div).fadeIn();
            $(menu_div).fadeIn();
            $("logos_div").fadeIn();
            //seleccione_pais_controller.show();
            //terminosycondiciones_controller.show();
            //crear_cuenta_controller.show();
        }, 444);
    }
};


var rootdomain="http://"+window.location.hostname

function ajaxinclude(url) {
var page_request = false
if (window.XMLHttpRequest) // if Mozilla, Safari etc
page_request = new XMLHttpRequest()
else if (window.ActiveXObject){ // if IE
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
} 
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
page_request.open('GET', url, false) //get page synchronously 
page_request.send(null)
writecontent(page_request)
}

function writecontent(page_request){
if (window.location.href.indexOf("http")==-1 || page_request.status==200)
document.write(page_request.responseText)
}
