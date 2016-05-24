/*
 * Form module for rich text entry
 */

var crossvent    = require('crossvent');

module.exports = PublicLab.RichTextModule = PublicLab.Module.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};
    _module.options.name = "body";
    _module.options.instructions = "Describe your work in a way that others can understand.";
    _module.options.guides = [
      { 
        icon: "mouse-pointer", 
        position: 30, 
        text: "Drag images into the textarea to upload them."
      },
      { 
        icon: "list-ul",
        position: 90, 
        text: "Show people how to do what you've done; list required materials and resources."
      },
      { 
        icon: "clock-o",
        position: 90, 
        text: "Your work is auto-saved so you can return to it in this browser. To recover drafts, open the <code>...</code> menu below."
      }
    ];


    _module._super(_editor, _module.options);

    // customize options after Module defaults set in _super()
    _module.options.required = true;

    // should be switchable for other editors:
    _module.wysiwyg = options.wysiwyg || PublicLab.Woofmark(options.textarea, _editor, _module);

    _module.editable = _module.wysiwyg.editable;
    _module.textarea = _module.wysiwyg.textarea;

    _module.key = 'body';
    _module.value = function(text) {

      // woofmark automatically returns the markdown, not rich text:
      if (typeof text === 'string') return _module.wysiwyg.value(text);
      else                          return _module.wysiwyg.value();

    }


    _module.valid = function() {

      return _module.value() != "";

    }


    // construct HTML additions
    _module.build();


// bootstrap styling for plots2 (remove later)
$('table').addClass('table');


    _module.setMode = function(mode) {

      return _module.wysiwyg.setMode(mode);

    }


    _module.height = function() {

      var height;

      if (_module.wysiwyg.mode == "wysiwyg") height = $('.wk-wysiwyg').height();
      else                                   height = $('.ple-textarea').height();

      return height;

    }


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
