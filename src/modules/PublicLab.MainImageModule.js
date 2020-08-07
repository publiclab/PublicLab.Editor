/*
 * Form module for main post image
 */

module.exports = PublicLab.MainImageModule = PublicLab.Module.extend({

  init: function(_editor, options) {
    var dragImageI = document.getElementById("mainImage");
    var _module = this;

    _module.key = 'main_image_url';
    _module.options = options || _editor.options.mainImageModule || {};
    _module.options.name = 'main_image';
    _module.options.instructions = 'Choose an image to be used as a thumbnail for your post. <br /><a target="_blank" href="https://publiclab.org/wiki/authoring-help#Images">Image tips &raquo;</a>';
    _module.options.url = _editor.options.mainImageUrl;
    _module.options.uploadUrl = _module.options.uploadUrl || "/images";

    _module._super(_editor, _module.options);

    _module.focusables.push(_module.el.find('input'));
    _module.image = new Image();

    _module.value = function(url, id) {
      if (typeof url == 'string') {
        _module.image.onload = function() {
          var heightDropdown = this.height;
          var widthDropdown = this.width;
          if (this.width > 340) {
            var aspectRatio = this.width / 340;
            widthDropdown = 340;
            heightDropdown = this.height / aspectRatio;
          }
          _module.dropEl.css('height', heightDropdown);
          _module.dropEl.css('width', widthDropdown);
          _module.dropEl.css('background-size', widthDropdown + 'px ' + heightDropdown + 'px');
        };
        _module.image.src = url;
        _module.options.url = url;
        _editor.data.has_main_image = true;
        _editor.data.image_revision = url; // choose which image to use
      }

      if (id) _editor.data.main_image = id;
      
      return _module.options.url;
    };

    // construct HTML additions
    _module.build();


    _module.dropEl = _module.el.find('.ple-drag-drop');
    _module.mainDropEl = _module.el.find('.mainImageBox');
    _module.dropEl.css('background', 'url("' + _module.options.url + '") center no-repeat');
    _module.dropEl.css('background-position', 'center');
    _module.dropEl.css('background-repeat', 'no-repeat');
    _module.dropEl.css('background-size', 'cover');

    _module.dropEl.bind('dragover dragenter', function(e) {
      e.preventDefault();
      // create relevant styles in sheet
      _module.dropEl.addClass('hover');
      _module.mainDropEl.addClass('dragDrop');
    });

    _module.dropEl.bind('dragout dragleave dragend drop', function(e) {
      _module.dropEl.removeClass('hover');
      _module.mainDropEl.removeClass('dragDrop');
    });

    _module.dropEl.bind('drop', function(e) {
      e.preventDefault();
    });


    // read in previous main images to enable reverting back
    if (_module.options.previousMainImages) {

      // $("#image_revision").append('<option selected="selected" id="'+data.result.id+'" value="'+data.result.url+'">Temp Image '+data.result.id+'</option>');

    }


    // jQuery File Upload integration:

    _module.el.find('input').fileupload({

      url: _module.options.uploadUrl,
      paramName: "image[photo]",
      dropZone: _module.dropEl,
      dataType: 'json',

      formData: {
        'authenticity_token': _module.options.token,
        'uid': _module.options.uid,
        'nid': _module.options.nid
      },

      start: function(e) {
        showImage = true;
        _module.el.find('.progress .progress-bar')
            .attr('aria-valuenow', '0')
            .css('width', '0%');
        _module.dropEl.css('border-color', '#ccc');
        _module.dropEl.css('background', 'none');
        _module.dropEl.removeClass('hover');
        _module.el.find('.progress').show();
      },

      done: function(e, data) {
        if (showImage) {
          _module.el.find('.progress .progress-bar')
              .attr('aria-valuenow', '100')
              .css('width', '100%');
          _module.el.find('.progress').hide();
          _module.dropEl.show();
          _module.el.find('.progress').hide();
          _module.dropEl.css('background-image', 'url("' + data.result.url + '")');

          _module.value(data.result.url, data.result.id);
          _module.dropEl.empty();
          _editor.validate();

          // primarily for testing:
          if (_module.options.callback) _module.options.callback();
        }
      },

      // see callbacks at https://github.com/blueimp/jQuery-File-Upload/wiki/Options
      fileuploadfail: function(e, data) {
      },

      progressall: function(e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        // For hiding the HTML "Drag an image here to upload." after uploading image.
        dragImageI.innerHTML = "";

        _module.el.find('.progress .progress-bar').css(
            'width',
            progress + '%'
        ).attr('aria-valuenow', '100');
      }

    });

    var imageInput = document.getElementById('thumbnail-img');
    var infoArea = document.getElementById('thumbnail-filename');

    if (imageInput) {
      imageInput.addEventListener('change', showFileName);

      function showFileName(event) {
        var input = event.srcElement;
        var fileName = input.files[0].name;
        infoArea.textContent = 'Filename: ' + fileName;
      }

      // Remove Image button
      var mainImage = document.getElementById('mainImage');
      var removeFile = document.getElementById('removeFile');

      removeFile.onclick = function() {
        mainImage.style.background = 'white';
        _module.el.find('.progress').hide();
        showImage = false;
      _module.options.url = '';
      _module.image.src = '';
      _editor.data.has_main_image = false;
      _editor.data.image_revision = '';
      };
    }
  }

});
