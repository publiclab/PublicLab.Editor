module.exports = function CustomInsert(_module, wysiwyg) {
  function Syntax(tag, Option1, Option2) {
    console.log(tag, Option1, Option2);
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


  $('.wk-commands').append('<a class="woofmark-command-insert btn btn-default" data-toggle="Insert" title="Custom Insert"><i class="fa fa-tags"></i></a>');

  var builder = '<div class="dropdown" style="margin-bottom: 20px;">';
  builder += '<button class="btn btn-default dropdown-toggle dropdownMenu1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="min-width: 150px;" >';
  builder += '<span class= "selected">What Do you want to insert?</span>';
  builder += '<span class="caret"></span>';
  builder += '</button>';
  builder += '<ul class="dropdown-menu menu1" role="menu" aria-labelledby="dropdownMenu1">';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="Notes">Notes</a></li>';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="Wikis">Wikis</a></li>';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="Nodes">Nodes(Wikis + Notes)</a></li>';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="Activity">Activity</a></li>';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="Questions">Questions</a></li>';
  builder += '</ul>';
  builder += '</div>';
  builder += '<div class="dropdown" style="margin-bottom: 20px;">';
  builder += '<button class="btn btn-default dropdown-toggle dropdownMenu2" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="min-width: 150px;">';
  builder += '<span class="selected2">Insert as a</span>';
  builder += '<span class="caret"></span>';
  builder += '</button>';
  builder += '<ul class="dropdown-menu menu2" role ="menu" aria-labelledby="dropdownMenu2">';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="List">List</a></li>';
  builder += '<li role="presentation"><a role="menuitem" tabindex="-1" class="Grid">Grid</a></li>';
  builder += '</ul>';
  builder += '</div>';
  builder += '<div class="input-group">';
  builder += '<input type="text" class="form-control inputText" placeholder="Enter a tagname" style="min-width: 150px;">';
  builder += '<span class="input-group-btn">';
  builder += '<button class="btn btn-default go1" type="button">Go!</button>';
  builder += '</span>';
  builder += '</div>';
  var Option1 = "Notes";
  var Option2 = "List";
  $('.woofmark-command-insert').attr('data-content', builder);
  $('.woofmark-command-insert').attr('data-container', 'body');
  $('.woofmark-command-insert').attr('data-placement', 'top');
  $('.woofmark-command-insert').popover({html: true, sanitize: false});
  $('.wk-commands .woofmark-command-insert').click(function() {
    var sel = window.getSelection();
    console.log(sel);
    if (sel.anchorNode !== null) {
      var range = sel.getRangeAt(0);
    } else {
      range = null;
    }
    console.log(sel.anchorNode);
    $(".menu1 a").click(function() {
      Option1 = $(this).text();
      $(".selected").text($(this).text());
    });
    $(".menu2 a").click(function() {
      Option2 = $(this).text();
      $(".selected2").text($(this).text());
    });
    $('.go1').click(function() {
      console.log(sel.anchorNode);
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
