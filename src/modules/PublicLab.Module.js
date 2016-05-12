/*
 * Form modules like title, tags, body, main image
 */

module.exports = PublicLab.Module = Class.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};

    _module.el = $('.ple-module-' + _module.options.name);


    // All modules must have a module.valid() method
    // which returns true by default (making them optional).
    // Eventually, we might distinguish between empty and invalid.
    _module.valid = function() {

      return true;

    }


    // show extras button on hover:
    // this won't work in xs compact state...

    $('.ple-module').mouseenter(function(e) {

      $(this).find('.ple-btn-more').fadeOut();

    });

    $('.ple-module').mouseleave(function(e) {

      $(this).find('.ple-btn-more').fadeOut();

    });


  }

});
