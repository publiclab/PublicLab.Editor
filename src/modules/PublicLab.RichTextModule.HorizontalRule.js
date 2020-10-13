/*
   Horizontal Rule insertion: ****
*/

module.exports = function initHorizontalRule(_module, wysiwyg) {
  // create a menu option for horizontal rules:
  $('.wk-commands').append('<button class="woofmark-command-horizontal-rule btn btn-outline-secondary" data-toggle="horizontal" title="Horizontal line <hr>"><i class="fa fa-ellipsis-h"></i></button>');

  $(document).ready(function() {
    $('[data-toggle="horizontal"]').tooltip();
  });

  $('.wk-commands .woofmark-command-horizontal-rule').click(function() {
    wysiwyg.runCommand(function(chunks, mode) {
      chunks.before += _module.wysiwyg.parseMarkdown("\n****\n"); // newlines before and after
      _module.afterParse(); // tell editor we're done here

      // setTimeout(_module.afterParse, 0); // do this asynchronously so it applies Boostrap table styling
    });
  });
};
