// for inline images:

$('.dropzone').fileupload({
  url: "/images",
  paramName: "image[photo]",
  dropZone: $('.dropzone'),
  dataType: 'json',
  formData: {
    'uid':$D.uid,
    'nid':$D.nid
  },
  start: function(e) {

    $('#create_progress').show()
    $('#create_uploading').show()
    $('#create_prompt').hide()
    $('.dropzone').removeClass('hover');
  },
  done: function (e, data) {
    $('#create_progress').hide()
    $('#create_uploading').hide()
    $('#create_prompt').show()
    var is_image = false
    if (data.result['filename'].substr(-3,3) == "jpg") is_image = true
    if (data.result['filename'].substr(-4,4) == "jpeg") is_image = true
    if (data.result['filename'].substr(-3,3) == "png") is_image = true
    if (data.result['filename'].substr(-3,3) == "gif") is_image = true
    if (data.result['filename'].substr(-3,3) == "JPG") is_image = true
    if (data.result['filename'].substr(-4,4) == "JPEG") is_image = true
    if (data.result['filename'].substr(-3,3) == "PNG") is_image = true
    if (data.result['filename'].substr(-3,3) == "GIF") is_image = true

    if (is_image) {
      image_url = data.result.url.split('?')[0]
      orig_image_url = image_url.replace('large','original') // not really portable, should parse response and look for "original_filename" or something

      $E.wrap('[![',']('+image_url+')]('+orig_image_url+')', {'newline': true, 'fallback': data.result['filename']}) // on its own line; see /app/assets/js/editor.js
    } else {
      $E.wrap('<a href="'+data.result.url.split('?')[0]+'"><i class="fa fa-file"></i> ','</a>', {'newline': true, 'fallback': data.result['filename'].replace(/[()]/g , "-")}) // on its own line; see /app/assets/js/editor.js
    }

    // here append the image id to the wiki edit form:
    if ($('#node_images').val() && $('#node_images').val().split(',').length > 1) $('#node_images').val([$('#node_images').val(),data.result.id].join(','))
    else $('#node_images').val(data.result.id)

    // eventual handling of multiple files; must add "multiple" to file input and handle on server side:
    //$.each(data.result.files, function (index, file) {
    //    $('<p/>').text(file.name).appendTo(document.body);
    //});
  },

  // see callbacks at https://github.com/blueimp/jQuery-File-Upload/wiki/Options
  fileuploadfail: function(e,data) {

  },
  progressall: function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('#create_progress-bar').css(
      'width',
      progress + '%'
    );
  }
});
