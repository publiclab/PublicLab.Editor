/*
 * Form module for post tags
 */

module.exports = PublicLab.TagsModule = PublicLab.Module.extend({

  init: function(_editor, options) {

    var _module = this;

    _module.options = options || {};
    _module.options.name         = 'tags';
    _module.options.instructions = 'Tags relate your work to others\' posts. <a href="">Read more &raquo;</a>';
    _module.options.recentTags = [ 'balloon-mapping', 'water-quality' ];

    _module._super(_editor, _module.options);


    _module.valid = function() {

      // must not be empty
      return _module.el.find('input').val() != "";

    }


    // Overrides default build method
    _module.build = function() {    

      // custom location -- just under the input
      _module.el.find('.ple-module-content')
                .append('<p class="ple-help"><span class="ple-help-minor"></span></p>');

      _module.el.find('.ple-module-content .ple-help-minor')
                .html(_module.options.instructions);

      // insert recent and common ones here -- 
      // (this is application-specific)

      _module.el.find('.ple-module-content')
                .append('<p class="ple-help-minor">Recent tags: <span class="ple-recent-tags"></span></p>');

      var tags = [];

      _module.options.recentTags.forEach(function(tag) {

        tags.push('<a>' + tag + '</a>');

      });

      _module.el.find('.ple-recent-tags')
                .append(tags.join(', '))

      _module.el.find('.ple-help-minor').hide(); 

    }


    // construct HTML additions
    _module.build();


  }

});
