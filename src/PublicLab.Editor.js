$ = require('jquery');
var woofmark     = require('woofmark'),
    domador      = require('domador'),
    megamark     = require('megamark'),
    Class        = require('resig-class');
    crossvent    = require('crossvent');

PL = {};
module.exports = PL;

PL.Util = require('./core/Util.js');

PL.Editor = Class.extend({

  init: function(textarea) {

    var editor = this;

    editor.textarea = textarea;
    editor.growTextarea = require('grow-textarea');

    // wait until document.body exists:
    $(document).ready(function() {

      editor.resize();

      // once woofmark's done with the textarea
      crossvent.add(textarea, 'woofmark-mode-change', function (e) {
        editor.resize();
        // ensure document is scrolled to the same place:
        document.body.scrollTop = editor.scrollTop;
        // might need to adjust for markdown/rich text not 
        // taking up same amount of space, if menu is below editor...
        //if (editor.wysiwyg.mode == "markdown") 
      });

      $(editor.textarea).on('change keydown', function(e) {
        editor.resize();
      });

    });



    // make textarea match content height:
    editor.resize = function() {

      editor.growTextarea(editor.textarea, { extra: 10 });

    }


    editor.post = {

      title: "",
      body: "",
      tags: "",          // comma-delimited list; this should be added by a PL.Editor.MainImage module
      main_image_url: "" // this should be added by a PL.Editor.MainImage module

    }

/*
Parameters for plots2: {
"authenticity_token"=>"uaX2OVOswwmJxNIBXyHOoBAIeYdKRu+LyVTrUAnEsLI=", 
"title"=>"Test post", 
"body"=>"###What I want to do\r\n\r\n###My attempt and results\r\n\r\n###Questions and next steps\r\n\r\n###Why I'm interested", 
"tags"=>"", 

"image"=>{"photo"=>""}, 
"has_main_image"=>"", 
"main_image"=>"", 
"node_images"=>"", 
"remote"=>"true", 
"date"=>"04-25-2016"
} 
*/

    // Method to fetch the Markdown contents of the WYSIWYG textarea
    editor.value = function() {

      return editor.wysiwyg.value();

    }

    editor.wysiwyg = woofmark(textarea, {

      defaultMode: 'wysiwyg',
      storage:     'ple-woofmark-mode',
      xhr:         require('xhr'),

      render: {

        modes: function (button, id) {
          button.className = 'woofmark-mode-' + id;
          if (id == 'html')     button.innerHTML = "Preview";
          if (id == 'markdown') button.innerHTML = "Markdown";
          if (id == 'wysiwyg')  button.innerHTML = "Rich";
        }
/*
        commands: function (button, id) {
          button.className = 'woofmark-command-' + id;
        }
*/

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

/*
      // for handling non-image uploads
      // -- need to insert icon, maybe, or do it in CSS
      attachments: {
      },
*/

      parseMarkdown: function (input) {

        editor.scrollTop = document.body.scrollTop;

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

        editor.scrollTop = document.body.scrollTop;

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

  }

});
