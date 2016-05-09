// can we require things that rely on 
// document, but still be runnable in nodejs?
// if (!this.hasOwnProperty('document') document 

$ = require('jquery');
var Class        = require('resig-class');
    crossvent    = require('crossvent');

PL = PublicLab = {};
module.exports = PL;

PL.Util = require('./core/Util.js');
PL.Formatter = require('./adapters/PublicLab.Formatter.js');
PL.Woofmark  = require('./adapters/PublicLab.Woofmark.js');


PL.Editor = Class.extend({

  init: function(options) {

    var editor = this;


    /*########################
     * Set up DOM stuff
     */

    editor.growTextarea = require('grow-textarea');

    $(document).ready(function() {

// TEMPORARY: run during validations?
$('.ple-title input').on('keydown', function(e) {
  $('.ple-publish').removeClass('disabled');
  $('.ple-steps-left').html(1);
});

      editor.resize();

      // once woofmark's done with the textarea, this is triggered
      // using woofmark's special event system, crossvent
      // -- move this into the Woofmark adapter initializer
      crossvent.add(options.textarea, 'woofmark-mode-change', function (e) {

        editor.resize();

        // ensure document is scrolled to the same place:
        document.body.scrollTop = editor.scrollTop;
        // might need to adjust for markdown/rich text not 
        // taking up same amount of space, if menu is below editor...
        //if (editor.wysiwyg.mode == "markdown") 

      });

      $(options.textarea).on('change keydown', function(e) {
        editor.resize();
      });

    });



    // Make textarea match content height
    editor.resize = function() {

      editor.growTextarea(options.textarea, { extra: 10 });

    }


    editor.data = {

      title: null,
      body:  null,
      tags:  null,          // comma-delimited list; this should be added by a PL.Editor.MainImage module
      main_image_url: null // this should be added by a PL.Editor.MainImage module

    }

    // Update data based on passed options.data
    for (var attrname in options.data) {
      editor.data[attrname] = options.data[attrname];
    }


    // Method to fetch the Markdown contents of the WYSIWYG textarea
    editor.value = function() {

      return editor.wysiwyg.value();

    }


    editor.wysiwyg = PublicLab.Woofmark(options.textarea, editor);


  }

});
