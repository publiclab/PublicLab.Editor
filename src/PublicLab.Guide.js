/*
 * UI guides to display in sidebar of a given module
 */
var Class = require('resig-class').Class;

module.exports = PublicLab.Guide = Class.extend({

  init: function(_editor, options) {
    var _guide = this;

    _guide.options = options || {};
  }

});
