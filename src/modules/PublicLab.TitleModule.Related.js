/* Displays related posts to associate this one with.
 * Pass this a fetchRelated() method which runs show() with returned JSON data.
 * Example:

```js
function fetchRelated(show) {

  $.getJSON('/some/url', function(response) {

    show(response);

  });

}
```

Results should be in following JSON format:

[
  { id: 1, title: 'A related post',       url: '/', author: 'eustatic'},
  { id: 2, title: 'Another related post', url: '/', author: 'stevie'},
  { id: 3, title: 'A third related post', url: '/', author: 'bsugar'}
]

 */
module.exports = function relatedNodes(module) {
  var relatedEl;
  var addedRelatedEl;
  var addedRelatedPost = [];
  var relatedResultShow = false;

  build();
  bindEvents();

  // make an area for "related posts" to connect to
  function build() {
    module.el.find('.ple-module-content').append('<div style="display:none;" class="ple-title-related"></div>');
    relatedEl = module.el.find('.ple-title-related');
    relatedEl.append('<p class="ple-help">Does your work relate to one of these? Click to tag the related work.</p><hr style="margin: 4px 0;" />');
    module.el.find('.ple-module-content').append('<div style="display:none;" class="ple-title-added"></div>');
    addedRelatedEl = module.el.find('.ple-title-added');
  }

  // showResult() will append the required tags in the particular container
  function showResults(resultContainer, result, resultClass) {
    resultContainer.find(resultClass + ' .title').html(result.title);
    resultContainer.find(resultClass + ' .title').attr('href', result.url);
    resultContainer.find(resultClass + ' .author').html('@' + result.author);
    resultContainer.find(resultClass + ' .author').attr('href', '/profile/' + result.author);
  }

  function showAdded(addedResult, relatedResults) {
    addedRelatedEl.append('<div class="addedresult addedresult-' + addedResult.id + '" style="margin: 3px;"><a class="btn btn-outline-secondary btn-sm remove-tag"><i class="fa fa-times-circle"></i> Remove</a> <a class="title"></a> by <a class="author"></a></div>');
    var addedResultClass = '.addedresult-' + addedResult.id;
    showResults(addedRelatedEl, addedResult, addedResultClass);

    // For removing tags
    $('.addedresult-' + addedResult.id + ' .remove-tag').click(function() {
      var addRelatedPostIndex = addedRelatedPost.indexOf(addedResult.id);
      addedRelatedPost.splice(addRelatedPostIndex, 1);// remove tags from tagIntergrationModule.
      var selectedToken = (editor.tagsModule.el.find('.token[data-value="response:' + addedResult.id + '"]'));
      var yAxis = window.scrollY;
      selectedToken.find('.close').trigger('click');
      window.scrollTo(window.scrollX, yAxis);
      $('.addedresult-' + addedResult.id).remove();
      showRelatedResult(relatedResults);
      if (addedRelatedPost.length === 0) {
        $('.related-post').remove(); // removing the tag from Realted Post section.
      }
    });
  }

  // expects array of results in format:
  // { id: 3, title: 'A third related post', url: '/', author: 'bsugar'}
  function showRelatedResult(relatedResults) {
    relatedEl.find('.result').remove();
    // If tag removed from TagModule
    editor.tagsModule.el.find('input').on('tokenfield:removedtoken', function(e) {
      var id = parseInt((e.attrs.value).replace('response:', ''));
      if (addedRelatedPost.includes(id)) {
        var addRelatedPostIndex = addedRelatedPost.indexOf(id);
        if (addRelatedPostIndex != -1) {
          addedRelatedPost.splice(addRelatedPostIndex, 1);
        }
        $('.addedresult-' + id).remove();
        showRelatedResult(relatedResults);
        if (addedRelatedPost.length === 0 ) {
          $('.related-post').remove();
        }
      }
    });
    relatedResults.slice(0, 8).forEach(function(result) {
      if (!(addedRelatedPost.includes(parseInt(result.id)))) {
        resultClass = '.result-' + result.id;
        relatedEl.append('<div class="result result-' + result.id + '" style="margin: 3px;"><a class="btn btn-outline-secondary btn-sm add-tag"><i class="fa fa-plus-circle"></i> Add</a> <a class="title"></a> by <a class="author"></a></div>');
        showResults(relatedEl, result, resultClass);
      }

      // For adding tags.

      $('.result-' + result.id + ' .add-tag').click(function() {
        editor.tagsModule.el.find('input').tokenfield('createToken', 'response:' + result.id);
        if (addedRelatedPost.length === 0) {
          addedRelatedEl.append('<hr class="related-post" style="margin: 4px 0;" /><p class="ple-help related-post">Related Posts</p>');
        }
        // pending https://github.com/publiclab/plots2/issues/646
        // editor.tagsModule.el.find('input').tokenfield('createToken', 'notify:' + result.author);
        addedRelatedPost.push(result.id);
        showAdded(result, relatedResults);

        $('.result-' + result.id).remove();
      });
    });
  }

  var fetchRelated = module.options.fetchRelated || function fetchRelated(showRelatedResult) {
    // example
    showRelatedResult([
      {id: 1, title: 'A related post', url: '/', author: 'eustatic'},
      {id: 2, title: 'Another related post', url: '/', author: 'stevie'},
      {id: 3, title: 'A third related post', url: '/', author: 'bsugar'}

    ]);
  };

  function bindEvents() {
    function showSections() {
      relatedEl.fadeIn();
      addedRelatedEl.fadeIn();
      fetchRelated(showRelatedResult);
    }

    // show the related results on keydown or onclick.
    $(module.el).find('input').keydown(function(e) {
      if (module.options.suggestRelated) {
        relatedResultShow = true;
        showSections();
        $(module.el).find('input').click(function(e) {
          if (relatedResultShow) {
            showSections();
          }
        });
      }
    });

    // related content will be hidden on mouseleave
    $(module.el).find('.ple-module-content').mouseleave(function(e) {
      if (module.options.suggestRelated) {
        relatedEl.fadeOut();
        addedRelatedEl.fadeOut();
      }
    });
  }

  return relatedEl;
};
