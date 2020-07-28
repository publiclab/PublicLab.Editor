/*
   Auto Center insertion: ****
*/

module.exports = function initAutoCenter(_module, wysiwyg) {
  // $('.woofmark-mode-markdown').removeClass('disabled')

  // create a menu option for auto center:
  $('.wk-commands').append('<button class="woofmark-command-autocenter btn btn-default" data-toggle="autocenter" title="<center> In Rich mode, insert spaces for images."><i class="fa fa-align-center"></i></button>');
  // since chunk.selection returns null for images

  $(document).ready(function() {
    $('[data-toggle="autocenter"]').tooltip();
  });

  $('.wk-commands .woofmark-command-autocenter').click(function() {
    wysiwyg.runCommand(function(chunks, mode) {
      if (mode === "wysiwyg") {
        const tag = "center";
        const open = '<' + tag;
        const close = '</' + tag.replace(/</g, '</');
        const rleading = new RegExp(open + '( [^>]*)?>$', 'i');
        const rtrailing = new RegExp('^' + close + '>', 'i');
        const ropen = new RegExp(open + '( [^>]*)?>', 'ig');
        const rclose = new RegExp(close + '( [^>]*)?>', 'ig');
        chunks.trim();
        // searches if selected text is center aligned and left aligns it
        const trail = rtrailing.exec(chunks.before);
        const lead = rleading.exec(chunks.after);
        if (lead && trail) {
          chunks.before = chunks.before.replace(rleading, '');
          chunks.after = chunks.after.replace(rtrailing, '');
        } else {
          // searches if center tag is opened in selected text
          const opened = ropen.test(chunks.selection);
          if (opened) {
            chunks.selection = chunks.selection.replace(ropen, '');
            if (!surrounded(chunks, tag)) {
              chunks.before += open + '>';
            }
          }
          // searches if center tag is closed in selected text
          const closed = rclose.test(chunks.selection);
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
          const rcloseleft = new RegExp('</' + tag.replace(/</g, '</') + '>$', 'i');
          const ropenright = new RegExp('^<' + tag + '(?: [^>]*)?>', 'i');
          const bounded = rcloseleft.test(chunks.before) && ropenright.test(chunks.after);
          if (bounded) {
            chunks.before = chunks.before.replace(rcloseleft, '');
            chunks.after = chunks.after.replace(ropenright, '');
          }
          return bounded;
        }

        function surrounded(chunks, tag) {
          const ropen = new RegExp('<' + tag + '(?: [^>]*)?>', 'ig');
          const rclose = new RegExp('<\/' + tag.replace(/</g, '</') + '>', 'ig');
          const opensBefore = count(chunks.before, ropen);
          const opensAfter = count(chunks.after, ropen);
          const closesBefore = count(chunks.before, rclose);
          const closesAfter = count(chunks.after, rclose);
          const open = opensBefore - closesBefore > 0;
          const close = closesAfter - opensAfter > 0;
          return open && close;
        }

        function count(text, regex) {
          const match = text.match(regex);
          if (match) {
            return match.length;
          }
          return 0;
        }
      } else if (mode === "markdown") {
        const open = '->';
        const close = '<-';
        const rleading = new RegExp(open + '( [^>]*)?', 'i');
        const rtrailing = new RegExp('^' + close, 'i');
        const ropen = new RegExp(open + '( [^>]*)?', 'ig');
        const rclose = new RegExp(close + '( [^>]*)?', 'ig');
        chunks.trim();
        const trail = rleading.exec(chunks.before);
        const lead = rtrailing.exec(chunks.after);

        if (trail && lead) {
          chunks.before = chunks.before.replace(rleading, '');
          chunks.after = chunks.after.replace(rtrailing, '');
        } else {
          const opened = ropen.test(chunks.selection);
          const closed = rclose.test(chunks.selection);
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
