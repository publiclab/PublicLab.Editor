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
    _module.options.instructions = 'This adds a Map to the Editor with marker on it ' ;
    _module._super(_editor, _module.options) ;
    _module.options.required = false;
     /*
      if lat and lon are present --> show simple map !
      else

     */

     _module.value = function(){
       
     }

  }
}) ;
