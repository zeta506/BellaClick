var app = {
    /* ---------------------------------- Local Variables ---------------------------------- */
    //var homeTpl = Handlebars.compile($("#home-tpl").html());

    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route)

    // Application Constructor
    initialize: function() {
        /* --------------------------------- Cordova Initialize -------------------------------- */
        this.bindEvents();console.log('app.device');
        //this.onDeviceReady();console.log('app.desktop.debug');
    },
    // Application Constructor
    hideAllDivs: function() {
        $(index_div).fadeOut();
        $(control_de_toma_div).fadeOut();
        $(catalogo_div).fadeOut();
        $(facturas_div).fadeOut();
        $(farmacias_div).fadeOut();
        $(moodchart_div).fadeOut();
        //$(terminosycondiciones_div).fadeOut();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var id = 'deviceready';
        FastClick.attach(document.body);
        console.log('FastClick.attach Done.');
        //check for terms & conditions
        terminosycondiciones_controller.initialize(id);
        //if terms accepted
        index_controller.initialize(id);
        controldetoma_controller.initialize(id);
        catalogo_controller.initialize(id);
        facturas_controller.initialize(id);
        farmacias_controller.initialize(id);
        moodchart_controller.initialize(id);
        console.log('Controllers.initialize Done.');

        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var context = {
          people: [
            "Yehuda Katz",
            "Alan Johnson",
            "Charles Jolley"
          ]
        };
        var html    = template(context);
        $("#templateSection").html(html);
        console.log('Handlebars.initialize Done.');

        gmapsPlacesInitialize();
        //downloadCliqImage(49);
        downloadImage(666);

        //
        // DELETE TERMS (TEST - ONLY)
        //
        //jasminLocalStorageDeleteKey(TERMINOS_ACEPTADOS);
        console.log('GoogleMapsPlaces.initialize Done.');
    }
};
