/*
   Auto Center insertion: ****
*/

module.exports = function initAutoCenter(_module, wysiwyg) {
  // $('.woofmark-mode-markdown').removeClass('disabled')

  // create a menu option for auto center:
  $('.wk-commands').append('<a class="woofmark-command-autocenter btn btn-default" data-toggle="autocenter" title="<center> In Rich mode, insert spaces for images."><i class="fa fa-align-center"></i></a>');
  // since chunk.selection returns null for images

  $(document).ready(function() {
    $('[data-toggle="autocenter"]').tooltip();
  });

  $('.wk-commands .woofmark-command-autocenter').click(function() {
    wysiwyg.runCommand(function(chunks, mode) {
      if (mode === "wysiwyg") {
        var tag = "center";
        var open = '<' + tag;
        var close = '</' + tag.replace(/</g, '</');
        var rleading = new RegExp(open + '( [^>]*)?>$', 'i');
        var rtrailing = new RegExp('^' + close + '>', 'i');
        var ropen = new RegExp(open + '( [^>]*)?>', 'ig');
        var rclose = new RegExp(close + '( [^>]*)?>', 'ig');
        chunks.trim();
        // searches if selected text is center aligned and left aligns it
        var trail = rtrailing.exec(chunks.before);
        var lead = rleading.exec(chunks.after);
        if (lead && trail) {
          chunks.before = chunks.before.replace(rleading, '');
          chunks.after = chunks.after.replace(rtrailing, '');
        } else {
          // searches if center tag is opened in selected text
          var opened = ropen.test(chunks.selection);
          if (opened) {
            chunks.selection = chunks.selection.replace(ropen, '');
            if (!surrounded(chunks, tag)) {
              chunks.before += open + '>';
            }
          }
          // searches if center tag is closed in selected text
          var closed = rclose.test(chunks.selection);
          if (closed) {
            chunks.selection = chunks.selection.replace(rclose, '');
            if (!surrounded(chunks, tag)) {
              chunks.after = close + '>' + chunks.after;
            }
          }
          if (surrounded(chunks, tag)) {
            if (rleading.test(chunks.before)) {
              chunks.before = chunks.before.replace(rleading, '');
            } else {
              chunks.before += close + '>';
            }
            if (rtrailing.test(chunks.after)) {
              chunks.after = chunks.after.replace(rtrailing, '');
            } else {
              chunks.after = open + '>' + chunks.after;
            }
          } else if (!closebounded(chunks, tag)) {
            chunks.after = close + '>' + chunks.after;
            chunks.before += open + '>';
          }
        }

        function closebounded(chunks, tag) {
          var rcloseleft = new RegExp('</' + tag.replace(/</g, '</') + '>$', 'i');
          var ropenright = new RegExp('^<' + tag + '(?: [^>]*)?>', 'i');
          var bounded = rcloseleft.test(chunks.before) && ropenright.test(chunks.after);
          if (bounded) {
            chunks.before = chunks.before.replace(rcloseleft, '');
            chunks.after = chunks.after.replace(ropenright, '');
          }
          return bounded;
        }

        function surrounded(chunks, tag) {
          var ropen = new RegExp('<' + tag + '(?: [^>]*)?>', 'ig');
          var rclose = new RegExp('<\/' + tag.replace(/</g, '</') + '>', 'ig');
          var opensBefore = count(chunks.before, ropen);
          var opensAfter = count(chunks.after, ropen);
          var closesBefore = count(chunks.before, rclose);
          var closesAfter = count(chunks.after, rclose);
          var open = opensBefore - closesBefore > 0;
          var close = closesAfter - opensAfter > 0;
          return open && close;
        }

        function count(text, regex) {
          var match = text.match(regex);
          if (match) {
            return match.length;
          }
          return 0;
        }
      } else if (mode === "markdown") {
        var open = '->';
        var close = '<-';
        var rleading = new RegExp(open + '( [^>]*)?', 'i');
        var rtrailing = new RegExp('^' + close, 'i');
        var ropen = new RegExp(open + '( [^>]*)?', 'ig');
        var rclose = new RegExp(close + '( [^>]*)?', 'ig');
        chunks.trim();
        var trail = rleading.exec(chunks.before);
        var lead = rtrailing.exec(chunks.after);

        if (trail && lead) {
          chunks.before = chunks.before.replace(rleading, '');
          chunks.after = chunks.after.replace(rtrailing, '');
        } else {
          var opened = ropen.test(chunks.selection);
          var closed = rclose.test(chunks.selection);
          if (opened || closed) {
            if (opened) {
              chunks.selection = chunks.selection.replace(ropen, '');
              chunks.before += open;
            }
            if (closed) {
              chunks.selection = chunks.selection.replace(rclose, '');
              chunks.after = close + chunks.after;
            }
          } else {
            // adds center tag and parses into markdown
            chunks.selection = _module.wysiwyg.parseHTML("<center>" + chunks.selection + "</center>");
          }
        }
      }

      _module.afterParse();
    });
  });
};
