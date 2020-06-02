module.exports = {

  getUrlHashParameter: function(sParam) {

    var sPageURL = window.location.hash;
    if (sPageURL) sPageURL = sPageURL.split('#')[1];
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {

      var sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }

    }

  },

  getUrlParameter: function(sParam) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {

      var sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }

    }

  },

  disableScroll: function() {
    window.isScrollingDisabled = true;
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
      // if any scroll is attempted, set this to the previous value
      (window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
      });
  },

  enableScroll: function() {
    window.isScrollingDisabled = false;
    window.onscroll = function() {};
  },

  preventModalScrollToTop: function() {
    var self = this;
    var elementsWithPopups = [
      document.querySelector(".woofmark-command-link"),
      document.querySelector(".woofmark-command-image"),
      document.querySelector(".woofmark-command-attachment")
    ];

    for (var i = 0; i < elementsWithPopups.length; i++) {
      var element = elementsWithPopups[i];

      if(!element) continue;

      element.addEventListener("click", function() {
        // Click on one of the elementsWithPopups disables scrolling
        if (!window.isScrollingDisabled) {
          self.disableScroll();
        }

        $(".wk-prompt-input").on("keydown", function(e) {
          // Enter keypress in input element
          if (e.keyCode === 13) {
            setTimeout(self.enableScroll, 50);
          }
        });

        // Click on buttons "Ok" or "Cancel" enables scrolling
        $(".wk-prompt-ok").on("click", function() {
          setTimeout(self.enableScroll, 50);
        });

        $(".wk-prompt-cancel").on("click", function() {
          setTimeout(self.enableScroll, 50);
        });
      });
    }

  },

  enableTextModeKeyboardShortcut: function () {
    var mainContentTextarea = document.querySelector('.wk-container')
    var toggleMarkdownModeBtn = document.querySelector('.woofmark-mode-markdown');
    var toggleRichTextModeBtn = document.querySelector('.woofmark-mode-wysiwyg');

    if(!mainContentTextarea) return;

    mainContentTextarea.addEventListener('keydown', function (e) {
      // Executes on CTRL + P
      if (e.keyCode === 80 && e.ctrlKey) {
        toggleRichTextModeBtn.style.display = 'none';
        toggleMarkdownModeBtn.style.display = 'block';
      }
      //Executes on CTRL + M
      if (e.keyCode === 77 && e.ctrlKey) {
        toggleRichTextModeBtn.style.display = 'block';
        toggleMarkdownModeBtn.style.display = 'none';
      }
    });
  },

  preventUploadedImagesDragging: function() {
    var wysiwygDiv = document.querySelector(".wk-wysiwyg");
    var self = this;

    if(!wysiwygDiv) return;

    function handleChange() {
      if (window.isScrollingDisabled) {
        self.enableScroll();
      }

      var imageElements = document.querySelectorAll(
        '.wk-wysiwyg img:not([draggable="false"])'
      );

      imageElements.forEach(function(imageElement) {
        imageElement.setAttribute("draggable", "false");
      });
    }

    var observerConfig = { childList: true, subtree: true };
    var wysiwygDivObserver = new MutationObserver(handleChange);

    wysiwygDivObserver.observe(wysiwygDiv, observerConfig);
  }

}
