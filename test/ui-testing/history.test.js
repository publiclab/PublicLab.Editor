const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('History functions', () => {

  test('has log, key, interval, and id', () => {
    expect(editor.history.log).not.toBeUndefined();
    expect(editor.history.key).not.toBeUndefined();
    expect(editor.history.options).not.toBeUndefined();
    expect(editor.history.options.interval).not.toBeUndefined();
    expect(editor.history.options.id).not.toBeUndefined();
  });

  test('can be flushed', () => {
    expect(editor.history.fetch()).not.toEqual([]);
    expect(editor.history.last()).not.toBe(null);

    editor.history.flush();

    expect(editor.history.fetch()).toEqual([]);
    expect(editor.history.last()).toBe(null);
  });

  test('adds, fetches, and stores', () => {
    editor.history.flush();
    expect(editor.history.fetch()).toEqual([]);
    expect(editor.history.last()).toBe(null);

    expect($('.ple-history-saving').is(':visible')).toBe(false);
    editor.history.add("some text");
    expect(editor.history.last().text).toBe("some text");
    expect(editor.history.last().timestamp).not.toBeUndefined();

    expect(editor.history.fetch().length).toEqual(1);
    expect(editor.history.last().text).toBe("some text");

    editor.history.add("some more text");
    expect(editor.history.last().text).toBe("some more text");
    expect(editor.history.last().timestamp).not.toBeUndefined();

    expect(editor.history.fetch().length).toEqual(2);
    expect(editor.history.last().text).toBe("some more text");
  });

  test('creates new log entry when value() set', () => {
    expect($(editor.richTextModule.options.textarea).length).toBeGreaterThan(0);
    editor.richTextModule.value("changed textarea text");
    editor.history.check();
    expect(editor.history.last().text).toBe("changed textarea text");
  });

  test('stores only 20 items until we optimize it', () => {
    editor.history.flush();
    for (var i = 0; i < 10; i++) {
      editor.history.add("some text " + i);
    }
    expect(editor.history.log.length).toBe(10);

    for (var i = 10; i < 20; i++) {
      editor.history.add("some text " + i);
      expect(editor.history.log[editor.history.log.length - 1].text).toBe("some text " + i);
    }
    expect(editor.history.log.length).toBe(20);

    for (var i = 20; i < 30; i++) {
      editor.history.add("some text " + i);
    }
    expect(editor.history.log.length).toBe(20);

    editor.history.fetch();
    expect(editor.history.log.length).toBe(20);
    expect(editor.history.log[0].text).toBe('some text 10');
  });

  test('writes out history to a DOM element', () => {
    $('body').append("<div id='history'></div>");

    editor.history.display($('#history')[0]);

    expect(editor.history.log.length).not.toBe(0);
    expect($('#history').html()).not.toBe('');
    expect($('#history p.log').length).toBe(20);
    expect($('#history p.day').length).toBe(1);

    // start over and build DOM, checking as we go:
    editor.history.log = [];
 
    for (var i = 0; i < 10; i++) {
      editor.history.add("some text " + i);
      editor.history.display($('#history')[0]);
      expect($('#history p.log').length).toBe(1 + i);
      expect($('#history p.log:last .preview').html()).toBe("some text " + i + "...");
    }
    expect($('#history p.day').length).toBe(1);
   });
 

}, timeout);
