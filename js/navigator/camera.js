/* ---------------------------------- Global Variables --------------------------------- */
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var navigator_camera = {
    /* --------------------------------- Event Registration -------------------------------- */
    //$(window).on('hashchange', route);
    // Application Constructor
    initialize: function(id) {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        console.log('navigator_camera:initialize(' + id + ')');
    },
    onPhotoDataSuccess: function(imageData) {
      // Uncomment to view the base64-encoded image data
       //console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      //
      // upload image to server
      //
      //facturas_controller.upload(888,imageData);
      uploadImageDATA(444,imageData);
    },
    onPhotoURISuccess: function(imageURI) {
	  // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    },
    capturePhoto: function()
    {
        console.log("capturePhoto");
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(navigator_camera.onPhotoDataSuccess, navigator_camera.onFail, { quality: 5,
        destinationType: destinationType.DATA_URL });
    },
    capturePhotoEdit: function()
    {
        console.log("capturePhotoEdit");
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(navigator_camera.onPhotoDataSuccess, navigator_camera.onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    },
    getPhoto: function(source)
    {
   		// Retrieve image file location from specified source
   		navigator.camera.getPicture(navigator_camera.onPhotoURISuccess, navigator_camera.onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    },
    // Called if something bad happens.
    //
    onFail: function(message)
    {
    	alert('Failed because: ' + message);
    }
};
