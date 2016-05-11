/*
 * UI behaviors and systems to provide helpful tips and guidance.
 */

module.exports = PublicLab.Help = Class.extend({

  init: function(_editor, options) {

    var _help = this;

    _help.options = options || {};

    $("[rel=tooltip]").tooltip(false);
    $("[rel=tooltip]").tooltip();


    // this won't work in xs compact state...

    $('.ple-body').mouseleave(function(e) {

      $('.ple-body .ple-guide-minor').fadeOut();

    });

    $('.ple-body').mouseenter(function(e) {

      $('.ple-body .ple-guide-minor').fadeIn();

    });


  }

});
