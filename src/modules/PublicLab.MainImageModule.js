require('blueimp-file-upload');
/*
 * Form module for main post image
 */

module.exports = PublicLab.MainImageModule = PublicLab.Module.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};
    _module.options.name = 'main_image';
    _module.options.instructions = 'Choose an image to be used as a thumbnail for your post. <br /><a href="">Image tips &raquo;</a>';

    _module._super(_editor, _module.options);

    _module.focusables.push(_module.el.find('input'));

    _module.key = 'main_image_url';
    _module.value = function() {

/////////// get this to return the image object?
      return _module.image;

    }

    // construct HTML additions
    _module.build();


    _module.dropEl = _module.el.find('.ple-drag-drop');

    _module.dropEl.bind('dragover',function(e) {
      e.preventDefault();
      // create relevant styles in sheet
      _module.dropEl.addClass('hover');
    });

    _module.dropEl.bind('dragout',function(e) {
      _module.dropEl.removeClass('hover');
    });

    _module.dropEl.bind('drop',function(e) {
      e.preventDefault();
    });


    _module.dropEl.fileupload({

      url: "/images",
      paramName: "image[photo]",
      dropZone: _module.dropEl,
      dataType: 'json',

      formData: {
        'uid': _module.options.uid,
        'nid': _module.options.nid
      },

      start: function(e) {

        _module.el.find('.progress .progress-bar')
                  .attr('aria-valuenow', '0')
                  .css('width', '0%');
        _module.dropEl.css('border-color','#ccc');
        _module.dropEl.css('background','none');
        _module.dropEl.removeClass('hover');
        _module.el.find('.progress').show();

      },

      done: function (e, data) {

        _module.el.find('.progress .progress-bar')
                  .attr('aria-valuenow', '100')
                  .css('width', '100%');
        _module.el.find('.progress').hide();
        _module.dropEl.show();
        _module.el.find('.progress').hide();
        _module.dropEl.css('background-image', 'url("' + data.result.url + '")');

// this attempt to resize the drop zone doesn't work, maybe misguided anyways:
// onLoad never triggers
        _module.image = new Image();
        _module.image.onLoad = function() {
          _module.dropEl.height(_module.image.height / _module.image.width * _module.dropEl.height());
        }
        _module.image.src = data.result.url;

        _editor.data.has_main_image = true;
        _editor.data.main_image = data.result.id;

        _editor.data.image_revision = data.result.url; // choose which image to use

        _editor.validate();

// refactor
        $("#image_revision").append('<option selected="selected" id="'+data.result.id+'" value="'+data.result.url+'">Temp Image '+data.result.id+'</option>');

      },

      // see callbacks at https://github.com/blueimp/jQuery-File-Upload/wiki/Options
      fileuploadfail: function(e,data) {
      },

      progressall: function (e, data) {

        var progress = parseInt(data.loaded / data.total * 100, 10);
        _module.el.find('.progress .progress-bar').css(
          'width',
          progress + '%'
        ).attr('aria-valuenow', '100')

      }

    });


  }

});
