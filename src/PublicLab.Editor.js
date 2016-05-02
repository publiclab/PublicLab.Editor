PublicLab.Editor = Class.extend({

  init: function(textarea) {

    var editor = this;

    editor.wysiwyg = woofmark(textarea, {

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
