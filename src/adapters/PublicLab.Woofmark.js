/*
 * Wrapped woofmark() constructor with 
 * customizations for our use case
 */

var woofmark     = require('woofmark'),
    domador      = require('domador'),
    megamark     = require('megamark'),
    horsey       = require('horsey'),
    banksy       = require('banksy');
    
module.exports = function(textarea, _editor, _module) {

  var icons = {

    'quote': 'quote-right',
    'ol': 'list-ol',
    'ul': 'list-ul',
    'heading': 'header',
    'attachment': 'paperclip'

  }

  var wysiwyg = woofmark(textarea, {

    defaultMode: 'wysiwyg',
    fencing:     true,
    storage:     'ple-woofmark-mode',
    xhr:         require('xhr'),

    render: {

      modes: function (button, id) {

        button.className = 'woofmark-mode-' + id;
        if (id == 'html')     $(button).remove();
        if (id == 'markdown') button.innerHTML = "Markdown";
        if (id == 'wysiwyg')  button.innerHTML = "Rich";

      },

      commands: function (button, id) {

        button.className = 'woofmark-command-' + id;
        var icon = icons[id] || id;
        button.innerHTML = '<i class="fa fa-' + icon + '"></i>';

      }

    },

    images: {
 
      // endpoint where the images will be uploaded to, required
      url: '/images',
 
      // optional text describing the kind of files that can be uploaded
      restriction: 'GIF, JPG, and PNG images',
 
      // what to call the FormData field?
      key: 'main_image',
 
      // should return whether `e.dataTransfer.files[i]` is valid, defaults to a `true` operation
      validate: function isItAnImageFile (file) {
        return /^image\/(gif|png|p?jpe?g)$/i.test(file.type);
      }

    },


    // for handling non-image uploads
    // -- need to insert icon, maybe, or do it in CSS
    attachments: {
    },


    parseMarkdown: function (input) {

      _module.scrollTop = document.body.scrollTop;

      return megamark(input, {
        tokenizers: [
          {
            token: /(^|\s)@([A-z]+)\b/g,
            transform: function (all, separator, id) {
              return separator + '<a href="/profile/' + id + '">@' + id + '</a>';
            }
          },
          {
            token: /(^|\s)#([A-z]+)\b/g,
            transform: function (all, separator, id) {
              return separator + '<a href="/tag/' + id + '">#' + id + '</a>';
            }
          }
        ]
      });

    },

    parseHTML: function (input) {

      _module.scrollTop = document.body.scrollTop;

      return domador(input, {
        fencing:   true,
        fencinglanguage: function (el) {
          var match = el.className.match(/md-lang-((?:[^\s]|$)+)/);
          if (match) {
            return match.pop();
          }
        },
        transform: function (el) {

          if (el.tagName === 'A' && el.innerHTML[0] === '@') {
            return el.innerHTML;
          }

          if (el.tagName === 'A' && el.innerHTML[0] === '#') {
            return el.innerHTML;
          }

        }
      });

    } 

  });


  //wysiwyg.calloutHorse = horsey(textarea, {
  wysiwyg.calloutHorse = horsey(wysiwyg.editable, {
    anchor: '@',
    suggestions: [
      { value: '@hodor',  text: '@hodor; 1 note'   },
      { value: '@sansa',  text: '@sansa; 2 notes'  },
      { value: '@john',   text: '@john; 4 notes'   },
      { value: '@rob',    text: '@rob; 1 note'     },
      { value: '@rickon', text: '@rickon; 5 notes' },
      { value: '@bran',   text: '@bran; 1 note'    },
      { value: '@arya',   text: '@arya; 2 notes'   }
    ],
    set: function (value) {
      if (wysiwyg.mode === 'wysiwyg') {
        textarea.innerHTML = value;
      } else {
        textarea.value = value;
      }
    }
  });
  wysiwyg.bridge = banksy(textarea, {
    editor: wysiwyg,
    horse: wysiwyg.calloutHorse
  });
/*
  wysiwyg.tagHorse = horsey(textarea, {
    anchor: '#',
    suggestions: [
      '#spectrometer', 
      '#air-quality', 
      '#water-quality', 
      '#balloon-mapping' 
    ],
    set: function (value) {
      el.value = value + ', ';
    }
  });
  wysiwyg.bridge = banksy(textarea, {
    editor: wysiwyg,
    horse: wysiwyg.tagHorse
  });
*/


  $('.wk-commands').after('<span style="padding:10px;display:none;" class="ple-history-saving"><i class="fa fa-clock-o"></i><span class="hidden-xs">Saving...</span></span>');
  $('.wk-commands, .wk-switchboard').addClass('btn-group');
  $('.wk-commands button, .wk-switchboard button').addClass('btn btn-default');

  if (_editor.options.size == "xs") {

    //$('.wk-switchboard button,.wk-commands button').addClass('btn-xs');

    // hide selectively, not by #:
    $('.wk-commands button.woofmark-command-quote').hide();
    $('.wk-commands button.woofmark-command-code').hide();
    $('.wk-commands button.woofmark-command-ol').hide();
    $('.wk-commands button.woofmark-command-ul').hide();
    $('.wk-switchboard button.woofmark-mode-markdown').html("MD");

  } else {

    $('.wk-switchboard button').addClass('btn-sm');

  }


  return wysiwyg;

}
