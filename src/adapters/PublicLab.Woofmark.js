/*
 * Wrapped woofmark() constructor with 
 * customizations for our use case
 */

var woofmark     = require('woofmark'),
    domador      = require('domador'),
    megamark     = require('megamark');
    
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
