/*
 * Form modules like title, tags, body, main image
 */

module.exports = PublicLab.Module = Class.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};
    _module.options.required = false; // default

    _module.el = $('.ple-module-' + _module.options.name);


    // All modules must have a module.valid() method
    // which returns true by default (making them optional).
    // Eventually, we might distinguish between empty and invalid.
    _module.valid = function() {

      return true;

    }

    _module.el.find('.ple-help-minor').hide(); 


    $(_module.el).mouseenter(function() { 

      _module.el.find('.ple-help-minor').fadeIn(); 

    });

    $(_module.el).mouseleave(function() { 

      _module.el.find('.ple-help-minor').fadeOut(); 

    });


  }

});
