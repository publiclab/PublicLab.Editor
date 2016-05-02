'use strict';

var test = require('tape');
var sluggish = require('..');

test('deals with titles accurately', function (t) {
  t.equal(sluggish('slow-moving or inactive.\n"a sluggish stream"'), 'slow-moving-or-inactive-a-sluggish-stream');
  t.equal(sluggish('so many äccénts ï Ö'), 'so-many-accents-i-o');
  t.equal(sluggish('--on either END-_--_?¡¿'), 'on-either-end');
  t.end();
});
