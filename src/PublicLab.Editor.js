// can we require things that rely on 
// document, but still be runnable in nodejs?
// if (!this.hasOwnProperty('document') document 

window.$ = window.jQuery = require('jquery')
var bootstrap = require('../node_modules/bootstrap/dist/js/bootstrap.min.js', function() {
  
});

var Class        = require('resig-class');
    crossvent    = require('crossvent');

PL = PublicLab = {};
module.exports = PL;

PL.Util      = require('./core/Util.js');
PL.Formatter = require('./adapters/PublicLab.Formatter.js');
PL.Woofmark  = require('./adapters/PublicLab.Woofmark.js');
PL.History   = require('./PublicLab.History.js');
PL.Help      = require('./PublicLab.Help.js'); // ui?


PL.Editor = Class.extend({

  init: function(options) {

    var _editor = this;
    _editor.options = options;


    /*########################
     * Set up DOM stuff
     */

    _editor.growTextarea = require('grow-textarea');


    // Make textarea match content height
    _editor.resize = function() {

      _editor.growTextarea(options.textarea, { extra: 10 });

    }

// TEMPORARY: run during validations?
$('.ple-title input').on('keydown', function(e) {
  $('.ple-publish').removeClass('disabled');
  $('.ple-steps-left').html(1);
});

    _editor.resize();

    // once woofmark's done with the textarea, this is triggered
    // using woofmark's special event system, crossvent
    // -- move this into the Woofmark adapter initializer
    crossvent.add(options.textarea, 'woofmark-mode-change', function (e) {

      _editor.resize();

      // ensure document is scrolled to the same place:
      document.body.scrollTop = _editor.scrollTop;
      // might need to adjust for markdown/rich text not 
      // taking up same amount of space, if menu is below _editor...
      //if (_editor.wysiwyg.mode == "markdown") 

    });

    $(options.textarea).on('change keydown', function(e) {
      _editor.resize();
    });


    _editor.data = {

      title: null,
      body:  null,
      tags:  null,          // comma-delimited list; this should be added by a PL.Editor.MainImage module
      main_image_url: null // this should be added by a PL.Editor.MainImage module

    }

    // Update data based on passed options.data
    for (var attrname in options.data) {
      _editor.data[attrname] = options.data[attrname];
    }


    // Method to fetch the Markdown contents of the WYSIWYG textarea
    _editor.value = function() {

      return _editor.wysiwyg.value();

    }


    _editor.wysiwyg = PublicLab.Woofmark(options.textarea, _editor);

    _editor.history = new PublicLab.History(_editor);
    _editor.help = new PublicLab.Help(_editor);

    // testing plots2 bootstrap styling
    $('table').addClass('table');

  }

});
