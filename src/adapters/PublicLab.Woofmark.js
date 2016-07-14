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


  _module.options.tags = _module.options.tags || function(value, done) {
    done([
      '#spectrometer', 
      '#air-quality', 
      '#water-quality', 
      '#balloon-mapping' 
    ]);
  }


  _module.options.authors = _module.options.authors || function(value, done) {
    done([
      { value: '@hodor',  text: '@hodor; 1 note'   },
      { value: '@sansa',  text: '@sansa; 2 notes'  },
      { value: '@john',   text: '@john; 4 notes'   },
      { value: '@rob',    text: '@rob; 1 note'     },
      { value: '@rickon', text: '@rickon; 5 notes' },
      { value: '@bran',   text: '@bran; 1 note'    },
      { value: '@arya',   text: '@arya; 2 notes'   }
    ]);
  }

  /*
   Table generation:

  | col1 | col2 | col3 |
  |------|------|------|
  | cell | cell | cell |
  | cell | cell | cell |
  */

  _module.createTable = function(cols, rows) {

    function generateTableMarkdown() {

      var table = "|";
 
      for (var col = 0; col < cols; col++) {
 
        table = table + " col" + col + " |";
 
      }
 
      table = table + "\n|";
 
      for (var col = 0; col < cols; col++) {
 
        table = table + "------|";
 
      }
 
      table = table + "\n";
 
      for (var row = 0; row < rows; row++) {
 
        table = table + "|";
 
        for (var col = 0; col < cols; col++) {
       
          table = table + " cell |";
       
        }
 
        table = table + "\n";
 
      }

      return table + "\n";

    }

    wysiwyg.runCommand(function runner(chunks, mode) {

      if (mode === 'markdown') chunks.before += generateTableMarkdown(rows, cols);
      else {

        chunks.before += _module.wysiwyg.parseMarkdown(generateTableMarkdown(rows, cols));
        setTimeout(_module.afterParse, 0); // do this asynchronously so it applies Boostrap table styling

      }

    });

  }


  // create button for table here


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

      method: 'POST',
 
      // endpoint where the images will be uploaded to, required
      url: '/images',
 
      // optional text describing the kind of files that can be uploaded
      restriction: 'GIF, JPG, and PNG images',
 
      // what to call the FormData field?
      key: 'image[photo]',
 
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
            token: /(^|\s)@([A-z\_]+)\b/g,
            transform: function (all, separator, id) {
              return separator + '<a href="/profile/' + id + '">@' + id + '</a>';
            }
          },
          {
            token: /(^|\s)#([A-z\-]+)\b/g,
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
    suggestions: _module.options.authors,
    set: function (value) {
      if (wysiwyg.mode === 'wysiwyg') {
        textarea.innerHTML = value;
      } else {
        textarea.value = value;
      }
    }
  });

  wysiwyg.calloutBridge = banksy(textarea, {
    editor: wysiwyg,
    horse: wysiwyg.calloutHorse
  });


  wysiwyg.tagHorse = horsey(textarea, {
    anchor: '#',
    suggestions: _module.options.tags,
    set: function (value) {
      el.value = value + ', ';
    }
  });

  wysiwyg.tagBridge = banksy(textarea, {
    editor: wysiwyg,
    horse: wysiwyg.tagHorse
  });


  // styling: 

  $('.wk-commands').after('<span style="padding:10px;display:none;" class="ple-history-saving"><i class="fa fa-clock-o"></i><span class="hidden-xs">Saving...</span></span>');
  $('.wk-commands, .wk-switchboard').addClass('btn-group');
  $('.wk-commands button, .wk-switchboard button').addClass('btn btn-default');

  $('.wk-commands button.woofmark-command-quote').addClass('hidden-xs');
  $('.wk-commands button.woofmark-command-code').addClass('hidden-xs');
  $('.wk-commands button.woofmark-command-ol').addClass('hidden-xs');
  $('.wk-commands button.woofmark-command-attachment').addClass('hidden-xs');

  $('.wk-switchboard button.woofmark-mode-markdown').parent().removeClass('btn-group');
  $('.wk-switchboard button.woofmark-mode-markdown').html('<span class="visible-xs">#</span><span class="hidden-xs">Markdown</span>');
  $('.wk-switchboard button.woofmark-mode-wysiwyg').html('<span class="visible-xs">Aa</span><span class="hidden-xs">Rich</span>');

  if (wysiwyg.mode === 'wysiwyg') $('.wk-switchboard button.woofmark-mode-wysiwyg').hide();
  else                            $('.wk-switchboard button.woofmark-mode-markdown').hide();

  $('.wk-switchboard button').click(function() {
    $('.wk-switchboard button.woofmark-mode-markdown').toggle();
    $('.wk-switchboard button.woofmark-mode-wysiwyg').toggle();
  });

  if (_editor.options.size == "xs") {

    //$('.wk-switchboard button,.wk-commands button').addClass('btn-xs');

    // hide selectively, not by #:
    $('.wk-commands button.woofmark-command-quote').hide();
    $('.wk-commands button.woofmark-command-code').hide();
    $('.wk-commands button.woofmark-command-ol').hide();
    $('.wk-commands button.woofmark-command-ul').hide();

  } else {

    $('.wk-switchboard button').addClass('btn-sm');

  }


  return wysiwyg;

}
