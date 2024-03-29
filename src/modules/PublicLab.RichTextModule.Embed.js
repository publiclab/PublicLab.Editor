/*
   Embed insertion: <iframe width="560" height="315" src="https://www.youtube.com/embed/Ej_l1hANqMc" frameborder="0" allowfullscreen></iframe>
*/

module.exports = function initEmbed(_module, wysiwyg) {
  // create a menu option for embeds:
  $('.wk-commands').append('<button class="woofmark-command-embed btn btn-outline-secondary" data-toggle="youtube" title="Youtube link <iframe>"><i class="fa fa-youtube"></i></button>');

  $(document).ready(function() {
    $('[data-toggle="youtube"]').tooltip();
  });

  $('.wk-commands .woofmark-command-embed').click(function() {
    wysiwyg.runCommand(function(chunks, mode) {
      var modalResult =
        "\n\n\n" +
        prompt(
            "Enter the full embed code offered by the originating site; for YouTube, that might be: <iframe width='100%' src='https://youtube.com/embed/_________' frameborder='0' allowfullscreen></iframe>  Adjust width for smaller screens by changing width='800' (for example)"
        ) +
        "\n";

      // If a user cancels the modal
      if (modalResult.trim() === 'null') return;

      chunks.before += _module.wysiwyg.parseMarkdown(modalResult); // newlines before and after
      _module.afterParse(); // tell editor we're done here
    });
  });
};
