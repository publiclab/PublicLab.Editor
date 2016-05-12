// can we require things that rely on 
// document, but still be runnable in nodejs?
// if (!this.hasOwnProperty('document') document 

window.$ = window.jQuery = require('jquery')
var bootstrap = require('../node_modules/bootstrap/dist/js/bootstrap.min.js', function() {
  
});

var Class        = require('resig-class');

PL = PublicLab = {};
module.exports = PL;

PL.Util            = require('./core/Util.js');
PL.Formatter       = require('./adapters/PublicLab.Formatter.js');
PL.Woofmark        = require('./adapters/PublicLab.Woofmark.js');
PL.History         = require('./PublicLab.History.js');
PL.Help            = require('./PublicLab.Help.js');
PL.Module          = require('./modules/PublicLab.Module.js');
PL.TitleModule     = require('./modules/PublicLab.TitleModule.js');
PL.MainImageModule = require('./modules/PublicLab.MainImageModule.js');
PL.BodyModule      = require('./modules/PublicLab.BodyModule.js');


PL.Editor = Class.extend({

  init: function(options) {

    var _editor = this;
    _editor.options = options;


    // Validation:
    // Count how many required modules remain for author to complete:
    _editor.validate = function() {

      var valid_modules    = 0,
          required_modules = 0;

      Object.keys(_editor.modules).forEach(function(key, i) {

        if (_editor.modules[key].options.required) {
          required_modules += 1;
          if (_editor.modules[key].valid()) valid_modules += 1;
        }

      });

      if (valid_modules == required_modules) {

        $('.ple-publish').removeClass('disabled');

      }

      $('.ple-steps-left').html(valid_modules + ' of ' + required_modules);

    }

    $('.ple-editor *').focusout(_editor.validate);


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


    _editor.history = new PublicLab.History(_editor);

    _editor.modules = {};
    _editor.modules.titleModule     = new PublicLab.TitleModule(_editor);
    _editor.modules.mainImageModule = new PublicLab.MainImageModule(_editor);
    _editor.modules.bodyModule      = new PublicLab.BodyModule(_editor, { textarea: _editor.options.textarea });

    _editor.help = new PublicLab.Help(_editor);


  }

});
