/*
 * Form module for rich text entry
 */

var crossvent = require("crossvent");

module.exports = PublicLab.RichTextModule = PublicLab.Module.extend({
  init: function(_editor, options) {
    var _module = this;

    _module.key = "body";
    _module.options = options || _editor.options.richTextModule || {};
    _module.options.name = "body";
    _module.options.instructions =
      "Guide others through the steps to reproduce your work.";

    // break into subclass common to all modules, perhaps:
    _module.options.guides = [
      {
        icon: "mouse-pointer",
        position: 30,
        text: "Drag images into the text area to upload them."
      },
      {
        icon: "list-ul",
        position: 90,
        text: "Be sure to list required materials and resources."
      },
      {
        icon: "clock-o",
        position: 90,
        text:
          "Your work is auto-saved so you can return to it in this browser. To recover drafts, open the <code>...</code> menu below."
      }
    ];

    _module._super(_editor, _module.options);

    // customize options after Module defaults set in _super()
    _module.options.initialValue =
      _editor.options[_module.key] || _module.el.find("textarea").val();
    _module.options.required = true;

    // should be switchable for other editors:
    _module.wysiwyg =
      _module.options.wysiwyg ||
      PublicLab.Woofmark(_module.options.textarea, _editor, _module);

    _module.editable = _module.wysiwyg.editable;
    _module.textarea = _module.wysiwyg.textarea;

    if (_module.wysiwyg.mode == "wysiwyg")
      _module.focusables.push($(_module.editable));
    else _module.focusables.push($(_module.textarea));

    _module.value = function(text) {
      // woofmark automatically returns the markdown, not rich text:
      if (typeof text === "string") {
        if (_module.afterParse) _module.afterParse();
        return _module.wysiwyg.value(text);
      } else {
        return _module.wysiwyg.value();
      }
    };

    _module.value(_module.options.initialValue);

    _module.valid = function () {
      var postBody = _module.value().trim();
      var isValid = postBody.length >= 10;

      return isValid;
    };

    _module.html = function() {
      return _module.wysiwyg.editable.innerHTML;
    };

    _module.markdown = function() {
      return _module.value();
    };

    // converts to markdown and back to html, or the reverse,
    // to trigger @callouts and such formatting
    _module.parse = function() {
      _module.value(_module.value());
      _module.afterParse();
    };

    // construct HTML additions
    _module.build();

    _module.afterParse = function() {
      // bootstrap styling for plots2
      $(_module.wysiwyg.editable)
        .find("table")
        .addClass("table");
    };
    _module.afterParse();

    _module.setMode = function(mode) {
      return _module.wysiwyg.setMode(mode);
    };

    _module.height = function() {
      var height;

      if (_module.wysiwyg.mode == "wysiwyg") height = $(".wk-wysiwyg").height();
      else height = $(".ple-textarea").height();

      return height;
    };

    // caused wild jumpy behavior - https://github.com/publiclab/PublicLab.Editor/issues/114
    //var growTextarea = require('grow-textarea');
    // Make textarea match content height
    _module.resize = function() {
      //growTextarea(_module.options.textarea, { extra: 10 });
    };

    _module.resize();

    crossvent.add(_module.options.textarea, "blur", function(e) {
      _editor.validate();
    });

    crossvent.add(_module.options.textarea, "keydown", function(e) {
      _editor.validate();
    });

    crossvent.add(_module.wysiwyg.editable, "blur", function(e) {
      _editor.validate();
    });

    crossvent.add(_module.wysiwyg.editable, "keydown", function(e) {
      _editor.validate();
      var regexp = /\\\]\(|\\##|\\\*\\\*/g;
      var timestamp = Date.now();
      if (
        _module.wysiwyg.mode == "wysiwyg" &&
        _module.value().match(regexp) &&
        $(".markdown-warning").length === 0
      ) {
        var message =
          "Looks like you're using <a href='http://wikipedia.org/en/Markdown'>Markdown</a> while in Rich Text mode. If you'd like to continue in Markdown mode, <a class='alert-change-mode' href='javascript:void();'>click here</a>.";
        $(_module.wysiwyg.editable).after(
          "<div id='scrollpointMD_" +
            timestamp +
            "' class='markdown-warning alert alert-warning'>" +
            message +
            "</div>"
        );
        $(".alert-change-mode").click(function alertChangeMode() {
          _module.setMode("markdown");
        });
        var refer = "#scrollpointMD_" + timestamp;
        $("html, body").animate(
          {
            scrollTop: $(refer).offset().top
          },
          2000
        );
      }
    });

    var autocenterCheck = function() {
      _editor.validate();
      var openingTag = /-&gt;/g;
      var closingTag = /&lt;-/g;
      if (
        _module.wysiwyg.mode == "wysiwyg" &&
        _module.wysiwyg.editable.innerHTML.match(closingTag)
      ) {
        _module.wysiwyg.editable.innerHTML = _module.wysiwyg.editable.innerHTML.replace(
          openingTag,
          "<center>"
        );
        _module.wysiwyg.editable.innerHTML = _module.wysiwyg.editable.innerHTML.replace(
          closingTag,
          "</center>"
        );
      }
    };

    crossvent.add(_module.wysiwyg.editable, "keydown", autocenterCheck);

    crossvent.add(_module.wysiwyg.editable, "keyup", function(e) {
      _editor.validate();
      var regexp = /data:image\/[^\s]+/i;
      var timestamp = Date.now();
      if (
        _module.wysiwyg.mode == "wysiwyg" &&
        _module.value().search(regexp) &&
        $(".data-urls-warning").length === 0
      ) {
        var diRegEx = _module.value().match(regexp);
        if (diRegEx) {
          var message =
            "Sorry, this editor can't handle images of this format. Please follow these steps:<br/><ul><li><a download href='" +
            diRegEx[0] +
            "'>Download</a> your image</li><li>Drag it back into the editor, it's that simple!</li></ul>";
          _module.wysiwyg.editable.innerHTML = _module.wysiwyg.editable.innerHTML.replace(
            regexp,
            ""
          );
          $(_module.wysiwyg.editable).after(
            "<div id='scrollpointDURI_" +
              timestamp +
              "' class='data-urls-warning alert alert-warning'>" +
              message +
              "</div>"
          );
          var refer = "#scrollpointDURI_" + timestamp;
          $("html, body").animate(
            {
              scrollTop: $(refer).offset().top
            },
            2000
          );
        }
      }
    });

    crossvent.add(_module.wysiwyg.textarea, "keyup", function(e) {
      _editor.validate();
      var regexp = /\*\*[\n]+\*\*/g;
      var timestamp = Date.now();
      if (
        _module.wysiwyg.mode == "markdown" &&
        _module.value().match(regexp) &&
        $(".invalid-bold-tags-warning").length === 0
      ) {
        var message =
          "Invalid input: Please remove all invalid bold tags like the ones below:<br><br>**<br>**";
        _module.wysiwyg.textarea.innerHTML = _module.wysiwyg.textarea.innerHTML.replace(
          regexp,
          ""
        );
        $(_module.wysiwyg.textarea).after(
          "<div id='scrollpointBold_" +
            timestamp +
            "' class='invalid-bold-tags-warning alert alert-warning'>" +
            message +
            "</div>"
        );
        var refer = "#scrollpointBold_" + timestamp;
        $("html, body").animate(
          {
            scrollTop: $(refer).offset().top
          },
          2000
        );
      }
    });

    crossvent.add(_module.wysiwyg.textarea, "keyup", function(e) {
      _editor.validate();
      var regexp = /[\*]{2}[\s]{0,1}[\n]+[\#]+[^\P{P}*]+[\*]{2}/;
      //checks for the following pattern
      //<double asterisks><zero or one space>
      //<atleast one new lines>
      //<atleast one hash><include atleast one characters that is NOT an asterisk><double asterisks>
      if (_module.wysiwyg.mode == "markdown" && _module.value().match(regexp)) {
        _module.value(
          _module
            .value()
            .match(regexp)[0]
            .substr(3, _module.value().match(regexp)[0].length - 5)
        );
      }
    });

    crossvent.add(_module.wysiwyg.editable, "mouseover", function(e) {
      _editor.validate();
      if (_module.wysiwyg.mode === "wysiwyg" && e.target.href) {
        var n = new Date().getTime();
        e.target.id = n;
        $("#" + n).attr("data-toggle", "tooltip");
        $("#" + n).attr("title", e.target.href);
        $('[data-toggle="tooltip"]').tooltip();
      }
    });

    // once woofmark's done with the textarea, this is triggered
    // using woofmark's special event system, crossvent
    // -- move this into the Woofmark adapter initializer
    crossvent.add(_module.options.textarea, "woofmark-mode-change", function(
      e
    ) {
      _module.resize();

      _module.afterParse();

      // ensure document is scrolled to the same place:
      document.body.scrollTop = _module.scrollTop;
      // might need to adjust for markdown/rich text not
      // taking up same amount of space, if menu is below _editor...
      //if (_editor.wysiwyg.mode == "markdown")

      if (_module.wysiwyg.mode == "wysiwyg")
        _module.focusables[0] = $(_module.editable);
      else _module.focusables[0] = $(_module.textarea);
    });

    $(_module.options.textarea).on("change keydown", function(e) {
      _module.resize();
    });

    var wk_c = document.getElementsByClassName("wk-commands")[0];

    $(window).scroll(function() {
      var bounding = document
        .getElementsByClassName("woofmark-mode-markdown")[0]
        .getBoundingClientRect();

      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      ) {
        wk_c.style.position = "relative";
        wk_c.style.bottom = 0 + "px";
      } else {
        wk_c.style.bottom =
          document
            .getElementsByClassName("ple-footer")[0]
            .getBoundingClientRect().height + "px";
        wk_c.style.position = "fixed";
        wk_c.style.zIndex = 2;
      }
    });
  }
});
