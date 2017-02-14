/* CodeFence insertion
   ```
   code here

   ```
*/   

module.exports = function initCodeFences(_module, wysiwyg) {

  // create a menu option for codefence
  $('.wk-commands').append('<a class="woofmark-command-code-fences btn btn-default"><i class="fa fa-table"></i></a>');

  $('.wk-commands .woofmark-command-code-fences').click(function() {
    wysiwyg.runCommand(function(chunks, mode) {
      chunks.before += _module.wysiwyg.parseMarkdown("\n```\n"); // newlines before and after
      chunks.after += _module.wysiwyg.parseMarkdown("\n```\n");
      _module.afterParse(); // tell editor we're done here
     
      /*if (mode === 'markdown') chunks.before += table;
      else {

        chunks.before += _module.wysiwyg.parseMarkdown(table);
        setTimeout(_module.afterParse, 0); // do this asynchronously so it applies Boostrap table styling

      }

      $('.woofmark-command-table').popover('toggle');*/

    });

  });

}
