/*
 * History of edits, in markdown
 * 
 * We could eventually do 'major' and 'minor' depending on how much changed.
 */

var Class = require('resig-class');

module.exports = PublicLab.History = Class.extend({

  init: function(_editor, options) {

    var _history = this;

    _history.options = options || {};

    // this would be the nid in Drupal
    // plus the username, or just a
    // unique id if it's a new post
    _history.options.id       = _history.options.id || (new Date()).getTime();
    _history.options.interval = _history.options.interval || 10000; // ten second default
    _history.options.prefix   = _history.options.prefix || "publiclab-editor-history-";

    // unique key to fetch storage
    _history.key = _history.options.prefix + _history.options.id; 


    if (window.hasOwnProperty('localStorage')) {


      // Fetch the entire history of this post from localStorage
      _history.fetch = function() {

        _history.log = JSON.parse(localStorage.getItem(_history.key)) || [];

        return _history.log;

      }


      // Write the entire history of this post to localStorage;
      // overwrites previous history, so be careful
      _history.write = function() {

        var string = JSON.stringify(_history.log)

        // minimal validation:
        if (_history.log instanceof Array  
            && typeof string    == 'string' 
            && string[0]        == '[') {

          localStorage.setItem(_history.key, string);

        }

      }


      // Add an item to the history (history.log)
      // and write to localStorage.
      _history.add = function(text) {

        var entry = {

          text:      text,
          timestamp: (new Date()).getTime()
          // type: 'minor'

        }

        _history.log.push(entry);
        _history.write();

      }


      // Add an item ONLY if it's different from the last entry
      _history.addIfDifferent = function(text) {

        if (_history.last() && text != _history.last().text) _history.add(text);
        else if (_history.last()) _history.last().timestamp = (new Date()).getTime()

      }


      // Most recent history entry
      _history.last = function() {

        if (_history.log.length > 0 ) {

          return _history.log[_history.log.length - 1];

        } else {

          return null;

        }

      }


      // Actually get the contents of the passed textarea and store
      _history.check = function() {

        _history.addIfDifferent($(_editor.textarea).html());

      }


      _history.fetch();
      setInterval(_history.check, _history.options.interval);
      _history.check();


    } else {

      console.log('history requires localStorage-enabled browser');

    }

  }

});
