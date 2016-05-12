var crossvent    = require('crossvent');

/*
 * Form module for post body
 */

module.exports = PublicLab.BodyModule = PublicLab.Module.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};
    _module.options.name = "body";
    _module.options.required = true;

    _module._super(_editor, _module.options);


    // should be switchable for other editors:
    _module.wysiwyg = options.wysiwyg || PublicLab.Woofmark(options.textarea, _editor, _module);

    _module.key = "body";
    _module.value = function() {

      return _module.wysiwyg.value();

    }


// bootstrap styling for plots2 (remove later)
$('table').addClass('table');


    var growTextarea = require('grow-textarea');

    // Make textarea match content height
    _module.resize = function() {

      growTextarea(options.textarea, { extra: 10 });

    }

    _module.resize();

    // once woofmark's done with the textarea, this is triggered
    // using woofmark's special event system, crossvent
    // -- move this into the Woofmark adapter initializer
    crossvent.add(options.textarea, 'woofmark-mode-change', function (e) {

      _module.resize();

      // ensure document is scrolled to the same place:
      document.body.scrollTop = _module.scrollTop;
      // might need to adjust for markdown/rich text not 
      // taking up same amount of space, if menu is below _editor...
      //if (_editor.wysiwyg.mode == "markdown") 

    });

    $(options.textarea).on('change keydown', function(e) {
      _module.resize();
    });


  }

});
