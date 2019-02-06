/*
      MapModule for adding Map .
      Adds/Removes Tag lat:XX , lon:XX from TagsModule .
*/

module.exports = PublicLab.MapModule = PublicLab.Module.extend({

  init: function( _editor , options) {

    var _module = this ;

    _module.key = 'map_data' ;
    _module.options = options || _editor.options.mapModule || {};
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

     _module.blurredLocation = new BlurredLocation(options) ;
        
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
