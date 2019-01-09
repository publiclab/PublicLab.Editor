/*
      MapModule for adding Map .
      Adds/Removes Tag lat:XX , lon:XX from TagsModule .
*/
require('leaflet-blurred-location') ;
module.exports = PublicLab.MapModule = PublicLab.Module.extend({

  init: function( _editor , options) {

    var _module = this ;

    _module.key = 'map_data' ;
    _module.options = options || _editor.options.mapModule || {};
    _module.options.name = 'map' ;
    _module.options.instructions = 'This adds a Map to the Editor with marker on it ' ;
    _module._super(_editor, _module.options) ;
    _module.options.required = false;

     var options = {
       InterfaceOptions: {
         latId: 'lat',
         lngId: 'lng'
       }
     }

     _module.blurredLocation = new BlurredLocation(options) ;

     _module.blurredLocation.panMapToGeocodedLocation("placenameInput") ;
     _module.blurredLocation.setBlurred(false) ;

     _module.value = function(){
       if($("#checkbox").is(":checked")){
        return true ;
       }
       else{
         return false ;
       }
     }

  }
}) ;
