/*
 * Form module for main post image
 */

module.exports = PublicLab.MainImageModule = PublicLab.Module.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};
    _module.options.name = 'main_image';
    _module.options.instructions = 'Choose an image. <br /><a href="">Image tips &raquo;</a>';

    _module._super(_editor, _module.options);

    _module.key = 'main_image_url';
    _module.value = function() {

/////////// get this to return the image object?
      return false;

    }

    // construct HTML additions
    _module.build();


  }

});
