PublicLab.Editor = Class.extend({

  init: function(textarea) {

    var editor = this;


    editor.value = function() {

      editor.wysiwyg.value();

    },

    editor.wysiwyg = woofmark(textarea, {

      defaultMode: 'wysiwyg',
      storage:     'ple-woofmark-mode',

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
      attachments: {
      },
*/

      parseMarkdown: function (input) {
        return megamark(input, {
          tokenizers: [{
            token: /(^|\s)@([A-z]+)\b/g,
            transform: function (all, separator, id) {
              return separator + '<a href="/users/' + id + '">@' + id + '</a>';
            }
          }]
        });
      },

      parseHTML: function (input) {
        return domador(input, {
          transform: function (el) {
            if (el.tagName === 'A' && el.innerHTML[0] === '@') {
              return el.innerHTML;
            }
          }
        });
      }

    });

  }

});
