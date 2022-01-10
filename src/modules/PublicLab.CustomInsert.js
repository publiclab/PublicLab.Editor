module.exports = function CustomInsert(_module, wysiwyg) {
  function Syntax(tag, Option1, Option2) {
    if (Option2 === "List") {
      switch (Option1) {
        case "Notes":
          var syn = "[notes:" + tag + "]";
          break;
        case "Wikis":
          var syn = "[wikis:" + tag + "]";
          break;
        case "Nodes(Wikis + Notes)":
          var syn = "[nodes:" + tag + "]";
          break;
        case "Activity":
          var syn = "[activity:" + tag + "]";
          break;
        case "Questions":
          var syn = "[questions:" + tag + "]";
          break;
      }
    }
    if (Option2 == "Grid") {
      switch (Option1) {
        case "Notes":
          var syn = "[notes:grid:" + tag + "]";
          break;
        case "Wikis":
          var syn = "[wikis:grid:" + tag + "]";
          break;
        case "Nodes(Wikis + Notes)":
          var syn = "[nodes:grid:" + tag + "]";
          break;
        case "Activity":
          var syn = "[activity:grid:" + tag + "]";
          break;
        case "Questions":
          var syn = "[questions:grid:" + tag + "]";
          break;
      }
    }
    return syn;
  }
  $.fn.extend({
    insertAtCaret: function(myValue) {
      return this.each(function(i) {
        if (document.selection) {
          // For browsers like Internet Explorer
          this.focus();
          var sel = document.selection.createRange();
          sel.text = myValue;
          this.focus();
        } else if (this.selectionStart || this.selectionStart == '0') {
          // For browsers like Firefox and Webkit based
          var startPos = this.selectionStart;
          var endPos = this.selectionEnd;
          var scrollTop = this.scrollTop;
          this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos, this.value.length);
          this.focus();
          this.selectionStart = startPos + myValue.length;
          this.selectionEnd = startPos + myValue.length;
          this.scrollTop = scrollTop;
        } else {
          this.value += myValue;
          this.focus();
        }
      });
    }
  });
  const builder = require("./PublicLab.CustomInsert.Template.js");

  $('.wk-commands').append('<button class="woofmark-command-insert btn btn-outline-secondary" data-toggle="insert" title="Custom Insert"><i class="fa fa-tags"></i></button>');

  $(document).ready(function() {
    $('[data-toggle="insert"]').tooltip();
  });

  var Option1 = "Notes";
  var Option2 = "List";
  $('.woofmark-command-insert').attr('data-content', builder);
  $('.woofmark-command-insert').attr('data-container', 'body');
  $('.woofmark-command-insert').attr('data-placement', 'top');
  $('.woofmark-command-insert').popover({html: true, sanitize: false});
  $('.wk-commands .woofmark-command-insert').click(function() {
    var sel = window.getSelection();
    if (sel.anchorNode !== null) {
      var range = sel.getRangeAt(0);
    } else {
      range = null;
    }
    $(".menu1 a").click(function() {
      Option1 = $(this).text();
      $(".selected").text($(this).text());
    });
    $(".menu2 a").click(function() {
      Option2 = $(this).text();
      $(".selected2").text($(this).text());
    });
    $('.go1').click(function() {
      var syntax = Syntax($('.inputText')[0].value, Option1, Option2);
      if ($('.woofmark-mode-markdown')[0].disabled === false && range !== null) {
        range.deleteContents();
        range.insertNode(document.createTextNode(syntax));
        $('.woofmark-mode-markdown').click();
        $('.woofmark-mode-wysiwyg').click();
      } else {
        wysiwyg.runCommand(function(chunks, mode) {
          if (mode === 'markdown') {
            $(".ple-textarea").insertAtCaret("");
            chunks.before += (syntax);
          } else {
            chunks.before += _module.wysiwyg.parseMarkdown(syntax);
          }
        });
      }
    });
  });
};
