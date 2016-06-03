var typeahead = require("typeahead.js-browserify");
var Bloodhound = typeahead.Bloodhound;
// https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
typeahead.loadjQueryPlugin();
require('bootstrap-tokenfield');
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

    _module.options.required     = false;
    _module.options.instructions = 'Tags connect your work with similar content, and make your work more visible. <a href="">Read more &raquo;</a>';

    _module.key = 'tags';
    _module.value = function(text) {

      if (typeof text == 'string') {

        _module.el.find('input').val(text);

      }

      return _module.el.find('input').val();

    }


    // server-side validation for now, and not required, so no reqs
    _module.valid = function() {

      return true;

    }


    // Overrides default build method
    _module.build = function() {    

      // custom location -- just under the input
      _module.el.find('.ple-module-content')
                .append('<p class="ple-help"><span class="ple-help-minor"></span></p>');

      _module.el.find('.ple-module-content .ple-help-minor')
                .html(_module.options.instructions);

      _module.engine = new Bloodhound({
        local: [
          'balloon-mapping',
          'kite-mapping',
          'air-quality',
          'spectrometer',
          'water-quality'
        ],
        datumTokenizer: Bloodhound.tokenizers.whitespace, 
//        datumTokenizer: function(d) {
//          return Bloodhound.tokenizers.whitespace(d.value);
//        },
        queryTokenizer: Bloodhound.tokenizers.whitespace
      });
  
      _module.engine.initialize();

      _module.el.find('input').tokenfield({
        typeahead: [null, { source: _module.engine.ttAdapter() }],
        delimiter: ', '
      });


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
