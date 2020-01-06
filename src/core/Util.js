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

  }

}
