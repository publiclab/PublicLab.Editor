/*
      MapModule for adding Map .
      Adds/Removes Tag lat:XX , lon:XX from TagsModule .
*/

module.exports = PublicLab.MapModule = PublicLab.Module.extend({

  init: function( _editor , options) {

    var _module = this ;

    _module.key = 'map_data' ;
    _module.options = options || _editor.options.mapModule || {};
    if (_module.options === true) _module.options = {}; // so we don't make options be /true/
    _module.options.name = 'map' ;
    _module.options.instructions = 'Add a map to your note. Learn about <a href="https://publiclab.org/location-privacy">location privacy here</a>' ;
    _module._super(_editor, _module.options) ;
    _module.options.required = false;

     var options = {
       InterfaceOptions: {
         latId: 'lat',
         lngId: 'lng'
       }
     }


     var token = "pk.eyJ1Ijoianl3YXJyZW4iLCJhIjoiVzVZcGg3NCJ9.BJ6ArUPuTs1JT9Ssu3K8ig";

      options.tileLayerUrl = _editor.options.tileLayerUrl || 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=' + token;

     _module.blurredLocation = new BlurredLocation(options) ;

      if (!!_editor.options.lat && !!_editor.options.lon) {
         // show map on loading.
        $("#map_content").show();
        _module.blurredLocation.goTo(_editor.options.lat, _editor.options.lon, _editor.options.zoom || 5 );
      } else {
        // hide map on loading.
         $("#map_content").hide();
      }

      $("#location_button").click(function() {
            $("#map_content").toggle();
      });

        //check if "google" is defined PLOTS2#4717
    window.hasOwnProperty('google')
      ? _module.blurredLocation.panMapToGeocodedLocation("placenameInput")
      : console.log("`google` is not defined! PublicLab.MapModule.js#28");

     _module.blurredLocation.setBlurred(false) ;

     _module.value = function(){
       if($("#map_content").is(':visible')){
         return true ;
       }
       else{
         return false ;
       }
     }

     // construct HTML additions
     _module.build();

  }
}) ;
