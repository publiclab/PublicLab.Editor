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
  var addedRelatedPost = 'addedTitles';
  var relatedResultShow = false;

  build();
  bindEvents()

  // make an area for "related posts" to connect to
  function build() { 

    module.el.find('.ple-module-content').append('<div style="display:none;" class="ple-title-related"></div>');
    relatedEl = module.el.find('.ple-title-related');
    relatedEl.append('<p class="ple-help">Does your work relate to one of these? Click to tag the related work.</p><hr style="margin: 4px 0;" />');
    module.el.find('.ple-module-content').append('<div style="display:none;" class="ple-title-added"></div>');
    addedRelatedEl = module.el.find('.ple-title-added');

  }

  function showResults(resultContainer, result, resultClass) {
    resultContainer.find(resultClass + ' .title').html(result.title);
    resultContainer.find(resultClass + ' .title').attr('href', result.url);
    resultContainer.find(resultClass + ' .author').html('@' + result.author);
    resultContainer.find(resultClass + ' .author').attr('href', '/profile/' + result.author);
  }

  function showAdded(addedResult, relatedResults) {
    addedRelatedEl.append('<div class="addedresult addedresult-' + addedResult.id + '" style="margin: 3px;"><a class="btn btn-xs btn-default remove-tag"><i class="fa fa-times-circle"></i> Remove</a> <a class="title"></a> by <a class="author"></a></div>');
    var addedResultClass = '.addedresult-' + addedResult.id;
    showResults(addedRelatedEl, addedResult, addedResultClass);
    
    $('.addedresult-' + addedResult.id + ' .remove-tag').click(function() {
      var selectedToken = (editor.tagsModule.el.find('.token[data-value="response:' + addedResult.id +'"]'));
      var y_axis = window.scrollY;
      selectedToken.find('.close').trigger('click');
      window.scrollTo(window.scrollX, y_axis);
      addedRelatedPost = addedRelatedPost.replace(addedResult.id, '');
      $('.addedresult-' + addedResult.id).remove();
      showRelatedResult(relatedResults);
      if(addedRelatedPost==='addedTitles') {
        $('.related-post').remove();
      }
    });
  }

  // expects array of results in format:
  // { id: 3, title: 'A third related post', url: '/', author: 'bsugar'}
  function showRelatedResult(relatedResults) { 
    relatedEl.find('.result').remove();
    // If tag removed from TagModule
    editor.tagsModule.el.find('input').on('tokenfield:removedtoken', function(e) {
      var id = (e.attrs.value).replace('response:', '');
      if (addedRelatedPost.includes(id)) {
        addedRelatedPost = addedRelatedPost.replace(id, '');
        $('.addedresult-' + id).remove();
        showRelatedResult(relatedResults);
        if (addedRelatedPost==='addedTitles') {
          $('.related-post').remove();
        }
      }
    });

    relatedResults.slice(0, 8).forEach(function(result) {
      var showRelated = false;
      if (!(addedRelatedPost.includes(result.id))) {
        showRelated=true;
      }
      if (showRelated) {
        resultClass = '.result-' + result.id;
        relatedEl.append('<div class="result result-' + result.id + '" style="margin: 3px;"><a class="btn btn-xs btn-default add-tag"><i class="fa fa-plus-circle"></i> Add</a> <a class="title"></a> by <a class="author"></a></div>');
        showResults(relatedEl, result, resultClass);
      }

      $('.result-' + result.id + ' .add-tag').click(function() {
        editor.tagsModule.el.find('input').tokenfield('createToken', 'response:' + result.id);
        if (addedRelatedPost==='addedTitles'){
          addedRelatedEl.append('<hr class="related-post" style="margin: 4px 0;" /><p class="ple-help related-post">Related Posts</p>');
        }
        // pending https://github.com/publiclab/plots2/issues/646
        // editor.tagsModule.el.find('input').tokenfield('createToken', 'notify:' + result.author);
        addedRelatedPost += result.id;
        showAdded(result, relatedResults);

        $('.result-' + result.id).remove();
      });

    });

  }

  var fetchRelated = module.options.fetchRelated || function fetchRelated(showRelatedResult) {

    // example
    showRelatedResult([
      { id: 1, title: 'A related post',       url: '/', author: 'eustatic'},
      { id: 2, title: 'Another related post', url: '/', author: 'stevie'},
      { id: 3, title: 'A third related post', url: '/', author: 'bsugar'}
    ]);

  }

  function bindEvents() {

    $(module.el).find('input').keydown(function(e) {
 
      if (module.options.suggestRelated) {
        relatedEl.fadeIn();
        addedRelatedEl.fadeIn();
        relatedResultShow = true;
        fetchRelated(showRelatedResult);
      }
 
    });

    $(module.el).find('input').click(function(e) {
      var showResults = false;
      showResults = module.options.suggestRelated && relatedResultShow;
      if (showResults) {
        relatedEl.fadeIn();
        addedRelatedEl.fadeIn();
        fetchRelated(showRelatedResult);
      }
 
    });

    $(module.el).find('.ple-module-content').mouseleave(function(e) {
 
      if (module.options.suggestRelated) {
        relatedEl.fadeOut();
        addedRelatedEl.fadeOut();
      }
 
    });

  }

  return relatedEl;

}
